import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Text>Waiting</Text>
    </View>
);

class CameraScreen extends Component {
    getImageFromUri = uri => {
        const result = uri.split('/');
        return result[result.length - 1];
    };

    copy = async image => {
        const file = this.getImageFromUri(image.uri);
        const dir = RNFS.PicturesDirectoryPath;
        const path = `${dir}/${file}`;
        console.log('TENTANDO COPIAR DE ' + image.uri + ' PARA ' + path);
        RNFS.copyFile(image.uri.replace("file://",""), path)
            .then(success => {
                console.log('COPIADA COM SUCESSO', success);
            })
            .catch(error => {
                console.log('ERRO AO COPIAR', error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel'
                    }}
                >
                    {({ camera, status }) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                            <View
                                style={{
                                    flex: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => this.takePicture(camera)}
                                    style={styles.capture}
                                >
                                    <Text style={{ fontSize: 14 }}>
                                        {' '}
                                        TIRAR FOTO{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                </RNCamera>
            </View>
        );
    }

    takePicture = async function(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        console.log('IMAGEM', data);
        //this.copy(data);
        this.props.navigation.navigate('Image');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});

export default CameraScreen;
