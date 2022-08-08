import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Vibration,
    Platform,
    Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Overlay } from "react-native-elements";
import { Card, Title } from 'react-native-paper';
import { onSnapshot, doc } from '@firebase/firestore';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

import db from '../../../firebase';


import { retrieveUser } from '../../actions/loginAction';
import { addAnnouncements, getAnnouncements, deleteAnnouncementsfromBackend, getAnnouncementsBackend } from "../../actions/announcementActions";

const colors = ["#00b1bf", "#0085b6", "#00d49d", "#202971", "#ff005d"];
const { width, height } = Dimensions.get("screen");




const Dashboard = ({ navigation }) => {
    const dispatch = useDispatch();
    const [get, setGet] = useState(true);
    const [visible, setVisible] = useState(false);
    const [notSeperate, setNotSeperate] = useState(true);
    const [announcementIndex, setAnnouncementIndex] = useState(0);
    const [announcementsData, setAnnouncementsData] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [notification, setNotification] = useState(false);
    const [persistedGet, setPersistedGet] = useState(false);

    const user = useSelector((state) => state.loginReducer.user);

    let persisted = useSelector((state) => state.announcementReducer.persisted);
    let data = useSelector((state) => state.announcementReducer.announcements);


    const toggleOverlay = (idx) => {
        Vibration.vibrate(60)
        setVisible(!visible);
        setAnnouncementIndex(idx);
    };
    useEffect(() => {
        if (visible) {
            console.log("visible", announcementIndex);
        }
    }, [visible, announcementIndex]);


    const handlePress = () => {
        Vibration.vibrate(40)
        navigation.navigate('Menu')
    }


    useEffect(() => {
        if (get) {
            dispatch(retrieveUser());
            dispatch(getAnnouncements());
            setGet(false);
        }
    }, [])

    useEffect(() => {
        if (persisted) {
            setPersistedGet(false);
        }
    }, [persisted]);

    useEffect(() => {
        if (data.length > 0) {
            // sort data by id
            data.sort((a, b) => {
                return b.id - a.id;
            }
            );
            setAnnouncementsData(data);
            setUpdated(true);
        }

    }, [data]);

    useEffect(() => {
        let oldData = announcementsData;

        const unsubscribe = messaging().onMessage(async remoteMessage => {

            let title = remoteMessage["data"]["title"];
            let description = remoteMessage["data"]["body"];
            let time = remoteMessage["data"]["time"];
            let id = remoteMessage["data"]["id"];
            let date = remoteMessage["data"]["date"];
            let temp = {
                title: title,
                description: description,
                time: time,
                id: id,
                date: date
            }
            PushNotification.localNotification({
                channelId: "default",
                title: title,
                message: description,
                time: time,
                soundName: 'default',
                playSound: true,
                vibrate: true,
                showWhenUnlocked: true,
            });

            dispatch(getAnnouncementsBackend());

        });

        return () => {
            unsubscribe();
        }

    }, [updated]);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.leftContainer}>
                    <Icon
                        name="menu"
                        type="simple-line-icon"
                        color="#fff"
                        containerStyle={{
                            position: "absolute",
                            left: width / 15,
                            top: height / 17.5,
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

                                        <Overlay isVisible={visible && announcementIndex === index} onBackdropPress={() => toggleOverlay(index)} animationType="fade"
                                            transparent>
                                            <Text style={{ color: "#000" }}>{announcementsData[announcementIndex].description}</Text>

                                            <Text style={{ color: "#000" }}>{announcementsData[announcementIndex].time} </Text>
                                        </Overlay>
                                    </Card>
                                )
                            })
                            :
                            <View style={styles.noAnnouncementContainer}>
                                <Text style={styles.noAnnouncements}>No announcements  </Text>
                            </View>

                        }
                    </View>
                </ScrollView>
            </View >

        </View >
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
        // marginTop: height / 20,
    },
    leftContainer: {
        flex: 1,
        backgroundColor: '#202256',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 2,
        height: height / 7,
        borderBottomLeftRadius: 23,
    },

    rightContainer: {
        flex: 1,
        backgroundColor: '#202256',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 2,
        height: height / 6,
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
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: width,
        // height: height / 10,
        borderTopRightRadius: 20,
        // marginTop: - height / 30,
        marginTop: - height / 40,
        // marginTop:-22
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
    noAnnouncementsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height / 30,
        marginLeft: width / 10,
        marginRight: width / 10,
        // width: width / 1.23,

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