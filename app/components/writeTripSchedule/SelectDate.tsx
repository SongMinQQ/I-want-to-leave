import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Button 
} from 'react-native';
import { TripSchedule } from '../../types/types';

interface SelectDateProps {
  startDate: Date; // 시작 날짜
  endDate: Date; // 종료 날짜
  setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}

// 시작 날짜와 종료 날짜 사이의 날짜들을 생성하는 함수
const generateDateList = (start: Date, end: Date) => {
  const dateList = [];
  let currentDate = new Date(start);

  while (currentDate <= end) {
    dateList.push(currentDate.toISOString().split('T')[0]); // YYYY-MM-DD 형식
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
};

const SelectDate: React.FC<SelectDateProps> = ({ startDate, endDate, setNewSchedule }) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false); // 모달 상태
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜
  const [dateList, setDateList] = useState<string[]>([]); // 날짜 리스트

  // 컴포넌트가 마운트되면 날짜 리스트 생성
  useEffect(() => {
    setDateList(generateDateList(startDate, endDate));
  }, [startDate, endDate]);

  // 날짜 선택 핸들러: 선택된 날짜를 상태에 저장하고 모달 닫기
  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setNewSchedule((prev) => ({
      ...prev,
      startDate: new Date(date),
      endDate: new Date(date), // 동일한 날짜를 시작과 종료 날짜로 설정
    }));
    setModalVisible(false); // 모달 닫기
  };

  // 각 날짜 아이템을 렌더링하는 함수
  const renderDateItem = (date: string) => (
    <TouchableOpacity
      style={[
        styles.dateItem,
        selectedDate === date && styles.selectedDateItem, // 선택된 날짜 스타일 적용
      ]}
      onPress={() => handleSelectDate(date)}
    >
      <Text style={styles.dateText}>{date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 선택된 날짜 표시 */}
      <Text style={styles.label}>선택된 날짜: {selectedDate || '없음'}</Text>
      {/* 모달 열기 버튼 */}
      <Button title="날짜 선택" onPress={() => setModalVisible(true)} />

      {/* 날짜 선택 모달 */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // 뒤로 가기 버튼 눌렀을 때 모달 닫기
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
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
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
    backgroundColor: '#70d7c7', // 선택된 날짜 배경색
  },
  dateText: {
    fontSize: 16,
  },
});

export default SelectDate;
