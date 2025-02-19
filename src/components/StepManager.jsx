import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';

const StepManager = ({ step }) => {
    return (
        <View style={styles.stepContainer}>
            <Text style={styles.signUpText}>Register your account</Text>
            {step === 1 ? (
                <Text style={styles.stepText}>Invest Effortlessly - Every Penny Counts</Text>
            ) : (
                <Text style={styles.stepText}>Your phone number ensures your account's security. Only one EDUFE account is allowed per phone number</Text>
            )}
        </View>
    );
};

export default StepManager;

const styles = StyleSheet.create({
    stepContainer: {
        marginTop: 20,
    },
    signUpText: {
        fontFamily: 'Urbanist-Bold',
        fontSize: 24,
        marginBottom: 8,
    },
    stepText: {
        fontSize: 14,
        fontFamily: 'Urbanist-Medium',
        color: Colors.gray,
        marginBottom: 12
    },
});
