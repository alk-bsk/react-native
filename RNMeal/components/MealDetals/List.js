import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default function List({ data }) {
    return (
        data.map((dataPoint) => (
            <View key={dataPoint} style={styles.listItem}>
                <Text style={styles.itemText}>{dataPoint}</Text>
            </View>
        ))
    )
}

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        borderWidth: 2,
        borderColor: '#8b5939',
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    itemText: {
        color: '#613014',
        textAlign: 'center'
    }
});
