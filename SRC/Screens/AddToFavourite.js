import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import CustomImage from '../Components/CustomImage'
import CustomText from '../Components/CustomText'
import { Rating } from 'react-native-ratings'
import CustomButton from '../Components/CustomButton'
import navigationService from '../navigationService'
import { baseUrl } from '../Config'

const AddToFavourite = props => {
    const data = props?.route?.params?.data;
    console.log(data, 'dataaaaaaaaaaaa')
    const resumeData = [
        {
            id: 1,
            heading: 'Creative',
            description:
                'Land your dream job in the creative industries by using this creative resume template, which will make your application stand out.',
            image: require('../Assets/Images/resume.jpeg'),
            type: 'creative',
            price: '8.00'
        },
        {
            id: 2,
            heading: 'Professional',
            description: 'Best template for professional jobs.',
            image: require('../Assets/Images/resume.jpeg'),
            type: 'professional',
            price: '10.00'
        },
    ];
    const [selectedItems, setSelectedItems] = useState(data?.id)
    // const toggleSelect = (item) => {
    //     if (selectedItems.includes(item.id)) {
    //         // agar already select hai to remove karo
    //         setSelectedItems(selectedItems.filter(id => id !== item.id));
    //     } else {
    //         // warna add karo
    //         setSelectedItems([...selectedItems, item.id]);
    //     }
    // };



    // const totalPrice = useMemo(() => {
    //     return resumeData
    //         .filter(item => selectedItems.includes(item.id))
    //         .reduce((sum, item) => sum + parseFloat(item.price), 0)
    //         .toFixed(2);
    // }, [selectedItems]);

    const isSelected = selectedItems;

    return (
        <SafeAreaView style={styles.container}>
            <Header showBack hideUser={false} title={"Cart"} />
            <View style={styles.main_view}>
                <View style={styles.header_view}>
                    {/* <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={(({ item, index }) => {
                            const isSelected = selectedItems.includes(item.id);
                            return ( */}
                    <TouchableOpacity
                        style={[styles.card, {
                            borderWidth: isSelected ? 2 : 0,
                            borderColor: isSelected ? Color.themeBlue : 'transparent',
                            backgroundColor: isSelected ? "#E8F1FF" : 'rgba(237, 237, 237,0.3)'
                        }]}>
                        <View style={styles.card_image}>
                            <CustomImage
                                source={{ uri: `${baseUrl}${data?.image}` }}
                                // source={data.image}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        </View>
                        <View style={styles.content}>
                            <View>
                                <CustomText style={styles.heading}>
                                    {data?.heading}
                                </CustomText>
                                <CustomText style={styles.description}>
                                    {data?.description}
                                </CustomText>
                            </View>
                            <View style={styles.ratingView}>
                                <Rating
                                    type="custom"
                                    startingValue={4}
                                    ratingCount={5}
                                    imageSize={moderateScale(12, 0.3)}
                                    style={
                                        {
                                            // width: windowWidth * 0.04,
                                        }
                                    }
                                    ratingBackgroundColor={'white'}
                                />
                            </View>
                            <CustomText isBold style={{
                                fontSize: moderateScale(14, 0.6),
                                position: 'absolute',
                                right: 10,
                                bottom: 2,
                                color: Color.themeBlue
                            }}>{`$ ${data?.price}`}</CustomText>
                        </View>
                    </TouchableOpacity>

                    {/* )
                        })}

                    /> */}
                </View>
                <View style={styles.bottom_view}>
                    <View style={styles.row}>
                        <CustomText isBold style={{
                            fontSize: moderateScale(16, 0.6),
                            color: Color.darkGray
                        }}>Total Tamplates</CustomText>
                        <CustomText isBold style={{
                            fontSize: moderateScale(18, 0.6),
                            color: Color.themeBlue
                        }}>1</CustomText>
                    </View>
                    <View style={styles.row}>
                        <CustomText isBold style={{
                            fontSize: moderateScale(16, 0.6),
                            color: Color.darkGray
                        }}>Total Price</CustomText>
                        <CustomText isBold style={{
                            fontSize: moderateScale(18, 0.6),
                            color: Color.themeBlue
                        }}>{`$ ${data?.price}`}</CustomText>
                    </View>
                    <View style={styles.line} />
                    <CustomButton
                        text={"CheckOut"}
                        width={windowWidth * 0.9}
                        height={windowHeight * 0.070}
                        borderRadius={moderateScale(10, 0.3)}
                        textColor={Color.white}
                        bgColor={Color.themeBlue}
                        marginTop={moderateScale(20, 0.6)}
                        onPress={() => {
                            navigationService.navigate('PaymentScreen', { data: data })
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddToFavourite

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.white,
        paddingHorizontal: moderateScale(15, 0.3),
        alignItems: 'center',
        paddingTop: moderateScale(10, 0.6),
    },
    main_view: {
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(15, 0.6),
        justifyContent: "center",
        alignItems: 'center'
    },
    header_view: {
        width: windowWidth,
        height: windowHeight * 0.63,
        alignItems: "center",
    },
    bottom_view: {
        width: windowWidth,
        height: windowHeight * 0.3,
        backgroundColor: Color.lightGrey,
        borderTopLeftRadius: moderateScale(30, 0.6),
        borderTopRightRadius: moderateScale(30, 0.6),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        paddingHorizontal: moderateScale(15, 0.3),
        paddingVertical: moderateScale(20, 0.3),
    },
    card: {
        width: windowWidth * 0.9,
        borderRadius: moderateScale(12, 0.6),
        flexDirection: 'row',
        gap: moderateScale(12, 0.3),
        // marginTop: moderateScale(13, 0.2),
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(12, 0.2),
        marginBottom: moderateScale(15, 0.6)
    },
    card_image: {
        height: windowHeight * 0.11,
        width: windowWidth * 0.2,
    },
    content: {
        width: '75%',
    },
    heading: {
        fontSize: moderateScale(16, 0.3),
    },
    description: {
        fontSize: moderateScale(10, 0.2),
        color: Color.grey,
    },
    ratingView: {
        flexDirection: 'row',
        paddingHorizontal: moderateScale(4, 0.2),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(5, 0.4),
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: moderateScale(10, 0.6)
    },
    line: {
        width: windowWidth * 0.93,
        height: 0.5,
        backgroundColor: Color.veryLightGray,
        marginTop: moderateScale(16, 0.6)
    }
})