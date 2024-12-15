import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Button,
  Dimensions
} from 'react-native';
import { TripSchedule } from '../../types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText from '../../utils/CustomText';

const { width: deviceWidth } = Dimensions.get('window');

// 날짜를 자정으로 맞추는 헬퍼 함수
const setLocalMidnight = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// 로컬 날짜를 YYYY-MM-DD 문자열로 포맷팅
const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateDateList = (start: Date, end: Date) => {
  const dateList: string[] = [];

  let currentDate = setLocalMidnight(start);
  let endDate = setLocalMidnight(end);

  while (currentDate <= endDate) {
    dateList.push(formatLocalDate(currentDate));
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
  }

  return dateList;
};

interface SelectDateProps {
  startDate: string; // 문자열 타입
  endDate: string;   // 문자열 타입
  setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
  onDateSelected: (date: Date) => void;
}

const SelectDate: React.FC<SelectDateProps> = ({ startDate, endDate, onDateSelected }) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false); 
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dateList, setDateList] = useState<string[]>([]); 

  // 문자열을 Date 객체로 변환
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 날짜 리스트 생성 및 첫 번째 날짜 자동 선택
  useEffect(() => {
    const newList = generateDateList(start, end);
    setDateList(newList);
    if (newList.length > 0) {
      setSelectedDate(newList[0]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedDate) {
      onDateSelected(new Date(selectedDate));
    }
  }, [selectedDate]);

  // 날짜 선택 핸들러
  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    onDateSelected(new Date(date));
    setModalVisible(false);
  };

  // 각 날짜 아이템 렌더 함수
  const renderDateItem = (date: string) => (
    <TouchableOpacity
      style={[
        styles.dateItem,
        selectedDate === date && styles.selectedDateItem
      ]}
      onPress={() => handleSelectDate(date)}
    >
      <Text style={styles.dateText}>{date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>날짜 선택</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.calendarBtn}>
        <FontAwesome name='calendar-check-o' size={20} color={'#000000'}/>
        <CustomText> 선택한 날짜 : </CustomText>
        <CustomText style={styles.label}>{selectedDate || '없음'}</CustomText>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>날짜 선택</Text>
            <FlatList
              data={dateList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderDateItem(item)}
            />
            <Button title="닫기" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  calendarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  selectedDateItem: {
    backgroundColor: '#70d7c7',
  },
  dateText: {
    fontSize: 16,
  },
  title: {
    fontSize: deviceWidth * 0.04,
    color: "#000000",
    fontWeight: 'bold'
  }
});

export default SelectDate;
