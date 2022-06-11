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
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ExpandableCard from "../dashboard/ExpandableCard";

const FeeDetails = () => {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        Vibration.vibrate(60)
        setVisible(!visible);
    };

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
                        onPress={() => Vibration.vibrate(40)} />
                    <Text style={styles.LeftContainerTitle}>Fee Details</Text>


                </View>
                <View style={styles.rightContainer}>

                </View>
            </View>
            <ScrollView style={styles.bottomContainer}>
                {/* Go into the card to manage the color of white 3 dots */}
                <ExpandableCard
                    
                    collapsedCardItems={[
                        { label: 'June 2022', value: '' },
                        { label: 'Rs 2000', value: 'PAID' },
                    ]}
                    expandedCardItems={[
                        { label: 'June 2022', value: '' },
                        { label: 'Rs 2000', value: 'PAID' },
                        { label: 'Tution Fee', value: 'Rs 1500' },
                        { label: 'Registration Fee', value: "Rs 300" },
                        { label: 'Exam Fee', value: "Rs 200" },
                        { label: 'Total', value: "Rs 200" }

                    ]}
                    style={styles.card}
                    // labelStyle={{ fontFamily: 'open-sans-cond-bold' }}
                    // valueStyle={{ fontFamily: 'open-sans-cond' }}
                    labelStyle={{ fontSize: 20,color:"#fff" }}
                />
                <ExpandableCard
                    
                    collapsedCardItems={[
                        { label: 'June 2022', value: '' },
                        { label: 'Rs 2000', value: 'PAID' },
                    ]}
                    expandedCardItems={[
                        { label: 'June 2022', value: '' },
                        { label: 'Rs 2000', value: 'PAID' },
                        { label: 'Tution Fee', value: 'Rs 1500' },
                        { label: 'Registration Fee', value: "Rs 300" },
                        { label: 'Exam Fee', value: "Rs 200" },
                        { label: 'Total', value: "Rs 200" }

                    ]}
                    style={styles.card}
                    // labelStyle={{ fontFamily: 'open-sans-cond-bold' }}
                    // valueStyle={{ fontFamily: 'open-sans-cond' }}
                    labelStyle={{ fontSize: 20,color:"#fff" }}
                />
                <ExpandableCard
                    collapsedCardItems={[
                        { label: 'June 2022', value: '' },
                        { label: 'Rs 2000', value: 'PAID' },
                    ]}
                    expandedCardItems={[
                        { label: 'June 2022', value: '' },
                        { label: 'Rs 2000', value: 'PAID' },
                        { label: 'Tution Fee', value: 'Rs 1500' },
                        { label: 'Registration Fee', value: "Rs 300" },
                        { label: 'Exam Fee', value: "Rs 200" },
                        { label: 'Total', value: "Rs 200" }

                    ]}
                    style={styles.card}
                    // labelStyle={{ fontFamily: 'open-sans-cond-bold' }}
                    // valueStyle={{ fontFamily: 'open-sans-cond' }}
                    labelStyle={{ fontSize: 20,color:"#fff" }}
                />
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
        marginHorizontal: width/20,
        marginVertical: height/50,
        width: width - 40,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        

    },
})
export default FeeDetails