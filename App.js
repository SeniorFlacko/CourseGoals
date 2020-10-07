/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  TextInput,
  Text,
  FlatList,
} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...courseGoals,
      {uid: Math.random().toString(), value: goalTitle},
    ]);

    setIsAddMode(false);
  };

  const removeHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.uid != goalId);
    });
  };

  const onCancel = () => {
    setIsAddMode(false);
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.screen}>
          <Button title="Add Mode" onPress={() => setIsAddMode(true)} />
          <GoalInput
            visible={isAddMode}
            onAddGoal={addGoalHandler}
            onCancel={onCancel}
          />
          <FlatList
            data={courseGoals}
            keyExtractor={(item, index) => item.uid}
            renderItem={(itemData) => (
              <GoalItem
                id={itemData.item.uid}
                onDelete={removeHandler}
                title={itemData.item.value}
              />
            )}></FlatList>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  screen: {padding: 50},
});

export default App;
