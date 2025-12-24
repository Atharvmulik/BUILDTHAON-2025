// components/HoverButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Animated } from 'react-native';

interface HoverButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
}

const HoverButton = ({ children, onPress }: HoverButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnim }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: isPressed ? 2 : 5 },
            shadowOpacity: isPressed ? 0.2 : 0.3,
            shadowRadius: isPressed ? 3 : 8,
            elevation: isPressed ? 3 : 8,
          },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default HoverButton;