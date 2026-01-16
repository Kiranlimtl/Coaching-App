import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { ClassListDisplay } from '@/type/classTypes';
import React from 'react';

type ClassListItemProps = {
    classItem: ClassListDisplay;
}

export default function ClassListItem({ classItem }: ClassListItemProps) {
    const {
        name,
        startTime,
        endTime,
        duration,
        currentCoachName,
        isClassOver
    } = classItem;

    return (
        <TouchableOpacity 
            style={styles.container} 
            disabled={isClassOver}>
            <View style={styles.infoContainer}>
                <Text style={styles.className}>{name}</Text>
                <Text style={styles.classDetails}>
                    {`${new Date(startTime).toLocaleString()} - ${new Date(endTime).toLocaleTimeString()}`}
                </Text>
                <Text style={styles.classDetails}>
                    Duration: {duration.hours}h {duration.minutes}m
                </Text>
                <Text style={styles.coachName}>Coach: {currentCoachName}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
        paddingBottom: 10,
    },

    infoContainer: {
        flex: 1,
        gap: 4,
        alignItems: 'flex-start',
        flexDirection: 'column',

    },
    className: {
        fontSize: 24,
        fontFamily: "Poppins_400Regular",
        color: "#ea5c2a",
    },
    classDetails: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#333333",
    },
    coachName: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#333333",
    },
});