import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Subtitle({ children }) {
    return (
        <View style={styles.subtitleContainer}>
            <Text style={styles.subTitle}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        color: '#613014',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitleContainer: {
        padding: 6,
        marginHorizontal: 12,
        marginVertical: 4,
        borderBottomColor: '#613014',
        borderBottomWidth: 2
    }
});
