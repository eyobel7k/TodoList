import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      {/* <View style={styles.circular}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#00080f",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
   color:'white'
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    borderColor:'red',
  },
  square: {
    width: 24,
    height: 24,
     backgroundColor: "white",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    
  },
  itemText: {
    maxWidth: "80%",
    color:'white',
    fontSize:35,
  },
  circular: {
    width: 15,
    height: 15,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 50,
  },
});
export default Task;
