import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import ToDoBox from '../../components/toDoBox/ToDoBox';
import { styles } from './style';

export default function ToDoList() {
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([]);
  const [taskText, setTaskText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddTask = () => {
    if (!taskText.trim()) return;

    if (editId) {
      setTasks(tasks.map(t => (t.id === editId ? { ...t, text: taskText } : t)));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: taskText, done: false }]);
    }
    setTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const editTask = (id: number, text: string) => {
    setTaskText(text);
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
              id={task.id}
              text={task.text}
              done={task.done}
              onToggle={() => toggleTask(task.id)}
              onEdit={() => editTask(task.id, task.text)}
            />
          ))
        )}
      </View>      
    </View>
  );
}
