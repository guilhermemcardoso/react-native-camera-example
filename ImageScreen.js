import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ImageScreen extends Component {
    

    render() {
        return (
            <View style={styles.container}>
                <Text>A Camera foi finalizada</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
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

export default ImageScreen;
