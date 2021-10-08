import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingViewBase,
  Platform,
  StyleSheet,
  Text,
  TextInputBase,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import Dialog from "react-native-dialog";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if(task.length>0){
      setTaskItems([...taskItems, task]);
      setTask("") 
    }
else{
      return
      Alert.alert('Oops!','Characters are not allowed',[{task:'understood',onPress:()=> {console.log('alert closed')}}])

    }
   
  };
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleAddTask();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todo List</Text>
        <View style={styles.items}>
          <View style={styles.create}>
            <TextInput
              style={styles.input}
              placeholder="write a Task"
              value={task}
              onChangeText={(text) => setTask(text)}
              onKeyPress={handleKeypress}
              autoFocus={true}
              onSubmitEditing={handleAddTask}
       
            />
            <View>
              <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={styles.addWrapper}>
                  <Text style={styles.addText}>Add Item</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task key={index} text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    // bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 100,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 300,
  },
  addWrapper: {
    width: 80,
    height: 30,
    backgroundColor: "#FFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginTop: 10,
  },
  create: {
    // textAlign:'center',
    alignItems: "center",
  },
  addText: {},
});
