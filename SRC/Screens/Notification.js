import { useIsFocused } from '@react-navigation/core'
import { Icon } from 'native-base'
import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import CustomText from '../Components/CustomText'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import navigationService from '../navigationService'
import NotificationView from '../Components/NotificationView'
import ListEmphtyComponent from '../Components/ListEmphtyComponent'

const Notification = () => {
  const isFocused = useIsFocused()
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ Notification ~ token:", token)
  const userData = useSelector(state => state.commonReducer.userData);
  const notification_data = [
    {
      id: 1,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      heading: 'Lorem Ipsum'
    },
    {
      id: 2,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      heading: 'Lorem Ipsum'
    }, {
      id: 3,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      heading: 'Lorem Ipsum'
    }, {
      id: 4,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      heading: 'Lorem Ipsum'
    }, {
      id: 5,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      heading: 'Lorem Ipsum'
    }, {
      id: 6,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      heading: 'Lorem Ipsum'
    }, {
      id: 7,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      heading: 'Lorem Ipsum'
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={false} />
      <View style={styles.main_view}>
        <CustomText isBold style={styles.heading}>Notification</CustomText>
        <FlatList
          data={notification_data}
          ListEmptyComponent={<ListEmphtyComponent />}
          renderItem={(({ item }) => {
            return (
              <NotificationView data={item} />
            )
          })} />
      </View>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#F9F9F9',
    paddingTop: moderateScale(10, 0.6),
  },
  main_view: {
    paddingHorizontal: moderateScale(10, 0.6),
  },
  heading: {
    fontSize: moderateScale(28, 0.6),
    textAlign: 'left',
  },
  row_view: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  sub_heading: {
    fontSize: moderateScale(18, 0.6),
    width: '90%',
    marginLeft: moderateScale(5, 0.6),
    color: Color.themeBlue
  },
  categories_text: {
    fontSize: moderateScale(15, 0.6),
    color: Color.veryLightGray,
    fontWeight: '700'
  }
})