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
    KeyboardAvoidingView
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("screen");
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = () => {
    console.log(width, height, height / 2);
    return (
        <KeyboardAwareScrollView style={styles.container} >
            <View style={styles.miniContainer}>

                <Image
                    source={require("../../assets/icon.png")}
                    style={styles.icon}
                />
                <Text style={styles.title}>
                    Sign In
                </Text>
            </View>
            <View style={styles.lowerBox}>
                <Text style={styles.usernameTitle}>
                    Username
                </Text>
                <TextInput
                    style={styles.usernameInput}
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={styles.passwordTitle}>
                    Password
                </Text>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button}>

                    <Text style={styles.buttonText}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
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
    lowerBox: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: height / 27,
        width: width,
        height: height / 2.11,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    usernameTitle: {
        fontSize: 20,
        color: '#202256',
        fontWeight: 'bold',
        marginTop: height / 15,
        marginLeft: width / 10,
    },
    usernameInput: {
        fontSize: 25,
        color: '#202256',
        fontWeight: 'bold',
        marginTop: height / 40 - 5,
        marginLeft: width / 10,
    },
    passwordTitle: {
        fontSize: 20,
        color: '#202256',
        fontWeight: 'bold',
        marginTop: height / 40,
        marginLeft: width / 10,
    },
    passwordInput: {
        fontSize: 25,
        color: '#202256',
        fontWeight: 'bold',
        marginTop: height / 40 - 5,
        marginLeft: width / 10,

    },
    button: {
        backgroundColor: '#202256',
        width: width / 1.2,
        height: height / 15,
        marginTop: height / 40,
        marginLeft: width / 12,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },

});
export default LoginScreen