import { Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';




const PdfContainer = ({ item, setSelectedPdf, show, setShow, index, setSelectedPDFIndex }) => {
  // console.log("🚀 ~ file: PdfContainer.js:18 ~ PdfContainer ~ index:", index)

  // console.log("🚀 ~ file: PdfContainer.js:18 ~ PdfContainer ~ item:", item?.uri)
  // const [thumbnailForHere , setThumbNailForHere] = useState(null)
  // console.log("🚀 ~ file: PdfContainer.js:19 ~ PdfContainer ~ thumbnail:", thumbnailForHere?.uri)



  // const getPng = async()=>{
  //   const response= await PdfThumbnail.generate(item?.uri, 0);
  //   console.log("🚀 ~ file: PdfContainer.js:25 ~ getPng ~ uri:", response)
  //   setThumbNail(response)
  //   setThumbNailForHere(response)
  // }





  // useEffect(() => {

  //   getPng()


  // }, [])




  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setSelectedPdf(item)
          setShow(true);
          setSelectedPDFIndex(index);

        }}
        activeOpacity={0.8}
        style={styles.addImageContainer}>
        <Icon
          name={'pdffile1'}
          as={AntDesign}
          size={moderateScale(50, 0.9)}
          color={Color.themeColor}
          style={styles.icon}
        />
        {/* <CustomImage
        onPress={() => {
          setSelectedPdf(item)
          setShow(!show);
          setSelectedPDFIndex(index);
         
          
        }}
        source={{uri: thumbnailForHere?.uri}}
        style={{
          width: '100%',
          height: '100%',
        }}
        /> */}
        <View
          style={{
            width: '100%',
            height: '40%',
            position: 'absolute',
            zIndex: 1,
            bottom: moderateScale(5, 0.6),
            backgroundColor: 'rgba(255,255,255,0.7)',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: moderateScale(3, 0.6),
          }}>
          {/* <Icon
          name={'pdffile1'}
          as={AntDesign}
          size={moderateScale(22, 0.6)}
          color={Color.themeColor}
          /> */}
          <CustomText
            numberOfLines={2}
            style={{
              fontSize: moderateScale(12, 0.6),
              width: '70%',
              // marginLeft: moderateScale(5, 0.3),
              justifyContent: 'center',
              alignItems: 'center',

            }}>
            {item?.name}
          </CustomText>
        </View>


      </TouchableOpacity>

    </>
  );
};

export default PdfContainer;

const styles = ScaledSheet.create({
  addImageContainer: {
    width: windowWidth * 0.33,
    backgroundColor: Color.white,
    height: windowHeight * 0.15,
    marginRight: moderateScale(2, 0.3),
    marginTop: moderateScale(2, 0.3),
    // shadowColor: Color.themeColor,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,

    // elevation: 9,
    // overflow: 'hidden',
  },
  container: {
    height: windowHeight * 0.4,
    width: windowWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: 'red',
  },
  icon: {
    marginStart: moderateScale(35, 0.3),
    marginTop: moderateScale(8, 0.3)
  },
  pdf: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
});
