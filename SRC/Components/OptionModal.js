import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import { Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo'
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import AddImagesContainer from './AddImagesContainer';
import AddSignatureContainer from './AddSignatureContainer';
import PdfContainer from './PdfContainer';
import ListEmphtyComponent from './ListEmphtyComponent';
import TextInputWithTitle from './TextInputWithTitle';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';

const OptionModal = ({ show, setShow, style, selectedType, item }) => {
    console.log(selectedType, 'selectedtype')
    const token = useSelector(state => state.authReducer.token);
    const [loading, setLoading] = useState(false);
    const [btn_loading, setBtnLoading] = useState(false);
    const [multiImages, setMultiImages] = useState([]);
    const [signatureImage, setSignatureImage] = useState([]);
    const [fileResponse, setFileResponse] = useState([]);
    const userData = useSelector(state => state.commonReducer.userData);
    const [summary, setSummary] = useState(false)
    const [selectedImage, setSelectedImage] = useState([])
    const [selectedPdf, setSelectedPdf] = useState('');
    const [selectedPDFIndex, setSelectedPDFIndex] = useState(0);
    const [selectedPdfs, setSelectedPdfs] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const type = selectedType?.toLowerCase()?.trim();
        console.log("Normalized selectedType:", type);

        if (type === 'image') {
            getPhotos();
        } else if (type === 'signature') {
            getSignature();
        } else if (type === 'document') {
            getDocs();
        }
    }, [selectedType]);


    const getPhotos = async () => {
        try {
            const url = 'auth/image/index';
            const response = await Get(url, token);
            setLoading(true)
            if (response != undefined) {
                setLoading(false)
                setMultiImages(response?.data?.image);
            }
        } catch (err) {
            console.log(err, 'errrrrrrrrrrrrrrrrrrrrrrrrrrrorrrrr')
        }
    };

    const getDocs = async () => {
        try {
            const url = 'auth/document/index';
            setLoading(true);
            const response = await Get(url, token);
            console.log("Docs API response:", response?.data);
            if (response) {
                setFileResponse(response?.data?.Document);
            }
        } catch (err) {
            console.log("getDocs error ===>", err);
        } finally {
            setLoading(false);
        }
    };

    const getSignature = async () => {
        const url = 'auth/signature/index';
        setLoading(true)
        const response = await Get(url, token);
        setLoading(false)
        if (response != undefined) {
            setLoading(false)
            setSignatureImage(response?.data?.Signature);
        }
    };


    const isSingleItem = multiImages.length === 1;
    const isSingledoc = signatureImage.length === 1;


    const onPressSubmit = async (type) => {
        const url = `auth/template_response`;
        let response;
        setBtnLoading(true);

        try {
            if (type === "text") {
                const data = {
                    employee_id: userData?.employee_detail?.id,
                    template_assign_id: item?.id,
                    response_type: selectedType,
                    response_value: summary,
                };
                console.log("Sending text data ===>", data);
                response = await Post(url, data, apiHeader(token));
            } else {
                const formData = new FormData();
                formData.append("employee_id", userData?.employee_detail?.id.toString());
                formData.append("template_assign_id", item?.id.toString());
                formData.append("response_type", selectedType);

                if (selectedType === "image") {
                    selectedImage.forEach((img, index) => {
                        formData.append("response_value[]", {
                            uri: img.uri,
                            type: "image/jpeg",
                            name: `image_${img.id || index}.jpg`,
                        });
                    });
                } else if (selectedType === "document") {
                    selectedPdfs.forEach((doc, index) => {
                        formData.append("response_value[]", {
                            uri: doc.uri,
                            type: "application/pdf",
                            name: doc.name || `document_${index}.pdf`,
                        });
                    });

                } else {
                    selectedItems.forEach((sign, index) => {
                        formData.append("response_value[]", {
                            uri: sign.uri,
                            type: "application/pdf",
                            name: sign.name || `document_${index}.pdf`,
                        });
                    });
                }

                // Debugging FormData
                for (let pair of formData._parts) {
                    console.log(pair[0], pair[1]);
                }

                response = await Post(url, formData, apiHeader(token, true));
            }

            console.log("🚀 ~ onPressSubmit ~ response:", response?.data);

            if (response?.data) {
                navigationService.navigate("MyDrawer");
                Platform.OS === "android"
                    ? ToastAndroid.show("Sent SuccessFully", ToastAndroid.SHORT)
                    : Alert.alert("Sent SuccessFully");
            }
        } catch (error) {
            console.log("Submit error ===>", error);
        } finally {
            setBtnLoading(false);
        }
    };


    const toggleSelectPdf = (pdf, index) => {
        setSelectedPdfs((prev) => {
            const exists = prev.find((p) => p.id === pdf.id);
            if (exists) {
                return prev.filter((p) => p.id !== pdf.id);
            } else {
                return [...prev, pdf];
            }
        });
    };


    return (
        <Modal
            isVisible={show}
            swipeDirection="up"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onBackdropPress={() => {
                setShow(false);
            }}>
            <View style={styles.modal_main_view}>
                <View style={styles.modal_sub_view}>
                    <View style={styles.row_view}>
                        <CustomText isBold style={styles.heading}>{`Add ${selectedType}`}</CustomText>
                        <TouchableOpacity onPress={() => setShow(false)} style={{
                            width: windowWidth * 0.07,
                            height: windowWidth * 0.07,
                            backgroundColor: Color.themeBlue,
                            borderRadius: moderateScale(10, 0.6),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon name='cross' as={Entypo} size={moderateScale(20, 0.6)} color={Color.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: windowWidth * 0.86,
                        paddingHorizontal: moderateScale(15, 0.6),
                        marginTop: moderateScale(12, 0.6)
                    }}>
                        {selectedType === 'image' && (
                            <View style={{
                                height: windowHeight * 0.43,
                            }}>
                                {loading ? <ActivityIndicator size="small"
                                    color={Color.themeBlue} style={{ marginTop: moderateScale(20, 0.6) }} /> :
                                    <AddImagesContainer
                                        style={{
                                            width: windowWidth * 0.17,
                                            height: windowHeight * 0.09,
                                        }}
                                        mainstyle={{
                                            width: isSingleItem ? windowWidth * 0.85 : windowWidth * 0.2,
                                        }}
                                        multiImages={multiImages}
                                        setMultiImages={setMultiImages}
                                        numberOfRows={4}
                                        setSelectedImage={setSelectedImage}
                                        selectedImage={selectedImage}
                                        isWallet={true}
                                    />
                                }
                                <CustomButton
                                    text={btn_loading ? <ActivityIndicator size="small"
                                        style={styles.indicatorStyle}
                                        color={Color.white} /> : 'Submit'}
                                    textColor={Color.white}
                                    onPress={() => {
                                        onPressSubmit('images')
                                    }}
                                    width={windowWidth * 0.7}
                                    height={windowHeight * 0.060}
                                    borderRadius={moderateScale(20, 0.3)}
                                    bgColor={Color.themeBlue}
                                    marginTop={moderateScale(20, 0.6)}
                                    style={{
                                        position: 'absolute',
                                        bottom: 20
                                    }}
                                />
                            </View>
                        )}

                        {selectedType === 'signature' && (
                            <View style={{
                                height: windowHeight * 0.43,
                            }}>
                                <AddSignatureContainer
                                    signatureImages={signatureImage}
                                    setSignatureImages={setSignatureImage}
                                    numberOfRows={3}
                                    style={{
                                        backgroundColor: Color.lightGrey,
                                        width: windowWidth * 0.22,
                                        height: windowHeight * 0.14,
                                    }}
                                    mainStyle={{
                                        width: isSingleItem ? windowWidth * 0.9 : windowWidth * 0.25,
                                    }}
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}
                                    isWallet={false}
                                />
                                <CustomButton
                                    text={btn_loading ? <ActivityIndicator size="small"
                                        style={styles.indicatorStyle}
                                        color={Color.white} /> : 'Submit'}
                                    textColor={Color.white}
                                    onPress={() => {
                                        onPressSubmit('signature')
                                    }}
                                    width={windowWidth * 0.7}
                                    height={windowHeight * 0.060}
                                    borderRadius={moderateScale(20, 0.3)}
                                    bgColor={Color.themeBlue}
                                    marginTop={moderateScale(20, 0.6)}
                                    style={{
                                        position: 'absolute',
                                        bottom: 20
                                    }}
                                />
                            </View>
                        )}

                        {selectedType === 'document' && (
                            <>
                                {loading ? <ActivityIndicator size="small"
                                    color={Color.themeBlue} style={{ marginTop: moderateScale(20, 0.6) }} /> : (
                                    <View style={{
                                        height: windowHeight * 0.43,
                                    }}>
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
                                                const isSelected = !!selectedPdfs.find((pdf) => pdf.id === item.id);

                                                return (
                                                    <View style={{
                                                        width: isSingleItem ? windowWidth * 0.9 : windowWidth * 0.2,
                                                        flexDirection: 'row',
                                                        justifyContent: isSingleItem ? 'flex-start' : 'center', marginRight: moderateScale(10, 0.6),
                                                    }}>
                                                        <PdfContainer
                                                            key={index}
                                                            item={item}
                                                            setSelectedPdf={setSelectedPdf}
                                                            setShow={setShow}
                                                            show={show}
                                                            index={index}
                                                            setSelectedPDFIndex={setSelectedPDFIndex}
                                                            isSelected={isSelected}
                                                            onToggleSelect={toggleSelectPdf}
                                                            style={{
                                                                width: windowWidth * 0.22,
                                                                height: windowHeight * 0.12, shadowColor: "#000",
                                                                shadowOffset: {
                                                                    width: 0,
                                                                    height: 2,
                                                                },
                                                                shadowOpacity: 0.25,
                                                                shadowRadius: 3.84,
                                                                elevation: 5,
                                                                marginLeft: moderateScale(3, 0.6)
                                                            }}
                                                        />
                                                    </View>
                                                );
                                            }}
                                            ListEmptyComponent={<ListEmphtyComponent />}
                                        />
                                        <CustomButton
                                            text={btn_loading ? <ActivityIndicator size="small"
                                                style={styles.indicatorStyle}
                                                color={Color.white} /> : 'Submit'}
                                            textColor={Color.white}
                                            onPress={() => {
                                                onPressSubmit('document')
                                            }}
                                            width={windowWidth * 0.7}
                                            height={windowHeight * 0.060}
                                            borderRadius={moderateScale(20, 0.3)}
                                            bgColor={Color.themeBlue}
                                            marginTop={moderateScale(20, 0.6)}
                                            style={{
                                                position: 'absolute',
                                                bottom: 20
                                            }}
                                        />
                                    </View>
                                )}
                            </>
                        )
                        }
                        {selectedType === 'text' &&
                            (
                                <View style={{
                                    height: windowHeight * 0.43,
                                }}>
                                    <TextInputWithTitle
                                        title={"Add Summary : "}
                                        color={Color.veryLightGray}
                                        setText={setSummary}
                                        value={summary}
                                        placeholder={'write your summary here'}
                                        placeholderColor={Color.veryLightGray}
                                        viewWidth={0.79}
                                        viewHeight={0.20}
                                        border={1}
                                        borderRadius={moderateScale(10, 0.6)}
                                        borderColor={Color.themeBlue}
                                        inputHeight={windowHeight * 0.195}
                                        multiline
                                    />
                                    <CustomButton
                                        text={btn_loading ? <ActivityIndicator size="small"
                                            style={styles.indicatorStyle}
                                            color={Color.white} /> : 'Submit'}
                                        textColor={Color.white}
                                        onPress={() => {
                                            onPressSubmit('text')
                                        }}
                                        width={windowWidth * 0.7}
                                        height={windowHeight * 0.060}
                                        borderRadius={moderateScale(20, 0.3)}
                                        bgColor={Color.themeBlue}
                                        marginTop={moderateScale(20, 0.6)}
                                        style={{
                                            position: 'absolute',
                                            bottom: 20
                                        }}
                                    />
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default OptionModal

const styles = StyleSheet.create({
    modal_main_view: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'rgba(0, 0, 0,0.1)',
        alignItems: "center",
        justifyContent: "center"
    },
    modal_sub_view: {
        width: windowWidth * 0.86,
        height: windowHeight * 0.5,
        backgroundColor: Color.white,
        borderRadius: moderateScale(15, 0.6),
        alignItems: 'center',
        paddingHorizontal: moderateScale(12, 0.6),
        paddingVertical: moderateScale(20, 0.6)
    },
    heading: {
        fontSize: moderateScale(20, 0.6),
        color: Color.themeBlue
    },
    row_view: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        width: windowWidth * 0.8,
    }

})