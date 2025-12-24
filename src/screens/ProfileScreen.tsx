import React from 'react';
import { View, Text } from 'react-native';

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-warm-greige pt-10 px-6">
      <Text className="text-3xl font-bold text-gray-800 mb-6">
        Profile
      </Text>
      {/* Add profile content here */}
    </View>
  );
};

export default ProfileScreen;