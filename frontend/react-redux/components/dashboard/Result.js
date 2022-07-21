import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SafeAreaView } from 'react-native';
import { Icon } from "react-native-elements";
import { DataTable } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { getUserResult, clearQueryState } from "../../actions/resultActions";

const { width, height } = Dimensions.get("screen");

const Result = ({ navigation }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [get, setGet] = useState(true);
    const user = useSelector((state) => state.loginReducer.user);
    const [document, setDocument] = useState(false);
    const [link, setLink] = useState("");
    let resultData = useSelector((state) => state.resultReducer.results);
    let queryRun = useSelector((state) => state.resultReducer.queryRun);
    useEffect(() => {
        if (queryRun) {
            setIsLoading(false);
            dispatch(clearQueryState());
        }
    }, [queryRun]);

    // let resultData = {
    //     results: [
    //         {
    //             id: 1,
    //             resultForClass: "6-A",
    //             resultForTerm: "Term 1",
    //             link: "http://www.africau.edu/images/default/sample.pdf",
    //         }

    //     ]
    // }

    if (get) {
        dispatch(getUserResult(user.id))
        setGet(false)
    }

    const handleDownload = (downloadLink) => {
        setDocument(true);
        setIsLoading(true);
        setLink(downloadLink);
    }

    if (isLoading && !document) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    else if (isLoading && document) {
        setTimeout(() => {
            setIsLoading(false);
            setDocument(false);
        }
            , 5000);
        return (
            <View style={{ marginTop: height / 2.4, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <WebView
                    source={{ uri: link }}
                />
            </View>
        )
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
                    <Text style={styles.LeftContainerTitle}>Results</Text>


                </View>
                <View style={styles.rightContainer}>

                </View>
            </View>
            <ScrollView style={styles.bottomContainer}>
                {Object.keys(resultData).length !== 0 ?
                    <View style={styles.tableContainer}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Class</DataTable.Title>
                                <DataTable.Title>Term</DataTable.Title>
                                <DataTable.Title>Result</DataTable.Title>
                            </DataTable.Header>
                            {resultData.results.map((result) => (
                                <DataTable.Row key={result.id}>
                                    <DataTable.Cell>{result.resultForClass}</DataTable.Cell>
                                    <DataTable.Cell>{result.resultForTerm}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {/* <Button onPress={toggleOverlay}>View</Button> */}
                                        <Icon name="download" type="antdesign" color="#000" size={25} onPress={() => {
                                            Vibration.vibrate(50)
                                            // download file from downloadLink
                                            handleDownload(result.link)
                                        }} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </View>
                    :
                    <View style={styles.noResultContainer}>
                        <Text style={styles.noResultText}>No Results</Text>
                    </View>
                }
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

        height: height / 10,
        borderTopRightRadius: 20,
        marginTop: - height / 30,
    },
    tableContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height / 30,
        marginLeft: width / 10,
        marginRight: width / 10,
        // width: width / 1.23,
    },
    noResultContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height / 30,
        marginLeft: width / 10,
        marginRight: width / 10,
        // width: width / 1.23,
    },
    noResultText: {
        color: '#1560bd',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: height / 3000,
        marginLeft: width / 25,
    }


})
export default Result