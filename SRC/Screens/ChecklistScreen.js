import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CustomText from '../Components/CustomText';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import Header from '../Components/Header';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import { useSelector } from 'react-redux';

const ChecklistScreen = props => {
  const data = props?.route?.params?.data;
  console.log('🚀ChecklistScreen ~ data:', data);
  const [loading, setLoading] = useState(false)
  const tableData = [
    { no: 1, document: 'Tax Forms', response: 'Submitted' },
    { no: 2, document: 'Certifications', response: 'Submitted' },
    { no: 3, document: 'Tax Forms', response: 'Not Submitted' },
    { no: 4, document: 'Certifications', response: 'Not Submitted' },
    { no: 5, document: 'Tax Forms', response: 'Valid' },
    { no: 6, document: 'Certifications', response: 'Valid' },
    { no: 7, document: 'Tax Forms', response: 'Expiring on 01-11-2025' },
    { no: 8, document: 'Certifications', response: 'Expiring on 01-11-2025' },
  ];
  const token = useSelector(state => state.authReducer.token);

  const onPressSave = async () => {
    const url = 'auth/survey'
    const body = {
      question: data?.skills,
      options: data?.options,
      type: data?.templeteType,
      tamplate_title: data?.tamplate_title,
      tamplate_image: data?.tamplate_image,
      tamplate_description: data?.tamplate_description,
      website_url: null,
    }
    setLoading(true)
    const response = await Post(url, body, apiHeader(token))
    console.log("🚀 ~ onPressSave ~ response:", response?.data)
    setLoading(false)
    if (response?.data != undefined) {
      navigationService.navigate("Home")
    }
  }


  return (
    <ImageBackground
      style={styles.bg_container}
      source={require('../Assets/Images/bg.png')}>
      <Header title={'Edit cover letter'} hideUser={true} showBack={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <CustomText style={styles.title}>COMPLIANCE CHECKLIST</CustomText>

        <View style={styles.row}>
          <CustomText style={styles.label}>Name:</CustomText>

          <CustomText style={styles.label}>Date:</CustomText>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.headerRow]}>
            <CustomText
              style={[
                styles.cell,
                styles.headerCell,
                { width: windowWidth * 0.075 },
              ]}>
              #
            </CustomText>
            <CustomText style={[styles.cell, styles.headerCell, { flex: 3 }]}>
              DOCUMENTS
            </CustomText>
            <CustomText style={[styles.cell, styles.headerCell, { flex: 3 }]}>
              RESPONSE
            </CustomText>
          </View>

          {/* Table Rows */}
          {data?.skills?.map((item, index) => {
            return (
              <View key={index} style={styles.tableRow}>
                <CustomText style={[styles.cell, { width: windowWidth * 0.075 }]}>
                  {index + 1}
                </CustomText>
                <CustomText style={[styles.cell, { flex: 3 }]}>{item}</CustomText>
                <CustomText style={[styles.cell, { flex: 3 }]}>
                  {item.response}
                </CustomText>
              </View>
            );
          })}
        </View>
        <View style={styles.complianceBox}>
          <CustomText style={styles.complianceLabel}>
            Compliance Status
          </CustomText>
          <CustomText style={styles.complianceValue}>
            In Compliance / Out of Compliance
          </CustomText>
        </View>
      </ScrollView>
      <CustomButton
        text={loading ? <ActivityIndicator
          style={styles.indicatorStyle}
          size="small"
          color={Color.blue}
        /> : 'Save'}
        textColor={Color.darkBlue}
        onPress={() => {
          onPressSave()
        }}
        style={{
          marginBottom: moderateScale(20, 0.6)
        }}
        width={windowWidth * 0.8}
        height={windowHeight * 0.065}
        borderRadius={moderateScale(20, 0.3)}
        bgColor={Color.white}
        marginTop={moderateScale(20, 0.6)}
      />
    </ImageBackground>
  );
};

export default ChecklistScreen;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(20, 0.6),
    backgroundColor: 'white',
    // justifyContent :'center' ,
    marginTop: moderateScale(20, 0.6),
    // alignItems: 'center',
    width: windowWidth * 0.96,
  },
  title: {
    fontSize: moderateScale(16, 0.6),
    // fontWeight: 'bold',
    marginVertical: moderateScale(20, 0.6),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.black,
  },
  label: {
    fontSize: moderateScale(14, 0.6),
    width: windowWidth * 0.5,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: moderateScale(8, 0.6),
    textAlign: 'center',
    fontSize: moderateScale(11, 0.6),
  },
  headerCell: {
    fontWeight: 'bold',
  },
  complianceBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: moderateScale(30, 0.6),
    width: '100%',
  },
  complianceLabel: {
    flex: 2,
    borderRightWidth: 1,
    borderColor: '#000',
    padding: moderateScale(10, 0.6),
    fontSize: moderateScale(12, 0.6),
  },
  complianceValue: {
    flex: 3,
    padding: moderateScale(10, 0.6),
    fontSize: moderateScale(12, 0.6),
  },
  bg_container: {
    width: windowWidth,
    alignItems: 'center',
    height: windowHeight,
    justifyContent: 'center',
  },
});
