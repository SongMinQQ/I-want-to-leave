import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface CustomInputProps extends TextInputProps {
  // 필요한 경우 여기에 추가 Prop 정의 가능
}

const CustomInput: React.FC<CustomInputProps> = ({ style, placeholderTextColor, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={placeholderTextColor ?? '#C0C0C0'} // 연한 회색
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    // 여기서 기본적인 스타일 지정 가능 (예: fontSize: 16)
  },
});

export default CustomInput;
