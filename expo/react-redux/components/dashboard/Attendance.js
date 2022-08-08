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
import { useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("screen");
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { Icon, Overlay } from "react-native-elements";
import { getUserAttendance } from "../../actions/attendanceActions";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const Attendance = ({ navigation }) => {
    // get today month
    const dispatch = useDispatch();
    const user = useSelector((state) => state.loginReducer.user);
    const today = new Date();
    const monthToday = today.getMonth() + 1;
    const [month, setMonth] = useState(monthToday);
    const [get, setGet] = useState(true);
    const [firstUpdate, setFirstUpdate] = useState(true);
    const [loading, setLoading] = useState(false);
    const [presentDates, setPresentDates] = useState([]);
    const [absentDates, setAbsentDates] = useState([]);
    const [leaveDates, setLeaveDates] = useState([]);
    let persisted = useSelector((state) => state.attendanceReducer.persisted);

    if (get && !persisted) {
        dispatch(getUserAttendance(user.id));
        setGet(false);
    }
    const attendanceDate = useSelector((state) => state.attendanceReducer);
    const updateDates = async (month) => {

        ///////////
        let monthStr = null;
        if (month < 10) {
            monthStr = "0" + month;
        }
        else {
            monthStr = month;
        }
        ////////////

        if (attendanceDate.presentDates != null) {
            let pD = attendanceDate.presentDates.split(",");
            pD = pD.map((item) => item.trim());

            let presentDates = [];
            for (let i = 0; i < pD.length; i++) {
                if (pD[i].substring(5, 7) == monthStr) {
                    presentDates.push(pD[i]);
                }
            }
            setPresentDates(presentDates);
        }
        /////////////////////
        if (attendanceDate.absentDates != null) {
            let aD = attendanceDate.absentDates.split(",");
            aD = aD.map((item) => item.trim());
            let absentDates = [];
            for (let i = 0; i < aD.length; i++) {
                if (aD[i].substring(5, 7) == monthStr) {
                    absentDates.push(aD[i]);
                }
            }
            setAbsentDates(absentDates);
        }
        //////////////////////
        if (attendanceDate.leaveDates != null) {
            let lD = attendanceDate.leaveDates.split(",");
            lD = lD.map((item) => item.trim());
            let leaveDates = [];
            for (let i = 0; i < lD.length; i++) {
                if (lD[i].substring(5, 7) == monthStr) {
                    leaveDates.push(lD[i]);
                }
            }
            setLeaveDates(leaveDates);
        }
        //////////////////////

    }
    if (firstUpdate && attendanceDate.queryRun) {
        updateDates(month);
        setFirstUpdate(false);
    }
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
            {
                !loading ?
                    <View style={styles.bottomContainer}>

                        <Calendar
                            style={{ marginTop: height / 20 }}
                            onMonthChange={(month) => {
                                updateDates(month.month);
                            }
                            }

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
                    : <ActivityIndicator size="large" color="#00C853" />
            }

        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        alignContent: "flex-start",
        width: width,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width,

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
        width: width / 2,
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
        textAlign: 'center',
        width: width 
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