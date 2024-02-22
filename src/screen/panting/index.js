import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaintingDetails from '../pantingdetail/index';

const Painting = ({navigation, route}) => {
  const [taxes, setTaxes] = useState([]);
  const {description, comment, tax, painter, year, origin} =
    route.params?.paintingData || {};

  // Storing the 'taxes' array
  const saveTaxes = async taxesArray => {
    try {
      await AsyncStorage.setItem('taxes', JSON.stringify(taxesArray));
    } catch (error) {
      console.error('Failed to save taxes to AsyncStorage:', error);
    }
  };

  const navigateToPainting = item => {
    navigation.navigate('PaintingDetails', {
      paintingData: {
        description: 'Some Description',
        comment: 'Some Comment',
        tax: item,
        painter,
        year,
        origin,
      },
    });
  };

  // Retrieving the 'taxes' array
  const fetchTaxes = async () => {
    try {
      const taxesString = await AsyncStorage.getItem('taxes');
      if (taxesString) {
        const taxesArray = JSON.parse(taxesString);
        setTaxes(taxesArray);
      }
    } catch (error) {
      console.error('Failed to fetch taxes from AsyncStorage:', error);
    }
  };

  // Example usage
  saveTaxes(['1', '2', '3', '4', '5', '6', '7', '8']); // Store the taxes array
  fetchTaxes(); // Retrieve and set the taxes array

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Taxes</Text>

      <FlatList
        data={taxes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigateToPainting(item)}>
            <Text style={{fontSize: 12, padding: 5, borderRadius: 5}}>
              Tax: {item.toString()}
            </Text>

            <Text style={styles.text}>Description:</Text>
            <Text style={styles.text}>Comment: Some Comment</Text>
            <Text style={styles.text}>Painter: {painter}</Text>
            <Text style={styles.text}>Year: {year}</Text>
            <Text style={styles.text}>Origin: {origin}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Painting;
