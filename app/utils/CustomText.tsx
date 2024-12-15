import React, { FC } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

const CustomText: FC<CustomTextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.default, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: '#000000',
  },
});

export default CustomText;
