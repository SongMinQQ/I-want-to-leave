import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TripSchedule } from '../../types/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../../utils/CustomText';

const { width: deviceWidth } = Dimensions.get('window');

interface PickDateProps {
  startDate: string; // string 형식의 시작 날짜 (ISO 형식 가정)
  endDate: string;   // string 형식의 종료 날짜 (ISO 형식 가정)
  setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}

// 문자열을 Date로 파싱하는 헬퍼 함수
const parseDateStringToDate = (dateStr: string): Date => {
  return new Date(dateStr);
};

// Date 객체를 서버가 원하는 ISO 형태로 (YYYY-MM-DDT00:00:00) 변환하는 헬퍼 함수
const dateToServerFormat = (date: Date): string => {
  const adjustedDate = new Date(date);
  adjustedDate.setHours(0, 0, 0, 0);

  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
  const day = String(adjustedDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00:00`;
};

const PickDate: React.FC<PickDateProps> = ({ startDate, endDate, setNewSchedule }) => {
  const initialStartDate = parseDateStringToDate(startDate);
  const initialEndDate = parseDateStringToDate(endDate);

  const [isDayTrip, setIsDayTrip] = useState<boolean>(true);
  const [openStartDate, setOpenStartDate] = useState<boolean>(false);
  const [openEndDate, setOpenEndDate] = useState<boolean>(false);
  const [pickStartDate, setPickStartDate] = useState<Date>(initialStartDate);
  const [pickEndDate, setPickEndDate] = useState<Date>(initialEndDate);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sDate = parseDateStringToDate(startDate);
    const eDate = parseDateStringToDate(endDate);
    setIsDayTrip(sDate.toDateString() === eDate.toDateString());
  }, [startDate, endDate]);

  const toggleDayTrip = () => setIsDayTrip((prev) => !prev);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    
    const mm = month < 10 ? `0${month}` : month;
    const dd = day < 10 ? `0${day}` : day;

    return `${year}-${mm}-${dd}`;
  };

  const validateDates = (start: Date, end: Date) => {
    if (end < start) {
      setError("종료 날짜는 시작 날짜보다 뒤에 있어야 합니다.");
      Alert.alert("유효성 오류", "종료 날짜는 시작 날짜보다 뒤에 있어야 합니다.");
      return false;
    }
    setError(null);
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
        <CustomText style={styles.dateText}> {formatDate(pickStartDate)} </CustomText>

        {/* Date Range Separator or End Date Picker */}
        {!isDayTrip && (
          <>
            <Text style={styles.separator}>~ </Text>
            <TouchableOpacity onPress={() => setOpenEndDate(true)}>
              <AntDesign name='calendar' size={deviceWidth * 0.05} color={'#000000'} />
            </TouchableOpacity>
            <CustomText style={styles.dateText}> {formatDate(pickEndDate)} </CustomText>
          </>
        )}
      </View>

      {/* Start Date Picker */}
      <DatePicker
        modal
        mode='date'
        locale='ko'
        open={openStartDate}
        date={pickStartDate}
        onConfirm={(selectedDate) => {
          setOpenStartDate(false);

          // 시작 날짜 선택
          let updatedEndDate = pickEndDate;
          if (selectedDate > pickEndDate) {
            // 시작 날짜가 종료 날짜보다 늦은 경우 종료 날짜를 시작 날짜로 맞춤
            updatedEndDate = selectedDate;
            setPickEndDate(updatedEndDate);
          }
          
          // 유효성 검사 (당일치기인 경우 엔드데이트는 스타트데이트와 동일하므로 검사 불필요)
          if (!isDayTrip) {
            if (!validateDates(selectedDate, updatedEndDate)) {
              return;
            }
          }

          setPickStartDate(selectedDate);

          setNewSchedule((prevSchedule) => ({
            ...prevSchedule,
            startDate: dateToServerFormat(selectedDate),
            endDate: isDayTrip || selectedDate > pickEndDate ? dateToServerFormat(selectedDate) : dateToServerFormat(updatedEndDate), 
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
          locale="ko"
          open={openEndDate}
          date={pickEndDate}
          onConfirm={(selectedDate) => {
            setOpenEndDate(false);

            // 유효성 검사
            if (!validateDates(pickStartDate, selectedDate)) {
              return; // 유효하지 않으면 종료 날짜 업데이트 안 함
            }

            setPickEndDate(selectedDate);
            setNewSchedule((prevSchedule) => ({
              ...prevSchedule,
              endDate: dateToServerFormat(selectedDate),
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
    flexDirection: 'column',
    paddingHorizontal: deviceWidth * 0.05,
    paddingTop: 15
  },
  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: deviceWidth * 0.05,
    color: "#000000",
    fontWeight: 'bold'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayTripText: {
    marginRight: deviceWidth * 0.02, 
    fontSize: deviceWidth * 0.04,
    color: '#000000'
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: deviceWidth * 0.02, 
    marginRight: deviceWidth * 0.03, 
    fontSize: deviceWidth * 0.04,
    borderColor: "#000000",
    borderWidth: 1,
  },
  separator: {
    marginHorizontal: deviceWidth * 0.02,
  },
});

export default PickDate;
