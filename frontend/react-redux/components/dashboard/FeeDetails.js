import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Vibration,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("screen");
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { Icon, Overlay } from "react-native-elements";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ExpandableCard from "../dashboard/ExpandableCard";
import { getUserVouchers, clearQueryState } from "../../actions/voucherActions";

const FeeDetails = ({ navigation }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [get, setGet] = useState(true);
    const user = useSelector((state) => state.loginReducer.user);
    let voucherData = useSelector((state) => state.voucherReducer.vouchers);
    let queryRun = useSelector((state) => state.voucherReducer.queryRun);
    const linkD = "http://www.africau.edu/images/default/sample.pdf";

    // let voucherData = {
    //     vouchers: [
    //         {
    //             id: 1,
    //             tutionFee: 1000,
    //             admissionFee: 100,
    //             regFee: 100,
    //             examinationFee: 100,
    //             discount: 100,
    //             arrears: 100,
    //             payable: 1000,
    //             voucherForMonth: "08-2022",
    //         }

    //     ]
    // }

    useEffect(() => {
        if (queryRun) {
            // setVouchers(voucherData)
            setIsLoading(false)
            dispatch(clearQueryState())
        }
    }, [queryRun])

    if (get) {
        dispatch(getUserVouchers(user.id))
        setGet(false)
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    // check of voucher data is an emppty object

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.leftContainer}>
                    <Icon
                        name="arrow-back"
                        type="Ionicons"
                        color="#fff"
                        containerStyle={{
                            position: "absolute",
                            left: width / 15,
                            top: height / 13,
                        }}
                        size={width / 10}
                        Component={TouchableOpacity}

                        disabledStyle={{
                            backgroundColor: "transparent",
                        }}
                        onPress={() => {
                            Vibration.vibrate(40)
                            navigation.navigate('Menu')

                        }} />
                    <Text style={styles.LeftContainerTitle}>Fee Details</Text>


                </View>
                <View style={styles.rightContainer}>

                </View>
            </View>
            <ScrollView style={styles.bottomContainer}>
                {/* Go into the card to manage the color of white 3 dots */}
                {Object.keys(voucherData).length !== 0 ?

                    voucherData.vouchers.map((voucher) => {
                        let miscFee = parseInt(voucher.examinationFee) + parseInt(voucher.admissionFee) + parseInt(voucher.regFee)

                        return (
                            <ExpandableCard
                                key={voucher.id}
                                collapsedCardItems={[
                                    { label: voucher.voucherForMonth, value: "RS " + voucher.payable },
                                ]}
                                expandedCardItems={[
                                    { label: voucher.voucherForMonth, value: '' },
                                    { label: 'Tution Fee', value: 'Rs ' + voucher.tutionFee },
                                    { label: 'Misc. Fee', value: "Rs " + miscFee },
                                    { label: 'Discount', value: "Rs " + voucher.discount },
                                    { label: 'Arrears', value: "Rs " + voucher.arrears },
                                    { label: 'Total', value: "Rs " + voucher.payable },
                                ]}
                                style={styles.card}
                                // labelStyle={{ fontFamily: 'open-sans-cond-bold' }}
                                // valueStyle={{ fontFamily: 'open-sans-cond' }}
                                labelStyle={{ fontSize: 20, color: "#fff" }}
                                downloadLink={linkD}
                            />
                        )
                    }
                    )
                    :
                    <View style={styles.noVoucherContainer}>
                        <Text style={styles.noVoucherText}>No Vouchers Found</Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        alignContent: "flex-start",
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    leftContainer: {
        flex: 1,
        backgroundColor: '#202256',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 2,
        height: height / 6,
        borderBottomLeftRadius: 20,
    },

    rightContainer: {
        flex: 1,
        backgroundColor: '#202256',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 2,
        height: height / 5,
    },
    LeftContainerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: height / 30,
        marginLeft: width / 5,
    },
    rightContainerSubTitle: {
        color: '#D3D3D3',
        fontSize: 15,
    },

    bottomContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        width: width,
        height: height / 10,
        borderTopRightRadius: 20,
        marginTop: - height / 30,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: width,
        height: height / 2,
    },
    card: {
        marginTop: height / 30,
        backgroundColor: '#6E5DCF',
        marginHorizontal: width / 20,
        marginVertical: height / 50,
        width: width - 40,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    noVoucherContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height / 30,
        marginLeft: width / 10,
        marginRight: width / 10,
        // width: width / 1.23,
    },
    noVoucherText: {
        color: '#1560bd',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: height / 3000,
        marginLeft: width / 25,
    }

})
export default FeeDetails