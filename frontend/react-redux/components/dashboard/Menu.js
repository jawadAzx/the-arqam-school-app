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
    SafeAreaView,
    Vibration
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("screen");
import { Icon } from "react-native-elements";
import { AuthContext } from "../context"
import { useContext } from 'react';
import { logout } from '../../actions/loginAction'
const Menu = ({ navigation }) => {
    const { signOut } = useContext(AuthContext);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.loginReducer.user);
    const processLogout = () => {
        Vibration.vibrate(40);
        dispatch(logout());
        signOut();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.leftContainerTitle}>{user.name}</Text>
                <Text style={styles.leftContainerSubTitle}> Class {user.grade} {user.section} </Text>
            </View>
            <View style={styles.bottomContainer}>

                <TouchableOpacity style={styles.menuItem} onPress={() => {
                    Vibration.vibrate(40)
                    navigation.navigate('Dashboard')
                }}
                >
                    <Icon name="home" type="entypo" color="#fff" size={width / 12} containerStyle={{
                        position: "absolute",
                        left: width / 1000 - 5,
                        top: height / 6000 - 2,
                    }}
                    />
                    <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                    navigation.navigate('Attendance')
                    Vibration.vibrate(40)
                }}
                >
                    <Icon name="calendar-check-o" type="font-awesome" color="#fff" size={width / 12} containerStyle={{
                        position: "absolute",
                        left: width / 1000 - 5,
                        top: height / 6000 - 5,
                    }}
                    />
                    <Text style={styles.menuText}>Attendance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                    Vibration.vibrate(40)
                    navigation.navigate('FeeDetails')
                }}
                >
                    <Icon name="dollar-bill" type="foundation" color="#fff" size={width / 12} containerStyle={{
                        position: "absolute",
                        left: width / 1000 - 5,
                        top: height / 300,
                    }}
                    />
                    <Text style={styles.menuText}>Fee Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => Vibration.vibrate(40)}
                >
                    <Icon name="results" type="foundation" color="#fff" size={width / 12} containerStyle={{
                        position: "absolute",
                        left: width / 1000 - 5,
                        top: height / 500,
                    }}
                    />
                    <Text style={styles.menuText}>Report Cards</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                    Vibration.vibrate(40)
                    navigation.navigate('Profile')
                }}
                >
                    <Icon name="user" type="entypo" color="#fff" size={width / 12} containerStyle={{
                        position: "absolute",
                        left: width / 1000 - 5,
                        top: height / 6000 - 5,
                    }}
                    />
                    <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={() => {
                    processLogout()
                }}

                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202256',
        justifyContent: "flex-start",
        alignContent: "flex-start",
    },
    topContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: width,
        height: height / 6,
    },
    leftContainerTitle: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        marginTop: height / 15,
        marginLeft: width / 10,

    },
    leftContainerSubTitle: {
        fontSize: 15,
        color: "#D3D3D3",
        marginLeft: width / 11,
    },
    bottomContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: width,
        height: height,
        // backgroundColor: "#fff",
    },
    menuItem: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: width / 10,
        marginTop: height / 20,
        width: width,
    },
    menuText: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        marginLeft: width / 10,

    },
    logoutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: width / 2,
        height: height / 13,
        backgroundColor: "#FF0000",
        marginTop: height / 7,
        marginBottom: height / 9,
        borderRadius: 20,
        marginLeft: width / 4,
        marginRight: width / 4,
    }
    ,
    logoutText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",

    }


})
export default Menu