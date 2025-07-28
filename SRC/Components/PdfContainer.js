import { Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';

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
        <View style={{
          width: moderateScale(80, 0.6),
          height: moderateScale(80, 0.6),
          alignSelf: "center"
        }}>
          <CustomImage style={{
            width: '100%',
            height: '100%',
          }} source={require('../Assets/Images/thumnail_image.png')} />
        </View>
        <View
          style={{
            width: '100%',
            height: '35%',
            position: 'absolute',
            zIndex: 1,
            bottom: moderateScale(0, 0.6),
            backgroundColor: Color.lightGrey,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: moderateScale(3, 0.6),
            borderEndEndRadius: moderateScale(5, 0.9),
            borderBottomLeftRadius: moderateScale(5, 0.6)
          }}>
          <CustomText
            numberOfLines={2}
            style={{
              fontSize: moderateScale(12, 0.6),
              width: '100%',
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
    height: windowHeight * 0.16,
    marginRight: moderateScale(2, 0.3),
    marginTop: moderateScale(5, 0.3),
    borderRadius: moderateScale(5, 0.6)
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
    marginTop: moderateScale(15, 0.3)
  },
  pdf: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
});
