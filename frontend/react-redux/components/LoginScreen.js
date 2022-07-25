import React from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    Vibration
} from "react-native";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
const { width, height } = Dimensions.get("screen");
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { login, clearQueryState } from "../actions/loginAction";
import { AuthContext } from "./context"
import * as Crypto from "expo-crypto";
import { getAnnouncementsBackend } from "../actions/announcementActions";


const LoginScreen = ({ navigation }) => {
    const [loginId, setLoginId] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [hashedPassword, setHashedPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn } = useContext(AuthContext);
    const dispatch = useDispatch();
    const hash = async (data) => {
        const hash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            data
        );
        setHashedPassword(hash);
    };

    const processLogin = () => {
        Vibration.vibrate(40);
        setLoading(true);
        dispatch(login(loginId, hashedPassword));
    }

    let allowed = useSelector((state) => state.loginReducer).allowed;
    let queryRun = useSelector((state) => state.loginReducer).queryRun;
    let user = useSelector((state) => state.loginReducer).user;
    if (queryRun) {
        if (allowed && user.type === "student") {
            dispatch(getAnnouncementsBackend());
            signIn(user);
            dispatch(clearQueryState());
        }
        else {
            Alert.alert("Login Failed", "Please check your login credentials");
            dispatch(clearQueryState());
        }
        setLoading(false);
    }


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
                    onChangeText={(text) => setLoginId(text)}
                    value={loginId}
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
                    onChangeText={(text) => {
                        hash(text);
                        setLoginPassword(text)
                    }}
                    value={loginPassword}
                />

                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#609cc1"
                        style={{
                            position: "relative",
                            marginTop: height / 50,
                            marginLeft: width / 2 - 20,
                        }}
                    />
                ) : <TouchableOpacity style={styles.button} onPress={() => processLogin(loginId, loginPassword)}>

                    <Text style={styles.buttonText}>
                        Sign In
                    </Text>
                </TouchableOpacity>}
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
        width: width 
    },
    usernameInput: {
        fontSize: 25,
        color: '#202256',
        fontWeight: 'bold',
        marginTop: height / 40 - 5,
        marginLeft: width / 10,
        width: width
    },
    passwordTitle: {
        fontSize: 20,
        color: '#202256',
        fontWeight: 'bold',
        marginTop: height / 40,
        marginLeft: width / 10,
        width: width
    },
    passwordInput: {
        fontSize: 25,
        color: '#202256',
        fontWeight: 'bold',
        marginTop: height / 40 - 5,
        marginLeft: width / 10,
        width: width

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