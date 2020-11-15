import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Spinner} from 'native-base';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Editscreen = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [noOfTimeWatch, setNoOfTimeWatch] = useState(null);
  const [editSeason, setEditSeason] = useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    const {Season} = route.params;
    setEditSeason(Season);
    setName(Season.name);
    setNoOfTimeWatch(Season.noOfTimeWatch);
  }, [isFocused]);

  const EditSeason = async () => {
    try {
      if (!name || !noOfTimeWatch) {
        Snackbar.show({
          text: 'Please edit the fields',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#2112ed',
        });
        return;
      }
      const currentList = JSON.parse(await AsyncStorage.getItem('@season'));
      const updatedList = currentList.map((season) => {
        if (season.id === editSeason.id) {
          season.name = name;
          season.noOfTimeWatch = noOfTimeWatch;
        }
        return season;
      });
      await AsyncStorage.setItem('@season', JSON.stringify(updatedList));
      Snackbar.show({
        text: 'Season updated',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#2112ed',
      });
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error occured', error);
      Snackbar.show({
        text: 'Something went wrong',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#2112ed',
      });
    }
  };

  if (!editSeason) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Spinner />
      </View>
    );
  }

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
        <TouchableOpacity style={styles.addButton} onPress={EditSeason}>
          <Text style={{color: '#eee', fontSize: 20}}>Edit season</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Editscreen;

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
