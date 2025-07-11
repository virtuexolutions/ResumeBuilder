import { Icon } from 'native-base';
import React, { useState } from 'react';
import { FlatList, Linking, PermissionsAndroid, Platform, ToastAndroid, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
// import RNFetchBlob from 'react-native-fs';
import Color from '../Assets/Utilities/Color';
import { Delete } from '../Axios/AxiosInterceptorFunction';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import NullDataComponent from './NullDataComponent';

const AddImagesContainer = ({
  multiImages,
  setMultiImages,
  style,
  numberOfRows,
}) => {

  const [selectedIndex, setIndex] = useState(0);
  // console.log("🚀 ~ file: AddImagesContainer.js:30 ~ selectedIndex:", selectedIndex)
  // console.log("🚀 ~ file: AddImagesContainer.js:32 ~ selectedIndex:", selectedIndex , multiImages)
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

  //Download Image functions
  const checkPermission = async () => {

    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        // console.log('heererere')
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        // console.log("🚀 ~ file: AddImagesContainer.js:78 ~ checkPermission ~ granted:", granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          // console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // OpenSetting()
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  const OpenSetting = async () => {
    try {
      const result = await Linking.openSettings();
      console.log(result);
    } catch (err) {
      console.warn(err);
    }
  }

  // const downloadImage = () => {
  //   // Main function to download the image

  //   // To add the time suffix in filename
  //   let date = new Date();
  //   // Image URL which we want to download
  //   let image_URL = multiImages[selectedIndex]?.uri;  
  //     // console.log("🚀 ~ file: AddImagesContainer.js:116 ~ downloadImage ~ image_URL:", image_URL)
  //     // const image = multiImages[selectedIndex];
  //     // if (typeof image.uri !== 'string') {
  //     //   console.log('Invalid image URI');
  //     //   return;
  //     // }
  //   // Getting the extention of the file
  //   let ext = getExtention(image_URL);
  //   ext = '.' + ext[0];
  //   // Get config and fs from RNFetchBlob
  //   // config: To pass the downloading related options
  //   // fs: Directory path where we want our image to download
  //   // const { config, fs } = RNFetchBlob;
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
  //       setIsVisible(false)
  //       // Showing alert after successful downloading
  //       // console.log('res -> ', JSON.stringify(res));
  //      Platform.OS == 'android' ? ToastAndroid.show('Image Downloaded',ToastAndroid.SHORT) :
  //       alert('Image Downloaded');
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
    const url = `image/delete/${id}`;
    const response = await Delete(url, {}, apiHeader(token));
    if (response != undefined) {
      console.log('image Deleted=======>>>>>>>', response?.data)
      Platform.OS == 'android' ? ToastAndroid.show('Image Deleted', ToastAndroid.SHORT) : alert('Image Deleted')


    }
  }

  // const incrementCount = useCallback(() => {
  //   setIndex(prev=>prev+1);
  // }, []);


  return (
    <>
      <FlatList
        numColumns={numberOfRows}
        nestedScrollEnabled={true}
        data={multiImages}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6)
        }}
        // keyExtractor={}
        renderItem={({ item, index }) => {
          return (
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
          );
        }}
        ListEmptyComponent={() => {
          return (
            <NullDataComponent title={'No Image Uploaded Yet'} />
          )
        }}
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
      // onImageIndexChange={index => incrementCount}
      // FooterComponent={() => (
      //   <View
      //     style={{ width: windowWidth , paddingBottom : moderateScale(10,0.6)}}>
      //     <Text style={styles.text}>{`${selectedIndex + 1}/${
      //       multiImages.length
      //     }`}</Text>
      //   </View>
      // )}
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
    width: windowWidth * 0.33,
    backgroundColor: Color.white,
    height: windowHeight * 0.15,
    marginRight: moderateScale(2, 0.3),
    marginTop: moderateScale(2, 0.3),
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
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
