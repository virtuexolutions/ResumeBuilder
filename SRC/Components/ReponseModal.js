import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import {mode} from 'native-base/lib/typescript/theme/tools';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import AddImagesContainer from './AddImagesContainer';
import AddSignatureContainer from './AddSignatureContainer';
import PdfContainer from './PdfContainer';
import ListEmphtyComponent from './ListEmphtyComponent';
import TextInputWithTitle from './TextInputWithTitle';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import CustomImage from './CustomImage';
import {baseUrl} from '../Config';
import moment from 'moment';

const ResponseModal = ({show, setShow, style, data}) => {
  console.log('ResponseModal dataa', JSON.stringify(data, 2, 0));
  const responses = [
    {
      id: 1,
      user_name: 'william',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
    {
      id: 2,
      user_name: 'lisa',
      image: require('../Assets/Images/email.jpeg'),
    },
    {
      id: 3,
      user_name: 'william',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
    {
      id: 4,
      user_name: 'lisa',
      image: require('../Assets/Images/email.jpeg'),
    },
  ];

  return (
    <Modal
      isVisible={show}
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
            <CustomText isBold style={styles.heading}>
              Employee Response
            </CustomText>
            <Icon
              name="squared-cross"
              as={Entypo}
              size={moderateScale(26, 0.6)}
              color={Color.themeBlue}
              onPress={() => setShow(false)}
            />
          </View>
          {data?.assigns?.map(item => {
            const employeeData = item?.employee;
            console.log('daataaa', employeeData)
            return (
              <FlatList
                ListEmptyComponent={
                  <CustomText style={{color: 'black'}}>no reponse added yet</CustomText>
                }
                showsVerticalScrollIndicator={false}
                data={item?.responses}
                style={{marginTop: moderateScale(20, 0.6)}}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: Color.lightGrey,
                        paddingVertical: moderateScale(12, 0.6),
                      }}>
                      <View style={styles.row_view}>
                        <View
                          style={{
                            width: windowWidth * 0.12,
                            height: windowWidth * 0.12,
                            backgroundColor: Color.lightGrey,
                            borderRadius: windowWidth / 2,
                          }}>
                          <CustomImage
                            source={
                              employeeData?.photo != null
                                ? {uri: `${baseUrl}/${employeeData?.photo}`}
                                : require('../Assets/Images/no_user_image.png')
                            }
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: windowWidth / 2,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            width: '80%',
                            marginLeft: moderateScale(10, 0.6),
                          }}>
                          <View style={[styles.row_view, {width: '100%'}]}>
                            <CustomText
                              isBold
                              style={{
                                fontSize: moderateScale(14, 0.6),
                              }}>
                              {employeeData?.full_name}
                            </CustomText>
                            <CustomText
                              style={{
                                fontSize: moderateScale(11, 0.6),
                                color: Color.veryLightGray,
                              }}>
                              {moment(item?.created_at).format(
                                'DD-MM-YYYY  hh:mm A',
                              )}
                            </CustomText>
                          </View>
                          {item?.response_type === 'signature' ||
                          item?.response_type === 'image' ? (
                            <View
                              style={{
                                width: windowWidth * 0.2,
                                height: windowWidth * 0.2,
                                borderRadius: moderateScale(10, 0.6),
                                marginTop: moderateScale(10),
                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 9,
                                },
                                backgroundColor: Color.white,
                                shadowOpacity: 0.5,
                                shadowRadius: 12.35,
                                elevation: 19,
                              }}>
                              <CustomImage
                                source={{
                                  uri: `${baseUrl}/storage/${item?.response_value}`,
                                }}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  resizeMode: 'contain',
                                  borderRadius: moderateScale(8, 0.6),
                                }}
                              />
                            </View>
                          ) : item?.response_type === 'document' ? (
                            <TouchableOpacity
                              onPress={() =>
                                Linking.openURL(item?.response_value)
                              }
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: moderateScale(5, 0.6),
                              }}>
                              <Icon
                                name="file-text"
                                size={20}
                                color={Color.blue}
                              />
                              <CustomText
                                style={{
                                  fontSize: moderateScale(12, 0.6),
                                  marginLeft: moderateScale(5, 0.6),
                                  color: Color.blue,
                                }}>
                                Open Document
                              </CustomText>
                            </TouchableOpacity>
                          ) : (
                            <CustomText
                              style={{
                                fontSize: moderateScale(12, 0.6),
                                textTransform: 'lowercase',
                                color: Color.grey,
                              }}>
                              {item?.response_value}
                            </CustomText>
                          )}
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default ResponseModal;

const styles = StyleSheet.create({
  modal_main_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'rgba(0, 0, 0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_sub_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    backgroundColor: Color.white,
    borderRadius: moderateScale(15, 0.6),
    alignItems: 'center',
    paddingHorizontal: moderateScale(12, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    color: Color.themeBlue,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth * 0.8,
  },
});
