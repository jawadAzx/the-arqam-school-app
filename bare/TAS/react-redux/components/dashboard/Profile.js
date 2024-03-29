import React from "react";
import {
    View,
    Text,
    Image,
    Button,
    ScrollView,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Vibration
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("screen");
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from "react-native-elements";

const Profile = ({ navigation }) => {
    const user = useSelector((state) => state.loginReducer.user);
    return (
        <ScrollView style={styles.container} >
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

            <View style={styles.miniContainer}>

                <Image
                    source={require("../../../assets/icon.png")}
                    style={styles.icon}
                />
                <Text style={styles.title}>
                    {user.name}
                </Text>
                <Text style={styles.subtitle}>
                    Class {user.grade} {user.section}
                </Text>
            </View>
            <View style={styles.lowerBox}>
                <View style={styles.typeValueContainer}>
                    <Text style={styles.typeText}>
                        Roll number
                    </Text>
                    <Text style={styles.valueText}>
                        {user.id}
                    </Text>
                </View>
                <View style={styles.line}>
                </View>
                <View style={styles.typeValueContainer}>
                    <Text style={styles.typeText}>
                        Date of Birth
                    </Text>
                    <Text style={styles.valueText}>
                        {user.dob}
                    </Text>
                </View>
                <View style={styles.line}>
                </View>
                <View style={styles.typeValueContainer}>
                    <Text style={styles.typeText}>
                        Father's Name
                    </Text>
                    <Text style={styles.valueText}>
                        {user.fatherName}
                    </Text>
                </View>
                <View style={styles.line}>
                </View>
                <View style={styles.typeValueContainer}>
                    <Text style={styles.typeText}>
                        Emergency Contact
                    </Text>
                    <Text style={styles.valueText}>
                        {user.emergencyContact}
                    </Text>
                </View>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202256',
        width: width,
    },
    miniContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    icon: {
        marginTop: height / 6,
        width: width / 2,
        height: width / 2,
    },
    title: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: height / 30,

    },
    subtitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: height / 30,
    },
    lowerBox: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: height / 27,
        width: width,
        height: height / 2.45,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    typeValueContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        // marginTop: height / 27,
        width: width,
        // height: height / 2.11,
        // textAlign: 'center',
        flexWrap: 'wrap'

    },
    typeText: {
        fontSize: 20,
        color: '#202256',
        fontWeight: 'bold',
        marginTop: height / 30,
        marginLeft: width / 20,
        // textAlign: 'left',


    },
    valueText: {
        fontSize: 20,
        color: '#202256',
        marginTop: height / 30,
        marginLeft: width / 20,
        // textAlign: 'left',


    },
    line: {
        // flex:1,
        marginTop: height / 30,
        backgroundColor: '#202256',
        width: width / 1.1,
        height: 1,
        marginLeft: width / 22,

    },

});
export default Profile