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
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogResponse, setDialogResponse] = useState(false);

  const [dialogMessage, setDialogMessage] = useState(false);

  // const handleAddTask = () => {
  //   console.log(task)
  //   if (task.length > 0) {
  //     setTaskItems([...taskItems, task]);
  //     setTask("");
  //   }
  // };

  const handleAddTask = () => {
    const cleanedInput = task.trim().toLowerCase();
    // let result = task.map(({ setTaskItems }) => setTaskItems);
    if (taskItems.find((setTaskItems) => setTaskItems === cleanedInput)) {
      console.log("duplicate");
    } else if (
      cleanedInput.length > 0 &&
      isNaN(cleanedInput) &&
      /^[a-zA-Z0-9- -!-']*$/.test(cleanedInput)
    ) {
      setTaskItems([...taskItems,task.trim() ]);
      setTask("");
      // console.log(item);
    }
  };

  const completeTask = (index) => {
    // console.log(index)
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

const openDialogue= (message)=>{
  setShowDialog(true)
  setDialogMessage(message)
}

  const displayDialogue = () => (
    <View style={styles.dialogContainer}>
      <View style={styles.dialog}>
        <Text>{dialogMessage}</Text>
        <View style={styles.buttonActions}>
          <Button
            title="Cancel"
            onPress={() => dialogAction(false)}
          />
          <Button
            title="OK"
            onPress={() => dialogAction(true)}
          />
        </View>
      </View>
    </View>
  )

  const dialogAction = (action) => {
    setDialogResponse(action?true:false);
    setShowDialog(false);
    completeTask()
  }

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
                  // onPress={() => completeTask(index)}
                  onPress={()=>openDialogue('Are you sure you want to delete "' +item +'"')}
                >
                  <Task key={index} text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {showDialog &&
        displayDialogue()
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3edec",
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
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
  dialogContainer : {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    border: 'solid 1px #000',
    margin: '0 auto',
    borderRadius: 5,
    padding: 30,
    backgroundColor: '#FFF',
  },
  buttonActions : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
});
