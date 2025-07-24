import { Icon } from 'native-base';
import { useState } from 'react';
import { FlatList, Linking, PermissionsAndroid, Platform, ToastAndroid, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'react-native-blob-util';
import Color from '../Assets/Utilities/Color';
import { Delete, Post } from '../Axios/AxiosInterceptorFunction';
import { apiHeader, requestWritePermission, windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import NullDataComponent from './NullDataComponent';
import ListEmphtyComponent from './ListEmphtyComponent';

const AddImagesContainer = ({
  multiImages,
  setMultiImages,
  style,
  numberOfRows,
}) => {

  const [selectedIndex, setIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);
  const token = useSelector((state) => state.authReducer.token)

  const statusArray = [
    {
      label: 'Delete', onPress: () => {

        if (multiImages?.length == 1) {
          setIsVisible(false)
        }
        else if (selectedIndex == multiImages.length - 1) {
          setIndex(selectedIndex - 1)
        }
        //  else{
        //    setIndex(prev=>prev+1)
        //  }

        let newArray = [...multiImages];
        newArray.splice(selectedIndex, 1);
        // console.log("🚀 ~ file: AddImagesContainer.js:39 ~ newArray:", newArray)
        deleteImage(multiImages[selectedIndex]?.id)
        setMultiImages(newArray);
        setListModalVisible(false);
        setIsVisible(false)

      }
    },
    { label: 'Save to Gallery', onPress: async () => { await checkPermission() } },
    { label: 'Close', onPress: () => { setListModalVisible(false), setIsVisible(false) } },
  ];



  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const sdk = Platform.Version;

        if (sdk >= 33) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          );
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission granted for READ_MEDIA_IMAGES');
            downloadImage();
          } else {
            OpenSetting()
            console.log('Permission denied');
          }

        } else {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Access Required',
              message: 'App needs access to your storage to save images',
            },
          );

          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission granted for WRITE_EXTERNAL_STORAGE');
            downloadImage();
          } else {
            OpenSetting()
            console.log('Permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };
  }

  const OpenSetting = async () => {
    try {
      const result = await Linking.openSettings();
      console.log(result);
    } catch (err) {
      console.warn(err);
    }

  }

  const downloadImage = async () => {
    try {
      let rawPath = multiImages[selectedIndex]?.uri;

      if (!rawPath) {
        console.log('Image URI not found');
        return;
      }

      const isRemote = rawPath.startsWith('http://') || rawPath.startsWith('https://');
      const date = new Date();
      const ext = rawPath.split('.').pop();
      const fileName = `image_${Date.now()}.${ext}`;

      const { config, fs } = RNFetchBlob;
      const PictureDir = fs.dirs.PictureDir;
      const destPath = `${PictureDir}/${fileName}`;

      if (isRemote) {
        // Remote image: download via GET
        const options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: destPath,
            description: 'Image',
          },
        };

        config(options)
          .fetch('GET', rawPath)
          .then(res => {
            setListModalVisible(false);
            setIsVisible(false);
            Platform.OS === 'android'
              ? ToastAndroid.show('Image Downloaded', ToastAndroid.SHORT)
              : alert('Image Downloaded');
          })
          .catch(err => {
            console.log('Download error:', err);
          });

      } else {
        const imagePath = rawPath.startsWith('file://') ? rawPath : `file://${rawPath}`;
        await fs.cp(imagePath, destPath);

        setListModalVisible(false);
        setIsVisible(false);
        Platform.OS === 'android'
          ? ToastAndroid.show('Image Saved', ToastAndroid.SHORT)
          : alert('Image Saved');
      }

    } catch (err) {
      console.log('Image download/save error:', err);
    }
  };


  // const downloadImage = () => {
  //   console.log('is funcion me ha')
  //   // Main function to download the image
  //   // To add the time suffix in filename
  //   let date = new Date();
  //   // Image URL which we want to download
  //   let image_URL = multiImages[selectedIndex]?.uri;
  //   // console.log("🚀 ~ file: AddImagesContainer.js:116 ~ downloadImage ~ image_URL:", image_URL)
  //   // const image = multiImages[selectedIndex];
  //   // if (typeof image.uri !== 'string') {
  //   //   console.log('Invalid image URI');
  //   //   return;
  //   // }
  //   // Getting the extention of the file
  //   let ext = getExtention(image_URL);
  //   ext = '.' + ext[0];
  //   // Get config and fs from RNFetchBlob
  //   // config: To pass the downloading related options
  //   // fs: Directory path where we want our image to download
  //   const { config, fs } = RNFetchBlob;
  //   let PictureDir = fs.dirs.PictureDir;
  //   // console.log("🚀 ~ file: AddImagesContainer.js:130 ~ downloadImage ~ PictureDir:", PictureDir)
  //   let options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       // Related to the Android only
  //       useDownloadManager: true,
  //       notification: true,
  //       path:
  //         PictureDir +
  //         '/image_' +
  //         Math.floor(date.getTime() + date.getSeconds() / 2) +
  //         ext,
  //       description: 'Image',
  //     },
  //   };
  //   config(options)
  //     .fetch('GET', image_URL)
  //     .then(res => {
  //       setListModalVisible(false),
  //         setIsVisible(false)
  //       // Showing alert after successful downloading
  //       // console.log('res -> ', JSON.stringify(res));
  //       Platform.OS == 'android' ? ToastAndroid.show('Image Downloaded', ToastAndroid.SHORT) :
  //         alert('Image Downloaded');
  //     })
  //     .catch(errorMessage => {
  //       console.log(errorMessage);
  //     });
  // };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
      /[^.]+$/.exec(filename) : undefined;
  };

  const deleteImage = async (id) => {
    const url = `auth/image/${id}`;
    const response = await Post(url, {}, apiHeader(token));
    if (response != undefined) {
      console.log('image Deleted=======>>>>>>>', response?.data)
      Platform.OS == 'android' ? ToastAndroid.show('Image Deleted', ToastAndroid.SHORT) : alert('Image Deleted')
    }
  }

  return (
    <>
      <FlatList
        numColumns={numberOfRows}
        nestedScrollEnabled={true}
        data={multiImages}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: multiImages.length === 1 ? 'flex-start' : 'center',
        }}
        renderItem={({ item, index }) => {
          const isSingleItem = multiImages.length === 1;
          return (
            <View style={{
              width: isSingleItem ? windowWidth * 0.9 : windowWidth * 0.32,
              flexDirection: 'row',
              justifyContent: isSingleItem ? 'flex-start' : 'center',
            }}>
              <View style={[styles.addImageContainer, style]} key={index} >
                <CustomImage
                  source={{ uri: item?.uri }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  onPress={() => {
                    setIndex(index);
                    setIsVisible(true);
                  }}
                  key={index}
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={<ListEmphtyComponent />}
      />

      <ImageView
        imageIndex={selectedIndex}
        images={multiImages}
        visible={visible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
        key={selectedIndex}
        HeaderComponent={() => {
          return (
            <View style={styles.header}>
              <Icon
                name={'dots-three-vertical'}
                as={Entypo}
                size={moderateScale(20, 0.6)}
                color={Color.white}
                style={{
                  width: windowWidth * 0.98,
                  textAlign: 'right'
                }}
                onPress={() => {
                  setListModalVisible(true)
                }}
              />
            </View>
          )
        }}
      />
      <Modal
        isVisible={listModalVisible}
        hasBackdrop={true}
        onBackdropPress={() => {
          setListModalVisible(false);
        }}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationInTiming={700}
        animationOutTiming={700}
        backdropOpacity={0}
        style={{
          justifyContent: 'flex-start',
        }}

      >
        <View style={styles.statusModal}>
          {statusArray.map((item, index) => {
            return (
              <View
                key={index}

              >
                <CustomText
                  onPress={item?.onPress}
                  style={{
                    borderColor: Color.themeBlack,
                    lineHeight: moderateScale(25, 0.3),
                    marginTop: moderateScale(10, 0.3),
                    color: Color.white,
                  }}
                >
                  {item?.label}
                </CustomText>
              </View>
            );
          })}
        </View>
      </Modal>
    </>
  );
};

export default AddImagesContainer;

const styles = ScaledSheet.create({
  addImageContainer: {
    width: windowWidth * 0.3,
    backgroundColor: Color.white,
    height: windowHeight * 0.14,
    marginRight: moderateScale(3, 0.3),
    borderRadius: moderateScale(10, 0.6),
    marginTop: moderateScale(5, 0.3),
    // shadowColor: Color.grey,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,

    // elevation: 9,
    overflow: 'hidden',
  },

  text: {
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
    textAlign: 'center'

  },
  header: {
    width: windowWidth,
    paddingVertical: moderateScale(10, 0.6),
    backgroundColor: 'black',
    opacity: 0.5,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.themeBlack,
    marginTop: moderateScale(20, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
    borderRadius: moderateScale(5, 0.6)
  },
});
