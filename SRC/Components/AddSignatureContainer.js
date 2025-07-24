import { StyleSheet, Text, View, PermissionsAndroid, Linking } from 'react-native';
import React, { useCallback, useState } from 'react';

import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { FlatList } from 'react-native';
import { Icon } from 'native-base';

import Color from '../Assets/Utilities/Color';

import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

import ImageView from 'react-native-image-viewing';
import CustomText from './CustomText';
import NullDataComponent from './NullDataComponent';
import Modal from 'react-native-modal';
import RNFetchBlob from 'react-native-blob-util';
import { Platform } from 'react-native';
import { ToastAndroid } from 'react-native';

import ImageContainer from './ImageContainer';
import { Delete, Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import CustomImage from './CustomImage';
import { baseUrl, imageUrl } from '../Config';
import ListEmphtyComponent from './ListEmphtyComponent';

const AddSignatureContainer = ({
  signatureImages,
  setSignatureImages,
  style,
  numberOfRows,
}) => {
  const token = useSelector((state) => state.authReducer.token)

  const [selectedIndex, setIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const [listModalVisible, setListModalVisible] = useState(false);

  const statusArray = [
    {
      label: 'Delete', onPress: () => {

        if (signatureImages?.length == 1) {
          setIsVisible(false)
        }
        else if (selectedIndex == signatureImages.length - 1) {
          setIndex(selectedIndex - 1)
        }
        //  else{
        //    setIndex(prev=>prev+1)
        //  }

        let newArray = [...signatureImages];
        newArray.splice(selectedIndex, 1);
        deleteSignature(signatureImages[selectedIndex].id)
        setSignatureImages(newArray);
        setListModalVisible(false);
        setIsVisible(false);

      }
    },
    { label: 'Save to Gallery', onPress: async () => { await checkPermission() } },
    { label: 'Close', onPress: () => { setListModalVisible(false), setIsVisible(false) } },
  ];

  const deleteSignature = async (id) => {
    const url = `auth/signature/${id}`;
    const response = await Post(url, {}, apiHeader(token));
    console.log("🚀 ~ deleteSignature ~ response:", response?.data)
    if (response != undefined) {
      Platform.OS == 'android' ? ToastAndroid.show('Signature Deleted', ToastAndroid.SHORT) : alert('Signature Deleted')
    }
  }


  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadSignature();
    } else {
      try {
        const sdk = Platform.Version;

        if (sdk >= 33) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          );
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission granted for READ_MEDIA_IMAGES');
            downloadSignature();
          } else {
            console.log('Permission denied');
            OpenSetting()
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
            downloadSignature();
          } else {
            console.log('Permission denied');
            OpenSetting()
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };
  }

  // const checkPermission = async () => {

  //   // Function to check the platform
  //   // If iOS then start downloading
  //   // If Android then ask for permission

  //   if (Platform.OS === 'ios') {
  //     downloadSignature();
  //   } else {
  //     try {
  //       // console.log('heererere')
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission Required',
  //           message:
  //             'App needs access to your storage to download Photos',
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Once user grant the permission start downloading
  //         // console.log('Storage Permission Granted.');
  //         downloadSignature();
  //       } else {
  //         // OpenSetting()
  //         // If permission denied then show alert
  //         alert('Storage Permission Not Granted');
  //       }
  //     } catch (err) {
  //       // To handle permission related exception
  //       console.warn(err);
  //     }
  //   }
  // };
  const OpenSetting = async () => {
    try {
      const result = await Linking.openSettings();
      // console.log(result);
    } catch (err) {
      console.warn(err);
    }
  }

  const downloadSignature = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = signatureImages[selectedIndex]?.uri;
    let imagePath = image_URL.split('data:image/png;base64,', 2)
    //   console.log('imageURl=>>>>>>>>>> ',imagePath)
    const dirs = RNFetchBlob.fs.dirs;
    const filePath =
      dirs.DownloadDir +
      '/' +
      'signture' +
      new Date().getMilliseconds() +
      '.png';
    RNFetchBlob.fs
      .writeFile(filePath, imagePath[1], 'base64')
      .then(() => {
        // setSignatureImage(filePath);
        // console.log('Successfuly saved to' + filePath);
        setListModalVisible(false);
        setIsVisible(false);
        Platform.OS == 'android' ? ToastAndroid.show('Signature Downloaded', ToastAndroid.SHORT) :
          alert('Signature Downloaded');
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
    // Getting the extention of the file
    //   let ext = getExtention(image_URL);
    //   ext = '.' + ext[0];
    //   // Get config and fs from RNFetchBlob
    //   // config: To pass the downloading related options
    //   // fs: Directory path where we want our image to download
    //   const { config, fs } = RNFetchBlob;
    //   let PictureDir = fs.dirs.PictureDir;
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
    //       description: 'Signature',
    //     },
    //   };
    //   config(options)
    //     .fetch('GET', image_URL)
    //     .then(res => {
    //       setListModalVisible(false),
    //       // Showing alert after successful downloading
    //     //  console.log('res -> ', JSON.stringify(res));
    //      Platform.OS == 'android' ? ToastAndroid.show('Image Downloaded Successfully') :
    //       alert('Image Downloaded Successfully.');
    //     });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
      /[^.]+$/.exec(filename) : undefined;
  };

  // const incrementCount = useCallback(() => {
  //   setIndex(prev=>prev+1);
  // }, []);


  return (
    <>
      <FlatList
        numColumns={3}
        nestedScrollEnabled={true}
        data={signatureImages}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.6),
          alignItems: signatureImages.length === 1 ? 'flex-start' : 'center',
        }}
        renderItem={({ item, index }) => {
          const isSingleItem = signatureImages.length === 1;
          return (
            <View style={{
              width: isSingleItem ? windowWidth * 0.9 : windowWidth * 0.32,
              flexDirection: 'row',
              justifyContent: isSingleItem ? 'flex-start' : 'center',
            }}>
              <View style={[styles.addImageContainer, style]} key={index} >
                <View style={styles.header}>
                  <Icon name="picture-o" as={FontAwesome} style={styles.icon}
                    size={moderateScale(16, 0.6)}
                  />
                  <CustomText style={styles.name}>{item?.name}</CustomText>
                </View>
                <CustomImage
                  source={{ uri: `${item?.uri}` }}
                  style={{
                    width: '100%',
                    height: '72%',
                  }}
                  onPress={() => {
                    setIndex(index);
                    setIsVisible(true);
                  }}
                  key={index}
                />

                <View style={styles.footer}>
                  <CustomText style={styles.date}>{item?.date}</CustomText>
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={<ListEmphtyComponent />
        }
      />

      <ImageView
        imageIndex={selectedIndex}
        images={signatureImages}
        visible={visible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
        backgroundColor={Color.white}
        key={selectedIndex}
        HeaderComponent={() => {
          return (
            <View style={styles.header}>
              <Icon
                name={'dots-three-vertical'}
                as={Entypo}
                size={moderateScale(20, 0.6)}
                color={Color.black}
                style={{
                  width: windowWidth * 0.98,
                  textAlign: 'right',
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
        <View style={[styles.statusModal, {
          backgroundColor: Color.white
        }]}>
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
                    color: Color.black,
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

export default AddSignatureContainer;

const styles = ScaledSheet.create({
  addImageContainer: {
    width: windowWidth * 0.3,
    backgroundColor: Color.white,
    height: windowHeight * 0.15,
    marginRight: moderateScale(6, 0.3),
    marginTop: moderateScale(10, 0.3),
    overflow: 'hidden',
    marginBottom: moderateScale(2, 0.3),
    borderRadius: 10,
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
    opacity: 0.30,
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
  customText: {
    position: 'absolute',
    borderTopStartRadius: 5,
    zIndex: 1,
    bottom: 1,
    borderColor: Color.themeBlue,
    backgroundColor: 'transparent',
    borderRadius: 7,
    borderTopWidth: 2,
    color: Color.themeBlue,
    width: '100%',
    fontSize: moderateScale(10, 0.6),
    padding: 6,
    fontWeight: 'bold'
  },
  footer: {
    //borderRadius: 10,
    padding: moderateScale(4, 0.6),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // zIndex: 1,
    alignItems: 'center',
    // borderRadius:10,
    // padding: moderateScale(10,0.6),
    // height:10,
    // bottom:1,
    borderTopColor: Color.themeBlue,
    borderTopWidth: 0.5,
    // position:'absolute',
    // width:'100%',
    // zIndex:1,
  },
  date: {
    fontSize: moderateScale(12, 0.6),
    color: Color.themeBlue,
    zIndex: 2,
    bottom: 1,
    fontWeight: 'bold',

  },
  header: {
    padding: moderateScale(4, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    marginRight: moderateScale(10, 0.3),
    color: Color.themeBlue,
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6)
  },
  name: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: 'bold',
    color: Color.themeBlue,
  },

});
