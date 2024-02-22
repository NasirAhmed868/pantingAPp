import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaintingDetails = ({ route, navigation }) => {
  const { paintingData } = route.params || {};
  const { description, comment, tax } = paintingData || {};

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('taxes');
      Alert.alert('Data Deleted', 'Tax data has been deleted successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to delete data:', error);
      Alert.alert('Error', 'Failed to delete data.');
    }
  };

  const [count, setCount] = useState(0);

  const getCount = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      setCount(keys.length);
    } catch (error) {
      console.error('Failed to get count:', error);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Tax: {tax}</Text>
      <Text>Description: {description}</Text>
      <Text>Comment: {comment}</Text>
      <Text>Number of Items in AsyncStorage: {count}</Text>
      <TouchableOpacity style={styles.button} onPress={deleteData}>
        <Text style={styles.buttonText}>Delete Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PaintingDetails;
