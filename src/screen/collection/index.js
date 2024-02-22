import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Collection = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [tax, setTax] = useState('');
  const [taxes, setTaxes] = useState([]);

  const addTax = () => {
    if (tax !== '') {
      setTaxes([...taxes, parseFloat(tax)]);
      setTax('');
      setDescription('');
      setComment('');
      // Store taxes in AsyncStorage
      AsyncStorage.setItem(
        'taxes',
        JSON.stringify([...taxes, parseFloat(tax)]),
      );
    }
  };

  const navigateToPainting = () => {
    navigation.navigate('Painting', {
      paintingData: {
        description,
        comment,
        taxes,
        painter: 'John Doe', // Example painter value
        year: '2022', // Example year value
        origin: 'France',
      },
    });
  };

  const loadTaxes = async () => {
    try {
      const taxesString = await AsyncStorage.getItem('taxes');
      if (taxesString) {
        const taxesArray = JSON.parse(taxesString);
        setTaxes(taxesArray);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to load taxes.');
    }
  };

  useEffect(() => {
    loadTaxes();
  }, []);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert(
        'Storage Cleared',
        'Async Storage has been cleared successfully.',
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to clear storage.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          My painting collection includes a mix of artworks from various
          artists, spanning the 19th to 20th centuries and showcasing different
          styles and generations.
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'blue'}]}
          onPress={clearStorage}>
          <Text>Clear Storage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'green'}]}
          onPress={loadTaxes}>
          <Text>Load Taxes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text>Title</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          style={styles.input2}
        />
        <Text style={styles.input}>Painter</Text>
        <Text style={styles.input}>Year</Text>
        <Text style={styles.input}>Origin</Text>
        <Text>Comment</Text>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Enter comment"
          style={styles.input2}
        />
        <Text>Tax</Text>
        <TextInput
          value={tax}
          onChangeText={setTax}
          placeholder="Enter tax"
          keyboardType="numeric"
          style={styles.input2}
        />
      </View>
      <TouchableOpacity
        onPress={addTax}
        style={{
          width: 80,
          height: 50,
          backgroundColor: 'red',
          borderRadius: 2,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 16}}>Add Tax</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToPainting}
        style={{
          width: 100,
          height: 50,
          backgroundColor: 'green',
          borderRadius: 2,
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 16}}>Navigate to Painting</Text>
      </TouchableOpacity>
      <View style={styles.taxesContainer}>
        <Text>Taxes:</Text>
        {taxes.map((tax, index) => (
          <Text key={index}>{tax}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  inputContainer: {
    width: '100%',
    height: 400,
    backgroundColor: 'yellow',
    padding: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 0, // Remove the default border
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  input2: {
    borderWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
    marginBottom: 10,
    textAlign: 'center', // Center align text
  },
  taxesContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  input: {
    borderWidth: 0, // Remove the default border
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
  },
});

export default Collection;
