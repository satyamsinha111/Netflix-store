import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import shortid from 'shortid';

const Addscreen = ({navigation}) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [noOfTimeWatch, setNoOfTimeWatch] = useState('');
  const [isWatched, setIsWatched] = useState(false);

  const addToList = async () => {
    if (!name || !noOfTimeWatch) {
      Snackbar.show({
        text: 'Fields are empty',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#2112ed',
      });
      return;
    }
    const seasonToAdd = {
      id: shortid.generate(),
      name,
      noOfTimeWatch,
      isWatched: false,
    };
    const previous_list = JSON.parse(await AsyncStorage.getItem('@season'));
    const new_list = [];
    if (!previous_list) {
      new_list.push(seasonToAdd);
      await AsyncStorage.setItem('@season', JSON.stringify(new_list));
    } else {
      previous_list.push(seasonToAdd);
      await AsyncStorage.setItem('@season', JSON.stringify(previous_list));
    }
    setId(null);
    setName(null);
    setNoOfTimeWatch(null);
    setIsWatched(false);
    Snackbar.show({
      text: 'Season added to the list',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#2112ed',
    });
    navigation.navigate('Home');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.formInput}
          placeholder="Enter season name"
          placeholderTextColor="grey"
          defaultValue={name}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Watch count"
          placeholderTextColor="grey"
          defaultValue={noOfTimeWatch}
          onChangeText={(noOfTimeWatch) => setNoOfTimeWatch(noOfTimeWatch)}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addToList()}>
          <Text style={{color: '#eee', fontSize: 20}}>Add to list</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Addscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    margin: 10,
  },
  formInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    color: '#BB2CD9',
    letterSpacing: 2,
    fontSize: 20,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2B52',
    width: '100%',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
});
