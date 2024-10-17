import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { TripSchedule } from '../../types/types';

interface WriteScheduleProps {
    setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
  }

const { width: deviceWidth } = Dimensions.get('window');

const WriteScheduleTitle: React.FC<WriteScheduleProps> = ({setNewSchedule}) => {
    const [title, setTitle] = useState(''); // Local state to hold the input value

    const handleTitleChange = (text: string) => {
        setTitle(text); // Update local state for immediate UI response

        // Update the schedule's title using setNewSchedule
        setNewSchedule((prevSchedule) => ({
        ...prevSchedule,
        title: text,
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    여행 제목
                </Text>
                <Text>{title.length}/20</Text>
            </View>
            <TextInput 
            placeholder="여행 제목을 입력하세요(최대 20자)"
            value={title}
            onChangeText={handleTitleChange} // Call the handler on text change
            maxLength={20} // Ensure title is within 20 characters
            style={styles.input}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', // Stack elements vertically
        paddingHorizontal: deviceWidth * 0.05,
        paddingTop: 25
    },
    title: {
        fontSize: deviceWidth * 0.05, // Adjust title size based on the device width
        color: "#000000",
        fontWeight: 'bold'
    },
    input: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#000000',
        fontSize: deviceWidth * 0.04,
        paddingVertical: 5,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
export default WriteScheduleTitle;