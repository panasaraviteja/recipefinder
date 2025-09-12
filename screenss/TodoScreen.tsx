import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

const TodoScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    if (input.trim() === '') return;

    if (editTask) {
      setTasks(tasks.map(task =>
        task.id === editTask.id
          ? { ...task, text: input, updatedAt: new Date().toLocaleString() }
          : task
      ));
      setEditTask(null);
    } else {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: input, createdAt: new Date().toLocaleString() }
      ]);
    }
    setInput('');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setInput(task.text);
    setEditTask(task);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={input}
        onChangeText={setInput}
      />
      <Button title={editTask ? "Update Task" : "Add Task"} onPress={handleAddTask} />
      
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
});

export default TodoScreen;
