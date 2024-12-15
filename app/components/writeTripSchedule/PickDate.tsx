import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TripSchedule } from '../../types/types';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Get device width
const { width: deviceWidth } = Dimensions.get('window');

interface PickDateProps {
  startDate: Date; // 부모 컴포넌트에서 전달되는 시작 날짜
  endDate: Date; 
  setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}


const PickDate: React.FC<PickDateProps> = ({ startDate, endDate, setNewSchedule }) => {
  const kstStartDate = new Date(new Date(startDate).getTime());
  const [isDayTrip, setIsDayTrip] = useState<boolean>(true); // Day trip toggle
  const [openStartDate, setOpenStartDate] = useState<boolean>(false);
  const [openEndDate, setOpenEndDate] = useState<boolean>(false);
  const [pickStartDate, setPickStartDate] = useState<Date>(kstStartDate);
  const [pickEndDate, setPickEndDate] = useState<Date>(endDate);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsDayTrip(startDate.toDateString() === endDate.toDateString());
    console.log(formatDate(pickStartDate))
  }, [startDate, endDate]);

  const toggleDayTrip = () => setIsDayTrip((prev) => !prev);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
    const day = date.getDate();
    
    const mm = month < 10 ? `0${month}` : month;
    const dd = day < 10 ? `0${day}` : day;

    return `${year}-${mm}-${dd}`;
}; // Format the date for display

  const validateDates = (start: Date, end: Date) => {
    if (end < start) {
      setError("종료 날짜는 시작 날짜보다 뒤에 있어야 합니다.");
      Alert.alert("유효성 오류", "종료 날짜는 시작 날짜보다 뒤에 있어야 합니다.");
      return false;
    }
    setError(null); // Clear the error if dates are valid
    return true;
  };

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
        <Text style={styles.dateText}> {formatDate(pickStartDate)} </Text>

        {/* Date Range Separator or End Date Picker */}
        {!isDayTrip && (
          <>
            <Text style={styles.separator}>~ </Text>
            <TouchableOpacity onPress={() => setOpenEndDate(true)}>
              <AntDesign name='calendar' size={deviceWidth * 0.05} color={'#000000'} />
            </TouchableOpacity>
            <Text style={styles.dateText}> {formatDate(pickEndDate)} </Text>
          </>
        )}
      </View>

      {/* Start Date Picker */}
      <DatePicker
        modal
        mode='date'
        open={openStartDate}
        date={pickStartDate}
        onConfirm={(selectedDate) => {
          setOpenStartDate(false); // 모달을 닫음
          setPickStartDate(selectedDate);
      
          // 종료 날짜보다 뒤일 경우 종료 날짜도 업데이트
          if (selectedDate > pickEndDate) {
            setPickEndDate(selectedDate);
          }
      
          setNewSchedule((prevSchedule) => ({
            ...prevSchedule,
            startDate: selectedDate,
            endDate: isDayTrip || selectedDate > pickEndDate ? selectedDate : prevSchedule.endDate, 
          }));
        }}
        onCancel={() => {
          setOpenStartDate(false); // 모달을 닫음
        }}
      />

      {/* End Date Picker */}
      {!isDayTrip && (
        <DatePicker
          modal
          mode='date'
          locale="ko"
          open={openEndDate}
          date={pickEndDate}
          onConfirm={(selectedDate) => {
            setOpenEndDate(false);
            if (validateDates(pickStartDate, selectedDate)) {
              setPickEndDate(selectedDate);
              setNewSchedule((prevSchedule) => ({
                ...prevSchedule,
                endDate: selectedDate, // Update pickEndDate if valid
              }));
            }
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
    paddingTop: 15
  },
  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between "여행 날짜" and the switch
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: deviceWidth * 0.05, // Adjust title size based on the device width
    color: "#000000",
    fontWeight: 'bold'
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
