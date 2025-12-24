// components/Icon.tsx - Alternative version with explicit props
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Export all possible icon names as a type
export type IconName = 
  | 'home' 
  | 'alert-circle' 
  | 'list' 
  | 'user' 
  | 'water' 
  | 'trash' 
  | 'lightbulb' 
  | 'alert-triangle' 
  | 'map-pin' 
  | 'chevron-right' 
  | 'clock' 
  | 'check-circle';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Icon = ({ name, size = 24, color = '#000', style }: IconProps) => {
  // Explicit props to avoid TypeScript issues
  const baseProps = {
    size,
    color,
    style: style as StyleProp<TextStyle>,
  };

  switch (name) {
    case 'home':
      return <MaterialIcons name="home" {...baseProps} />;
    case 'alert-circle':
      return <MaterialIcons name="error-outline" {...baseProps} />;
    case 'list':
      return <MaterialIcons name="list" {...baseProps} />;
    case 'user':
      return <FontAwesome name="user" {...baseProps} />;
    case 'water':
      return <MaterialCommunityIcons name="water" {...baseProps} />;
    case 'trash':
      return <FontAwesome name="trash" {...baseProps} />;
    case 'lightbulb':
      return <FontAwesome name="lightbulb-o" {...baseProps} />;
    case 'alert-triangle':
      return <FontAwesome name="exclamation-triangle" {...baseProps} />;
    case 'map-pin':
      return <FontAwesome name="map-marker" {...baseProps} />;
    case 'chevron-right':
      return <MaterialIcons name="chevron-right" {...baseProps} />;
    case 'clock':
      return <FontAwesome name="clock-o" {...baseProps} />;
    case 'check-circle':
      return <FontAwesome name="check-circle" {...baseProps} />;
    default:
      // If icon name is not recognized, show a default icon
      return <MaterialIcons name="help-outline" {...baseProps} />;
  }
};

export default Icon;