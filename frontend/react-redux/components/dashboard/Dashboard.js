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
    Vibration
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

const Dashboard = ({ navigation }) => {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        Vibration.vibrate(60)
        setVisible(!visible);
    };
    const handlePress = () => {
        Vibration.vibrate(40)
        navigation.navigate('Menu')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.leftContainer}>
                    <Icon
                        name="menu"
                        type="simple-line-icon"
                        color="#fff"
                        containerStyle={{
                            position: "absolute",
                            left: width / 15,
                            top: height / 14,


                        }}
                        size={width / 10}
                        Component={TouchableOpacity}

                        disabledStyle={{
                            backgroundColor: "transparent",
                        }}
                        onPress={handlePress} />


                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.rightContainerTitle}>Jawad Azhar Ch</Text>
                    <Text style={styles.rightContainerSubTitle}> Class VI Red </Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomContainerHeading} > Notice Board </Text>
                <View style={styles.cardContainer}>
                    <Card style={styles.card} onPress={toggleOverlay}>
                        <Card.Content style={styles.cardContent}>
                            <Title style={styles.cardTitle}>Card title</Title>
                            <Paragraph style={styles.cardParagraph}>Card content</Paragraph>
                        </Card.Content>

                        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} animationType="fade"
                            transparent>
                            <Text>Hello from Overlay!</Text>
                        </Overlay>
                    </Card>


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
        flexDirection: 'row',
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
    rightContainerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: height / 3000,
    },
    rightContainerSubTitle: {
        color: '#D3D3D3',
        fontSize: 15,
    },

    bottomContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: width,
        height: height / 10,
        borderTopRightRadius: 20,
        marginTop: - height / 30,
    },
    bottomContainerHeading: {
        color: '#1560bd',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: height / 40,
        marginLeft: width / 25,
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
        backgroundColor: '#6E5DCF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: width / 16,
        marginLeft: width / 16,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginTop: height / 30,
        height: height / 7,


    },
    cardContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: width,
        height: height / 10,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    cardTitle: {
        color: '#1560bd',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: height / 3000,

    },
    cardParagraph: {
        color: '#D3D3D3',
        fontSize: 15,
        marginTop: height / 3000,
    }


})
export default Dashboard