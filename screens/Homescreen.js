import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, FlatList} from 'react-native';
import {Button, Fab, Icon, CheckBox, Spinner} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Homescreen = ({navigation, route}) => {
  const [listOfSeason, setListOfSeason] = useState([]);
  const [loading, setLoading] = useState(false);
  const IsFocused = useIsFocused();

  const getSeasonList = async () => {
    setLoading(true);
    const list = JSON.parse(await AsyncStorage.getItem('@season'));
    console.log(list);
    if (list) {
      setListOfSeason(list);
    } else {
      setListOfSeason([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSeasonList();
  }, [IsFocused]);

  const renderItem = ({item}) => {
    console.log('My items are ', item);
    return <Item title={item} />;
  };

  const deleteItem = async (id) => {
    const deletedList = await listOfSeason.filter((season) => season.id != id);
    await AsyncStorage.setItem('@season', JSON.stringify(deletedList));
    setListOfSeason(deletedList);
  };

  const checkItem = async (id) => {
    const listOfSeason = JSON.parse(await AsyncStorage.getItem('@season'));
    const updatedList = listOfSeason.map((season) => {
      if (season.id === id) {
        season.isWatched = !season.isWatched;
      }
      return season;
    });
    await AsyncStorage.setItem('@season', JSON.stringify(updatedList));
    setListOfSeason(updatedList);
  };

  const Item = ({title}) => {
    console.log(title);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}>
        <CheckBox
          checked={title.isWatched}
          onPress={() => checkItem(title.id)}
        />
        <View style={{overflow: 'hidden'}}>
          <Text style={{fontSize: 20, overflow: 'hidden'}}>{title.name}</Text>
          <Text style={{fontSize: 15}}>
            {title.noOfTimeWatch} times watched
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Button
            style={{margin: 3, backgroundColor: '#FF362E'}}
            onPress={() => {
              deleteItem(title.id);
            }}>
            <Icon name="trash" />
          </Button>
          <Button
            style={{margin: 3, backgroundColor: '#218F76'}}
            onPress={() => navigation.navigate('Edit', {Season: title})}>
            <Icon name="pencil" />
          </Button>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Spinner color="#2112ed" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {listOfSeason.length === 0 ? (
        <View style={styles.container}>
          <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 2}}>
            No data found
          </Text>
        </View>
      ) : (
        <FlatList
          style={{width: '100%'}}
          data={listOfSeason}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      <Fab position="bottomRight" onPress={() => navigation.navigate('Add')}>
        <Icon name="add" />
      </Fab>
    </View>
  );
};

export default Homescreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  Title: {
    color: '#000',
  },
};
