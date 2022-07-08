import React from "react";
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

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const Attendance = ({ navigation }) => {
    const [visible, setVisible] = useState(false);

    const presentDates = ["2022-07-04", "2022-07-05", "2022-07-06", "2022-07-07"]
    const absentDates = ["2022-07-01", "2022-07-02", "2022-07-03"]
    const leaveDates = ["2022-07-08", "2022-07-09", "2022-07-10"]
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
                    <Text style={styles.LeftContainerTitle}>Attendance</Text>


                </View>
                <View style={styles.rightContainer}>

                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Calendar
                    //mark today date

                    style={{ marginTop: height / 20 }}

                    markingType={'period'}
                    markedDates={{
                        ...presentDates.reduce((acc, curr) => {
                            acc[curr] = { disabled: true, startingDay: true, color: '#00C853', endingDay: true }
                            return acc
                        }
                            , {}),
                        //make absent dates red
                        ...absentDates.reduce((acc, curr) => {
                            acc[curr] = { disabled: true, startingDay: true, color: '#D50000', endingDay: true }
                            return acc
                        }

                            , {}),
                        //make leave dates blue
                        ...leaveDates.reduce((acc, curr) => {
                            acc[curr] = { disabled: true, startingDay: true, color: '#0288D1', endingDay: true }
                            return acc
                        }
                            , {}),
                    }}
                    enableSwipeMonths={true}
                />
                <View style={styles.boxesContainer}>
                    <View style={styles.greenRectangle}>
                        <Text style={styles.boxTextHeading}> {presentDates.length} </Text>
                        <Text style={styles.boxText}> Present </Text>
                    </View>
                    <View style={styles.redRectangle}>
                        <Text style={styles.boxTextHeading}> {absentDates.length} </Text>
                        <Text style={styles.boxText}> Absent </Text>
                    </View>
                    <View style={styles.blueRectangle}>
                        <Text style={styles.boxTextHeading}> {leaveDates.length} </Text>
                        <Text style={styles.boxText}> Leave </Text>
                    </View>
                </View>
            </View>
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

        width: width,
        height: height / 10,
        borderTopRightRadius: 20,
        marginTop: - height / 30,
    },
    boxesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: width,
        height: height / 10,


    },
    greenRectangle: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00C853',
        width: width / 3.5,
        height: height / 15,
        borderRadius: 20,
        marginTop: height / 30,
        marginLeft: width / 40,
        marginRight: width / 40,
    },
    redRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D50000',
        width: width / 3.5,
        height: height / 15,
        borderRadius: 20,
        marginTop: height / 30,
        marginLeft: width / 40,
        marginRight: width / 40,
    },
    blueRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0288D1',
        width: width / 3.5,
        height: height / 15,
        borderRadius: 20,
        marginTop: height / 30,
        marginLeft: width / 40,
        marginRight: width / 40,
    },
    boxTextHeading: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        // marginTop: height / 30,
        // marginLeft: width / 40,
        // marginRight: width / 40,

    },
    boxText: {
        color: '#fff',
        fontSize: 15,
        // marginTop: height / 30,
        // marginLeft: width / 40,
        // marginRight: width / 40,

    }


})
export default Attendance