import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { TripSchedule } from '../../types/types';
import CustomInput from '../../utils/CustomInput';
import CustomText from '../../utils/CustomText';

interface WriteScheduleProps {
    setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
  }

const { width: deviceWidth } = Dimensions.get('window');

const WriteScheduleInformation: React.FC<WriteScheduleProps> = ({setNewSchedule}) => {
    const [information, setInformation] = useState(''); // Local state to hold the input value

    const handleTitleChange = (text: string) => {
        setInformation(text); // Update local state for immediate UI response

        // Update the schedule's title using setNewSchedule
        setNewSchedule((prevSchedule) => ({
        ...prevSchedule,
        information: text,
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    여행 설명
                </Text>
                <CustomText>{information.length}/40</CustomText>
            </View>
            <CustomInput 
            placeholder="여행 설명을 입력하세요(최대 40자)"
            value={information}
            onChangeText={handleTitleChange} // Call the handler on text change
            maxLength={40} // Ensure title is within 40 characters
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
export default WriteScheduleInformation;