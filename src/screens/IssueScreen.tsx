// screens/IssuesScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const IssuesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Reported Issues
      </Text>
      {/* Add issues list here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8', // warm-greige
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333', // gray-800
    marginBottom: 24,
  },
});

export default IssuesScreen;