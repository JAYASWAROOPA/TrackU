import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Platform, Alert } from "react-native";
import ToDoBox from "../../components/toDoBox/ToDoBox";
import { styles } from "./style";

const API_BASE = Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://localhost:5000";

type Task = {
  id: string;
  task: string;
  isCompleted: boolean;
  //userId: string;
};
export default function ToDoList({ username, userId: propUserId  }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
const userId = propUserId ?? username ?? "demo-user";
  // Fetch tasks
 useEffect(() => {
  fetch(`${API_BASE}/api/todos/${userId}`) // changed username -> userId
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setTasks(
          data.map(t => ({
            id: t._id,
            task: t.task,
            isCompleted: t.isCompleted,
          }))
        );
      } else if (data.error) {
        Alert.alert("Error", data.error);
      }
    })
    .catch(err => console.error(err));
}, [userId]);


  // Add or update task
  const handleAddTask = async () => {
  if (!taskText.trim()) return;

  // Log task and username
  console.log("Adding/Updating task:", taskText, "for user:", username);

  try {
    let response;
    if (editId) {
      // Update
      response = await fetch(`${API_BASE}/api/todos/update/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: taskText }),
      });
    } else {
      // Add
      response = await fetch(`${API_BASE}/api/todos/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username:userId, task: taskText }),
      });
    }

    const result = await response.json();

    if (response.ok) {
      if (editId) {
        setTasks(prev => prev.map(t => (t.id === editId ? { ...t, task: taskText } : t)));
        setEditId(null);
      } else {
        setTasks(prev => [...prev, { id: result._id, task: result.task, isCompleted: result.isCompleted }]);
      }
      setTaskText("");
    } else {
      Alert.alert("Error", result.error || "Something went wrong");
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Failed to save task");
  }
};


  const toggleTask = async (id: string, isCompleted: boolean) => {
    try {
      const response = await fetch(`${API_BASE}/api/todos/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !isCompleted }),
      });
      if (response.ok) {
        setTasks(prev => prev.map(t => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update task");
    }
  };

  const editTask = (id: string, task: string) => {
    setTaskText(task);
    setEditId(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Plan Your Day</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddTask}>
          <Text style={styles.addBtnText}>{editId ? "Update" : "Add"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {tasks.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#999", marginTop: 20 }}>
            No tasks yet. Add one above 👆
          </Text>
        ) : (
          tasks.map(task => (
            <ToDoBox
              key={task.id}
              text={task.task}
              done={task.isCompleted}
              onToggle={() => toggleTask(task.id, task.isCompleted)}
              onEdit={() => editTask(task.id, task.task)}
            />
          ))
        )}
      </View>
    </View>
  );
}
