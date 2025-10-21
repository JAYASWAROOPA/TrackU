import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import ToDoBox from '../../components/toDoBox/ToDoBox';
import { styles } from './style';

const API_BASE =
  Platform.OS === 'android' ? "http://10.191.60.195:5000" : 'http://localhost:5000';

type Task = {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt?: string;
};

export default function ToDoList({ username, userId: propUserId }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const userId = propUserId ?? username ?? 'demo-user';

  // Fetch tasks from backend
  useEffect(() => {
    fetch(`${API_BASE}/api/todos/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const now = Date.now();
          setTasks(
            data
              .map(t => ({
                id: t._id,
                task: t.task,
                isCompleted: t.isCompleted,
                createdAt: t.createdAt, // get creation time from DB
              }))
              .filter(t => {
                // remove task if completed and created more than 1 minute ago
                if (t.isCompleted && t.createdAt) {
                  const diff = now - new Date(t.createdAt).getTime();
                  return diff < 24 * 60 * 60 * 1000; 
                }
                return true;
              }),
          );
        }
      })
      .catch(err => console.error(err));
  }, [userId]);

  // Add or update task
  const handleAddTask = async () => {
    if (!taskText.trim()) return;

    try {
      let response;
      if (editId) {
        // Update existing task
        response = await fetch(`${API_BASE}/api/todos/update/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task: taskText }),
        });
      } else {
        // Add new task
        response = await fetch(`${API_BASE}/api/todos/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: userId, task: taskText }),
        });
      }

      const result = await response.json();

      if (response.ok) {
        if (editId) {
          setTasks(prev =>
            prev.map(t => (t.id === editId ? { ...t, task: taskText } : t)),
          );
          setEditId(null);
        } else {
          setTasks(prev => [
            ...prev,
            {
              id: result._id,
              task: result.task,
              isCompleted: result.isCompleted,
              createdAt: result.createdAt,
            },
          ]);
        }
        setTaskText('');
      } else {
        Alert.alert('Error', result.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save task');
    }
  };

  // Toggle task completed status
  const toggleTask = async (id: string, isCompleted: boolean) => {
    try {
      const now = new Date();
      const body = isCompleted
        ? { isCompleted: false } // undo completion
        : { isCompleted: true }; // mark completed

      const response = await fetch(`${API_BASE}/api/todos/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setTasks(prev =>
          prev
            .map(t =>
              t.id === id
                ? {
                    ...t,
                    isCompleted: !isCompleted,
                  }
                : t,
            )
            .filter(t => {
              // remove task if completed and created more than 1 minute ago
              if (t.isCompleted && t.createdAt) {
                const diff = Date.now() - new Date(t.createdAt).getTime();
                return diff < 60 * 1000;
              }
              return true;
            }),
        );
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to update task');
    }
  };

  // Edit task
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
          <Text style={styles.addBtnText}>{editId ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {tasks.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
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
