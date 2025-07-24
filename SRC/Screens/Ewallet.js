import { useIsFocused, useNavigation } from '@react-navigation/core';
import { Icon } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    AppState,
    BackHandler,
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import Modal from 'react-native-modal';
import SignatureScreen from 'react-native-signature-canvas';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import AddImagesContainer from '../Components/AddImagesContainer';
import AddSignatureContainer from '../Components/AddSignatureContainer';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import ImagePickerModal from '../Components/ImagePickerModal';
import NullDataComponent from '../Components/NullDataComponent';
import PDFView from '../Components/PDFView';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import * as DocumentPicker from '@react-native-documents/picker';
import PdfContainer from '../Components/PdfContainer';
import ListEmphtyComponent from '../Components/ListEmphtyComponent';

const Ewallet = () => {
    const isFocused = useIsFocused();
    const token = useSelector(state => state.authReducer.token);
    const [image_loading, setImageLoading] = useState(false);
    const [document_loading, setDocumentLoading] = useState(false);
    const [signature_loading, setsignatureLoading] = useState(false);
    const [selectedIndex, setSelectedItem] = useState('photo');
    const [showMultiImageModal, setShowMultiImageModal] = useState(false);
    const [multiImages, setMultiImages] = useState([]);
    const [signatureImage, setSignatureImage] = useState([]);
    const [fileResponse, setFileResponse] = useState([]);

    const appState = useRef(AppState.currentState);
    const enabler = useSelector(state => state?.commonReducer?.fingerPrintEnabled)
    const dispatch = useDispatch();
    const userData = useSelector(state => state.commonReducer.userData);
    const navigation = useNavigation();
    const ref = useRef();
    const [selectedPdf, setSelectedPdf] = useState('');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState({});
    console.log("🚀 ~ Ewallet ~ image:", image)
    const [signature, setSignature] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [signModalVisible, setSignModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [selectedPDFIndex, setSelectedPDFIndex] = useState(0);
    const [fingerPrintModal, setFingerPrintModal] = useState(true)
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailName, setThumbnailName] = useState(null);
    const [thumbnailType, setThumbnailType] = useState(null);

    const _handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            setFingerPrintModal(true)
            console.log('App has come to the foreground!');

        } else {
            console.log('App has come to the background!');
            // dispatch(setAppState(false))
            setFingerPrintModal(false)
        }

        appState.current = nextAppState;
        // setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
    };

    useEffect(() => {
        if (selectedIndex == 'photo') {
            getPhotos();
        } else if (selectedIndex == 'file-signature') {
            getSignature();
        } else {
            console.log('yahaa per ha')
            getDocs();
        }
    }, [selectedIndex]);


    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        Platform.OS == 'android'
            ? ToastAndroid.show('No sign implemented', ToastAndroid.SHORT)
            : alert('no sign implenmeted');
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        ref.current.clearSignature()
        setSignature(null);
    };

    const handleSave = async () => {
        console.log('saveeee ho raha ha')
        setName('');
        sendSignature(signature);
        setSignature(null);
        setSignModalVisible(false);

    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
            return true;
        });
    }, []);

    useEffect(() => {
        if (image && image.uri) {
            sendImage();
        }
    }, [image]);


    useEffect(() => {
        const subscription = AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    const sendImage = async () => {
        const formData = new FormData();
        const url = 'auth/image';
        const body = {
            user_id: userData?.id,
            image: image,
        };
        console.log("🚀 ~ sendImage ~ body:", body)
        for (let key in body) {
            formData.append(key, body[key]);
        }
        setIsLoading(true);
        const resposne = await Post(url, formData, apiHeader(token, true));
        setIsLoading(false);
        if (resposne != undefined) {
            console.log(resposne?.data);
            Platform.OS == 'android' ? ToastAndroid.show('Image Added', ToastAndroid.SHORT) : alert('Image Added')
            setMultiImages(prev => [...prev, image]);
        }

    };

    const sendDocument = async (response) => {
        const formData = new FormData();
        const file = response[0];

        const fileName = file.name || 'document';
        const fileType = file.type || 'application/octet-stream';
        const fileUri = file.uri;

        let thumbnailUri = '';
        let thumbnailName = '';
        let thumbnailType = '';

        if (fileType.includes('image')) {
            thumbnailUri = fileUri;
            thumbnailName = fileName;
            thumbnailType = fileType.split('/')[1];
        } else if (fileType.includes('pdf')) {
            thumbnailUri = Image.resolveAssetSource(require('../Assets/Images/thumnail_image.png')).uri;
            thumbnailName = 'pdf_thumbnail.png';
            thumbnailType = 'png';
        }

        formData.append('user_id', userData?.id?.toString());
        formData.append('name', fileName);

        formData.append('document', {
            uri: fileUri,
            type: fileType,
            name: fileName,
        });

        formData.append('thumbnail', {
            uri: thumbnailUri,
            type: `image/${thumbnailType}`,
            name: thumbnailName,
        });

        console.log('📦 FormData sending:', {
            user_id: userData?.id,
            name: fileName,
            document: { uri: fileUri, type: fileType, name: fileName },
            thumbnail: { uri: thumbnailUri, type: `image/${thumbnailType}`, name: thumbnailName },
        });

        setIsLoading(true);
        try {
            const res = await Post('auth/document', formData, apiHeader(token, true));
            setIsLoading(false);

            if (res) {
                console.log('✅ API success:', res?.data);
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Document Added', ToastAndroid.SHORT);
                } else {
                    alert('PDF Added');
                }
                getDocs()
            }
        } catch (err) {
            setIsLoading(false);
            console.error('❌ API error:', err);
        }
    };

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                allowMultiSelection: false,
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            })
            sendDocument(response);
            console.log('Picked file:', response);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    const sendSignature = async (base64Image) => {
        const url = 'auth/signature';
        const body = {
            user_id: userData?.id,
            uri: base64Image,
            name: name,
            date: moment().format('ll'),
        };
        try {
            setIsLoading(true);
            const response = await Post(url, body, apiHeader(token));
            setIsLoading(false);

            if (response) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Signature Added', ToastAndroid.SHORT);
                } else {
                    alert('Signature Added');
                }
                getSignature()
            }
        } catch (error) {
            setIsLoading(false);
            console.error("❌ Error sending signature:", error);
            alert('Signature upload failed');
        }
    };

    const getPhotos = async () => {
        try {

            const url = 'auth/image/index';
            const response = await Get(url, token);
            setImageLoading(true)
            if (response != undefined) {
                setImageLoading(false)
                setMultiImages(response?.data?.image);
            }
        } catch (err) {
            console.log(err, 'errrrrrrrrrrrrrrrrrrrrrrrrrrrorrrrr')
        }
    };

    const getDocs = async () => {
        const url = 'auth/document/index';
        setDocumentLoading(true)
        const response = await Get(url, token);
        setDocumentLoading(false)
        if (response != undefined) {
            setDocumentLoading(false)
            setFileResponse(response?.data?.Document);
        }
    };

    const getSignature = async () => {
        const url = 'auth/signature/index';
        setsignatureLoading(true)
        const response = await Get(url, token);
        setsignatureLoading(false)
        if (response != undefined) {
            setsignatureLoading(false)
            setSignatureImage(response?.data?.Signature);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header hideUser={false} title={'Ewallet'} />

            <View style={styles.upperContainer}>
                <CustomText
                    isBold
                    style={{
                        fontSize: moderateScale(20, 0.3),
                        color: Color.black,
                        width: windowWidth * 0.92,
                    }}>
                    Categories
                </CustomText>
                <View style={styles.squareContainer}>
                    {['photo', 'file-text', 'file-signature'].map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.7}
                                style={[
                                    styles.square,
                                    {
                                        backgroundColor:
                                            item == selectedIndex
                                                ? Color.themeBlue
                                                : Color.lightGrey,
                                    },
                                ]}
                                onPress={() => {
                                    setSelectedItem(item);
                                }}>
                                <Icon
                                    name={item}
                                    as={item == 'file-signature' ? FontAwesome5 : FontAwesome}
                                    color={item == selectedIndex ? Color.white : Color.veryLightGray}
                                    size={moderateScale(35, 0.3)}
                                    style={{
                                        width: windowWidth * 0.24,
                                        textAlign: 'center',
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        width: windowWidth * 0.92,
                        justifyContent: 'space-between',
                        marginTop: moderateScale(30, 0.3),
                    }}>
                    <CustomText
                        style={{
                            width: windowWidth * 0.6,
                            color: Color.black,
                            fontSize: moderateScale(15, 0.3),
                            // backgroundColor : 'red'
                        }}>
                        Recent added Files
                    </CustomText>
                    <CustomButton
                        text={'Add'}
                        textColor={Color.white}
                        width={windowWidth * 0.2}
                        height={windowHeight * 0.035}
                        onPress={() => {
                            selectedIndex == 'photo'
                                ? setShowMultiImageModal(true)
                                : selectedIndex == 'file-signature'
                                    ? setSignModalVisible(true)
                                    : handleDocumentSelection();
                        }}
                        bgColor={Color.themeBlue}
                        borderWidth={0}
                        borderRadius={moderateScale(30, 0.3)}
                        fontSize={moderateScale(12, 0.3)}
                    />
                </View>
            </View>
            {selectedIndex == 'photo' ? (
                <>
                    {image_loading ? <ActivityIndicator size="small"
                        color={Color.themeBlue} style={{ marginTop: moderateScale(20, 0.6) }} /> :
                        <AddImagesContainer
                            multiImages={multiImages}
                            setMultiImages={setMultiImages}
                            numberOfRows={3}
                        />
                    }
                </>
            ) :
                <>
                    {signature_loading ? <ActivityIndicator size="small"
                        color={Color.themeBlue} style={{ marginTop: moderateScale(20, 0.6) }} />
                        :
                        <>
                            {
                                selectedIndex == 'file-signature' ? (
                                    <AddSignatureContainer
                                        signatureImages={signatureImage}
                                        setSignatureImages={setSignatureImage}
                                        numberOfRows={3}
                                    />) : (
                                    <>
                                        {document_loading ? <ActivityIndicator size="small"
                                            color={Color.themeBlue} style={{ marginTop: moderateScale(20, 0.6) }} /> : (
                                            <FlatList
                                                numColumns={3}
                                                nestedScrollEnabled={true}
                                                data={fileResponse.flat()}
                                                showsVerticalScrollIndicator={false}
                                                contentContainerStyle={{
                                                    paddingBottom: moderateScale(20, 0.6),
                                                    alignItems: fileResponse.flat().length === 1 ? 'flex-start' : 'center',
                                                }}
                                                renderItem={({ item, index }) => {
                                                    const isSingleItem = fileResponse.flat().length === 1;
                                                    return (
                                                        <View style={{
                                                            width: isSingleItem ? windowWidth * 0.9 : windowWidth * 0.32,
                                                            flexDirection: 'row',
                                                            justifyContent: isSingleItem ? 'flex-start' : 'center', marginRight: moderateScale(10, 0.6)
                                                        }}>
                                                            <PdfContainer
                                                                key={index}
                                                                item={item}
                                                                setSelectedPdf={setSelectedPdf}
                                                                setShow={setShow}
                                                                show={show}
                                                                index={index}
                                                                setSelectedPDFIndex={setSelectedPDFIndex}
                                                            />
                                                        </View>
                                                    );
                                                }}
                                                ListEmptyComponent={<ListEmphtyComponent />}
                                            />
                                        )}
                                    </>
                                )
                            }
                        </>
                    }
                </>
            }
            <ImagePickerModal
                show={showMultiImageModal}
                setShow={setShowMultiImageModal}
                // setMultiImages={setMultiImages}
                setFileObject={setImage}
            />
            <PDFView
                setIsVisible={setShow}
                visible={show}
                uri={selectedPdf?.uri}
                index={selectedPDFIndex}
                id={selectedPdf?.id}
                fileResponse={fileResponse}
                setFileResponse={setFileResponse}
            />
            <Modal
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                isVisible={signModalVisible}
                hasBackDrop={true}>
                <View
                    style={{
                        width: windowWidth * 0.95,
                        height: windowHeight * 0.85,
                        borderRadius: moderateScale(20, 0.3),
                        backgroundColor: Color.white,
                        overflow: 'hidden',
                    }}>
                    <SignatureScreen
                        ref={ref}
                        style={{
                            buttonStyle: {
                                backgroundColor: 'orange',
                            },
                            confirmButtonStyle: {
                                backgroundColor: 'orange',
                            },
                        }}
                        onOK={signatureResult => {
                            const imageUri = `${signatureResult}`;
                            setSignature(imageUri);
                            setSignModalVisible(false);
                            sendSignature(imageUri);
                        }}
                        onEmpty={handleEmpty}
                        onClear={handleClear}
                        autoClear={true}
                        descriptionText={'Draw Signature'}
                        penColor={Color.themePink}
                        onClearButtonColor={'orange'}
                    />
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: Color.themeColor,
                            borderRadius: 5,
                            padding: 10,
                            marginBottom: moderateScale(110, 0.3),
                            marginHorizontal: 5,
                            color: 'black',
                        }}
                        placeholder="Enter signature name"
                        placeholderTextColor="gray"
                        value={name}
                        onChangeText={setName}
                    />
                    {signature ? (
                        <CustomButton
                            text={'Save Signature'}
                            textColor={Color.white}
                            width={windowWidth * 0.4}
                            height={windowHeight * 0.06}
                            marginBottom={moderateScale(20, 0.3)}
                            onPress={handleSave}
                            bgColor={Color.themeColor}
                            borderRadius={moderateScale(10, 0.3)}
                        />
                    ) : (
                        <CustomButton
                            text={'Close'}
                            textColor={Color.white}
                            width={windowWidth * 0.4}
                            height={windowHeight * 0.06}
                            marginBottom={moderateScale(20, 0.3)}
                            onPress={() => {
                                setSignModalVisible(false);
                            }}
                            bgColor={Color.themeColor}
                            borderRadius={moderateScale(10, 0.3)}
                        />
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Ewallet;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        paddingTop: moderateScale(10, 0.6),
    },
    main_view: {
        flex: 1,
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        width: '100%',
    },
    square: {
        width: windowWidth * 0.24,
        height: windowHeight * 0.12,
        borderRadius: moderateScale(10, 0.3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareContainer: {
        backgroundColor: Color.white,
        width: windowWidth * 0.9,
        paddingVertical: moderateScale(10, 0.3),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
        marginTop: moderateScale(10, 0.3),
        borderRadius: moderateScale(10, 0.3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(10, 0.3),
    },
    categoryListContainer: {
        paddingVertical: moderateScale(5, 0.6),
        paddingHorizontal: moderateScale(5, 0.6),
    },
    btn: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.1,
        backgroundColor: Color.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(10, 0.6),
        marginRight: moderateScale(10, 0.6),
    },
    noDataText: {
        textAlign: 'center',
        marginTop: moderateScale(20, 0.6),
        color: Color.red,
    },
    card: {
        width: windowWidth * 0.95,
        backgroundColor: Color.lightGrey,
        height: windowWidth * 0.18,
        borderRadius: moderateScale(10, 0.6),
        justifyContent: 'flex-start',
        alignItems: 'center', paddingHorizontal: moderateScale(5, 0.6),
        flexDirection: 'row',
        marginBottom: moderateScale(10, 0.6)
    },
    card_image: {
        height: windowHeight * 0.07,
        width: windowWidth * 0.2,
        borderRadius: moderateScale(10, 0.6),
    },
    description: {
        width: windowWidth * 0.8,
        fontSize: moderateScale(10, 0.6),
        color: Color.darkGray
    },
    heading: {
        fontSize: moderateScale(12, 0.6),
        color: Color.black
    },
    upperContainer: {
        backgroundColor: Color.white,
        paddingVertical: moderateScale(20, 0.6),
        width: windowWidth - 0.5,
        alignItems: 'center',
    },
});
