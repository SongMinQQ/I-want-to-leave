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

  // 종료 날짜까지 포함하기 위해 endDate를 기준으로 <= 비교
  while (currentDate <= endDate) {
    dateList.push(formatLocalDate(currentDate));
    // 날짜를 1일씩 증가
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
  }

  return dateList;
};


interface SelectDateProps {
  startDate: Date; // 시작 날짜
  endDate: Date; // 종료 날짜
  setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
  onDateSelected: (date: Date) => void;
}



const SelectDate: React.FC<SelectDateProps> = ({ startDate, endDate, onDateSelected}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false); // 모달 상태
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜
  const [dateList, setDateList] = useState<string[]>([]); // 날짜 리스트

  // 날짜 리스트 생성 및 첫 번째 날짜 자동 선택
  useEffect(() => {
    const newList = generateDateList(startDate, endDate);
    setDateList(newList);
    if (newList.length > 0) {
      setSelectedDate(newList[0]);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedDate) {
      onDateSelected(new Date(selectedDate)); // selectedDate가 바뀌고 난 뒤에 호출
    }
  }, [selectedDate]);
  // 날짜 선택 핸들러: 선택된 날짜를 상태에 저장하고 모달 닫기
  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    // setNewSchedule((prev) => ({
    //   ...prev,
    //   startDate: new Date(date),
    //   endDate: new Date(date), // 동일한 날짜를 시작과 종료 날짜로 설정
    // }));
    onDateSelected(new Date(date));
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
      <Text style={styles.title}>날짜 선택</Text>
      {/* 선택된 날짜 표시 */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.calendarBtn}>
        <FontAwesome name='calendar-check-o' size={20} color={'#000000'}/>
        <CustomText> 선택한 날짜 : </CustomText>
      
      <CustomText style={styles.label}>{selectedDate || '없음'}</CustomText>
      </TouchableOpacity>
      {/* 모달 열기 버튼 */}
      

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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  calendarBtn: {
    display: 'flex',
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
  title: {
    fontSize: deviceWidth * 0.04, // Adjust title size based on the device width
        color: "#000000",
        fontWeight: 'bold'
  }
});

export default SelectDate;
