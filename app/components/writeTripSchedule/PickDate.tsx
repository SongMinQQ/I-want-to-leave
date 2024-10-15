import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TripSchedule } from '../../types/types';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Get device width
const { width: deviceWidth } = Dimensions.get('window');

interface PickDateProps {
  setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}

const PickDate: React.FC<PickDateProps> = ({ setNewSchedule }) => {
  const [isDayTrip, setIsDayTrip] = useState<boolean>(true); // Day trip toggle
  const [openStartDate, setOpenStartDate] = useState<boolean>(false);
  const [openEndDate, setOpenEndDate] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const toggleDayTrip = () => setIsDayTrip((prev) => !prev);

  const formatDate = (date: Date) => date.toLocaleDateString(); // Format the date for display

  return (
    <View style={styles.container}>
      {/* Top area: "여행 날짜" and the toggle */}
      <View style={styles.topArea}>
        <Text style={styles.title}>여행 날짜</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.dayTripText}>당일치기</Text>
          <Switch value={isDayTrip} onValueChange={toggleDayTrip} />
        </View>
      </View>

      {/* Main date selection section */}
      <View style={styles.dateContainer}>
        {/* Start Date */}
        <TouchableOpacity onPress={() => setOpenStartDate(true)}>
          <AntDesign name='calendar' size={deviceWidth * 0.05} color={'#000000'} />
        </TouchableOpacity>
        <Text style={styles.dateText}> {formatDate(startDate)} </Text>

        {/* Date Range Separator or End Date Picker */}
        {!isDayTrip && (
          <>
            <Text style={styles.separator}>~ </Text>
            <TouchableOpacity onPress={() => setOpenEndDate(true)}>
              <AntDesign name='calendar' size={deviceWidth * 0.05} color={'#000000'} />
            </TouchableOpacity>
            <Text style={styles.dateText}> {formatDate(endDate)} </Text>
          </>
        )}
      </View>

      {/* Start Date Picker */}
      <DatePicker
        modal
        mode='date'
        open={openStartDate}
        date={startDate}
        onConfirm={(selectedDate) => {
          setOpenStartDate(false);
          setStartDate(selectedDate);
          setNewSchedule((prevSchedule) => ({
            ...prevSchedule,
            startDate: selectedDate, // Update startDate
            endDate: isDayTrip ? selectedDate : prevSchedule.endDate, // For day trip, set endDate same as startDate
          }));
        }}
        onCancel={() => {
          setOpenStartDate(false);
        }}
      />

      {/* End Date Picker */}
      {!isDayTrip && (
        <DatePicker
          modal
          mode='date'
          open={openEndDate}
          date={endDate}
          onConfirm={(selectedDate) => {
            setOpenEndDate(false);
            setEndDate(selectedDate);
            setNewSchedule((prevSchedule) => ({
              ...prevSchedule,
              endDate: selectedDate, // Update endDate
            }));
          }}
          onCancel={() => {
            setOpenEndDate(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Stack elements vertically
    paddingHorizontal: deviceWidth * 0.05, // 5% of the device width for padding
    paddingTop: 10
  },
  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between "여행 날짜" and the switch
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: deviceWidth * 0.05, // Adjust title size based on the device width
    color: "#000000"
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayTripText: {
    marginRight: deviceWidth * 0.02, // Space between text and switch
    fontSize: deviceWidth * 0.04, // Adjust text size
    color: '#000000'
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center', // Center date pickers
    // flex: 1, // Take up remaining space
  },
  dateText: {
    marginLeft: deviceWidth * 0.02, // 2% of device width for margin
    marginRight: deviceWidth * 0.03, // 3% of device width for margin
    fontSize: deviceWidth * 0.04, // Adjust text size relative to the device width
    borderColor: "#000000",
    borderWidth: 1,
  },
  separator: {
    marginHorizontal: deviceWidth * 0.02, // 2% of device width for margin between elements
    // fontSize: deviceWidth * 0.045, // Adjust separator size
  },
});

export default PickDate;
