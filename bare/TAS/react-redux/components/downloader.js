import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid } from 'react-native';


const checkPermission = async (link) => {

    // Function to check the platform
    // If Platform is Android then check for permissions.
    console.log('link -> ', link);
    if (Platform.OS === 'ios') {
        handleDownload();
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message:
                        'Application needs access to your storage to download File',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Start downloading
                handleDownload(link);
                console.log('Storage Permission Granted.');
            } else {
                // If permission denied then show alert
                Alert.alert('Error', 'Storage Permission Not Granted');
            }
        } catch (err) {
            // To handle permission related exception
            console.log("++++" + err);
        }
    }
};

const handleDownload = (downloadLink) => {

    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = downloadLink;
    // Function to get extention of the file url
    let file_ext = ".pdf"

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            path:
                RootDir +
                '/file_' +
                Math.floor(date.getTime() + date.getSeconds() / 2) +
                file_ext,
            description: 'downloading file...',
            notification: true,
            // useDownloadManager works with Android only
            useDownloadManager: true,
        },
    };
    config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
            // Alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            alert('File Downloaded Successfully.');
        });
};

export default checkPermission;