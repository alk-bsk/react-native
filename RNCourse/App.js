import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(pre => [...pre,
    { text: enteredGoalText, id: Math.random().toString() }
    ])
    setModalIsVisible(false);
  }

  function deleteGoalHandler(id) {
    setCourseGoals(pre => pre.filter(item => item.id != id));
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button title='Add New Goal'
          color='#5e0acc'
          onPress={startAddGoalHandler}
        />
        {modalIsVisible && <GoalInput onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />}
        <View style={styles.goalsContainer}>
          <FlatList data={courseGoals}
            renderItem={(itemData) => {
              return <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />;
            }}
            keyExtractor={(item, _) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 30,
    paddingHorizontal: 16
  },
  goalsContainer: {
    flex: 5
  }

});
