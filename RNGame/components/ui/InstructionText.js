import { Text, StyleSheet } from 'react-native';
import Colors from '../../constancts/colors';

function InstuctionText({ children, style }) {
    return <Text style={[styles.instructionText, style]}>
        {children}
    </Text>
}

export default InstuctionText;

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24
    }
});