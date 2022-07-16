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
    FlatList
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("screen");
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { Icon, Overlay } from "react-native-elements";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { onSnapshot, collection } from '@firebase/firestore';
import db from '../../../firebase';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { retrieveUser } from '../../actions/loginAction';
const colors = ["#00b1bf", "#0085b6", "#00d49d", "#202971", "#ff005d"];
// const colors = ["#32213A", "#383B53", "#66717E", "#D4D6B9", "#D1CAA1"];

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


const Dashboard = ({ navigation }) => {
    const dispatch = useDispatch();
    const [get, setGet] = useState(true);
    const [visible, setVisible] = useState(false);
    const [notSeperate, setNotSeperate] = useState(true);
    const [announcementIndex, setAnnouncementIndex] = useState(0);
    const [announcementsData, setAnnouncementsData] = useState([]);
    const user = useSelector((state) => state.loginReducer.user);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    const toggleOverlay = (idx) => {
        Vibration.vibrate(60)
        setVisible(!visible);
        setNotSeperate(!notSeperate);
        setAnnouncementIndex(idx);
    };
    const handlePress = () => {
        Vibration.vibrate(40)
        navigation.navigate('Menu')
    }
    if (get) {
        dispatch(retrieveUser());
        setGet(false);
    }
    useEffect(() =>
        onSnapshot(collection(db, 'announcements'), async (snapshot) => {
            let oldData = announcementsData;
            let temp = snapshot.docs.map(doc => doc.data());
            // sort temp by id in descending order
            temp.sort((a, b) => {
                return b.id - a.id;
            }
            );
            if (oldData.length !== temp.length && oldData.length !== 0) {
                await schedulePushNotification(temp[0].title, temp[0].description);
            }
            setAnnouncementsData(temp);

        })
        , []);

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
                    <Text style={styles.rightContainerTitle}>{user.name}</Text>
                    <Text style={styles.rightContainerSubTitle}> Class {user.grade} {user.section} </Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    <Text style={styles.bottomContainerHeading} > Notice Board </Text>
                    <View style={styles.cardContainer}>
                        {announcementsData.length > 0 ?
                            announcementsData.map((announcement, index) => {
                                return (
                                    // Chose from card1 to card 5
                                    <Card
                                        key={index}
                                        // conditional styling
                                        style={index % 5 === 0 ? styles.card1 : index % 5 === 1 ? styles.card2 : index % 5 === 2 ? styles.card3 : index % 5 === 3 ? styles.card4 : styles.card0}
                                        onPress={() => {
                                            toggleOverlay(index)
                                        }}
                                    >
                                        <Card.Content style={styles.cardContent}>
                                            <Title style={styles.cardTitle}>{announcement.title}</Title>
                                        </Card.Content>
                                        <Card.Content style={styles.cardDateContainer}>
                                            <Text style={styles.cardParagraph}>{announcementsData[announcementIndex].date} </Text>

                                        </Card.Content>

                                        <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay(index)} animationType="fade"
                                            transparent>
                                            <Text>{announcementsData[announcementIndex].description}</Text>

                                            <Text>{announcementsData[announcementIndex].time} </Text>
                                        </Overlay>
                                    </Card>
                                )
                            })
                            :
                            <Text style={styles.noAnnouncements}>No announcements  </Text>

                        }
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView >
    )
}

async function schedulePushNotification(notificationTitle, notificationBody) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: notificationTitle,
            body: notificationBody,
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}


const styles = StyleSheet.create({
    // make color pallet

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
        // height: height / 10,
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
        // height: height / 2,
        marginBottom: height / 30,



    },
    card0: {
        backgroundColor: colors[0],
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
    card1: {
        backgroundColor: colors[1],
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
    card2: {
        backgroundColor: colors[2],
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
    card3: {
        backgroundColor: colors[3],
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

    card4: {
        backgroundColor: colors[4],
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
    // card5: {
    //     backgroundColor: colors[],
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     alignItems: 'flex-start',
    //     marginRight: width / 16,
    //     marginLeft: width / 16,
    //     borderTopLeftRadius: 20,
    //     borderBottomRightRadius: 20,
    //     marginTop: height / 30,
    //     height: height / 7,
    // },

    cardContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: width,
        height: height / 10,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexWrap: 'wrap',
        textAlign: 'left',


    },
    cardTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: height / 3000,
        // textAlign: 'center',
        textAlign: 'left',

        marginRight: width / 8.6,

    },
    cardDateContainer: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',

        width: width / 1.15,

    },
    cardParagraph: {
        // color: '#D3D3D3',
        color: "#fff",
        fontSize: 15,
        marginBottom: height / 100
    },
    noAnnouncements: {
        color: '#1560bd',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: height / 3000,
        marginLeft: width / 25,
    }



})
export default Dashboard