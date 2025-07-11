import { Icon } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';



const {width, height} = Dimensions.get('window');

const ImageContainer = ({item}) => {
  return (
    <View style={styles.container}>
        
        <Icon name="pencil-square-o" as={FontAwesome} style={styles.icon} size={30} />
            <View style={styles.details}>
                <CustomText style={styles.name}>{item?.name}</CustomText>
                <CustomText style={styles.date}>{item?.date}</CustomText>
            </View>
      
    </View>
  )
}

export default ImageContainer

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:height*0.09,
        width:'100%',
    
    },
    details:{
        flex:1,
        margin: moderateScale(10,0.3),
    },
    name:{
        marginTop:moderateScale(6,0.3),
        fontSize:moderateScale(16,0.6), 
        fontWeight: 'bold',
        color:'black',
    },
    icon:{
        margin: moderateScale(10,0.3),
        color:'white',
        backgroundColor:Color.themeColor,
        padding:moderateScale(8,0.6),
        borderRadius:10,
        width:45,
        height:45,
        left:2,
        
    },
    date:{
        fontSize:moderateScale(14,0.6), 
        color:'gray',
    }

})