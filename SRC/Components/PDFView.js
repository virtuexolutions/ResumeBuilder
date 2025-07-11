import { View, PermissionsAndroid, Platform } from 'react-native';
import React, { useState } from 'react';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Modal from 'react-native-modal';
import Pdf from 'react-native-pdf';
import CustomButton from './CustomButton';
import { Delete } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
// import RNFetchBlob from 'react-native-fs';
import { ToastAndroid } from 'react-native';



const PDFView = ({ uri, setIsVisible, visible, id, setFileResponse, fileResponse, index }) => {
  console.log("🚀 ~ file: PDFView.js:14 ~ PDFView ~ uri:", fileResponse[index]?.uri)
  console.log("🚀 ~ file: PDFView.js:12 ~ PDFView ~ id:", index)
  // console.log("🚀 ~ file: PDFView.js:12 ~ PDFView ~ index:", index)
  // const [selectedIndex, setIndex] = useState(index);
  // console.log("🚀 ~ file: PDFView.js:13 ~ PDFView ~ selectedIndex:", selectedIndex)
  // console.log('selectedIndex',selectedIndex);
  const token = useSelector((state) => state.authReducer.token)
  console.log('selected File', fileResponse[index])

  // console.log('🚀 ~ file: PDFView.js:9 ~ PDFView ~ uri:', uri);
  const [listModalVisible, setListModalVisible] = useState(false);



  const checkPermission = async () => {

    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission
    console.log('check permissions')

    if (Platform.OS === 'ios') {
      downloadPDF();
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
        //  console.log("🚀 ~ file: AddImagesContainer.js:78 ~ checkPermission ~ granted:", granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadPDF();
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

  // const downloadPDF = () => {
  //   // Main function to download the image

  //   // To add the time suffix in filename
  //   let date = new Date();
  //   // Image URL which we want to download
  //   let doc_URL = fileResponse[index]?.uri;
  //   console.log("🚀 ~ file: PDFView.js:66 ~ downloadPDF ~ doc_URL:", doc_URL)


  //   // Getting the extention of the file
  //   let ext = getExtention(doc_URL);
  //   ext = '.' + ext[0];
  //   console.log('got extension', ext);
  //   // Get config and fs from RNFetchBlob
  //   // config: To pass the downloading related options
  //   // fs: Directory path where we want our image to download
  //   const { config, fs } = RNFetchBlob;
  //   let PictureDir = fs.dirs.DownloadDir;
  //   console.log("🚀 ~ file: AddImagesContainer.js:130 ~ downloadImage ~ PictureDir:", PictureDir)
  //   let options = {
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       // Related to the Android only
  //       useDownloadManager: true,
  //       notification: true,
  //       path:
  //         PictureDir +
  //         '/document' +
  //         Math.floor(date.getTime() + date.getSeconds() / 2) +
  //         ext,
  //       description: 'Document',
  //     },
  //   };
  //   config(options)
  //     .fetch('GET', doc_URL)
  //     .then(res => {
  //       setListModalVisible(false),
  //         // Showing alert after successful downloading

  //         // console.log('res -> ', JSON.stringify(res));
  //         setIsVisible(false)
  //       Platform.OS == 'android' ? ToastAndroid.show('Document Downloaded', ToastAndroid.SHORT) :
  //         alert('Document Downloaded');
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




  const deletePDF = async (id) => {
    const url = `document/delete/${id}`;
    const response = await Delete(url, {}, apiHeader(token));
    if (response != undefined) {
      console.log(response?.data)
      if (response?.data?.success) {
        Platform.OS == 'android' ? ToastAndroid.show('Document Deleted', ToastAndroid.SHORT) : alert('Document Deleted')
      }
    }
  }
  return (
    <Modal
      isVisible={visible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      }}>
      <View
        style={{
          width: windowWidth * 0.9,
          height: windowHeight * 0.9,
          backgroundColor: 'white',
        }}>
        <View style={styles.container}>
          <Pdf
            source={{
              // uri: 'content://com.android.providers.media.documents/document/document%3A1000084194',
              uri: fileResponse[index]?.uri,
            }}
            style={styles.pdf}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            trustAllCerts={false}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomButton
              text={'Download'}
              textColor={Color.white}
              width={windowWidth * 0.28}
              height={windowHeight * 0.06}
              marginTop={moderateScale(30, 0.3)}
              marginRight={moderateScale(5, 0.3)}
              // marginRight={moderateScale(10,0.3)}
              onPress={() => {
                checkPermission()
                //setIsVisible(false);
              }}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(10, 0.3)}
            />

            <CustomButton
              text={'Delete'}
              textColor={Color.white}
              width={windowWidth * 0.28}
              height={windowHeight * 0.06}
              marginRight={moderateScale(5, 0.3)}
              marginTop={moderateScale(30, 0.3)}
              left={4}
              // marginLeft={moderateScale(30,0.3)}
              onPress={() => {
                deletePDF(id)
                if (fileResponse?.length == 1) {
                  setFileResponse([])
                  return setIsVisible(false)

                }


                let newArray = [...fileResponse];
                newArray.splice(index, 1);
                setFileResponse(newArray)
                setIsVisible(false);
              }}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(10, 0.3)}
            />
            <CustomButton
              text={'Close'}
              textColor={Color.white}
              width={windowWidth * 0.28}
              height={windowHeight * 0.06}
              marginTop={moderateScale(30, 0.3)}

              // marginRight={moderateScale(10,0.3)}
              onPress={() => {
                setIsVisible(false);
              }}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(10, 0.3)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default PDFView;

const styles = ScaledSheet.create({
  container: {
    height: windowHeight * 0.9,
    width: windowWidth * 0.9,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 25,
    // backgroundColor: 'red',
  },
  pdf: {
    // flex: 1,
    height: windowHeight * 0.75,

    width: windowWidth * 0.9,
    backgroundColor: 'white',
  },
});
