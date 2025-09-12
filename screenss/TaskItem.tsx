import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Task {
  id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
  return (
    <View style={styles.taskContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.taskText}>{task.text}</Text>
        {task.updatedAt ? (
          <Text style={styles.timestamp}>Last Edited: {task.updatedAt}</Text>
        ) : (
          <Text style={styles.timestamp}>Created At: {task.createdAt}</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => onEdit(task)} style={styles.iconButton}>
        <Icon name="pencil" size={20} color="#007bff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconButton}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  iconButton: {
    marginLeft: 12,
  },
});

export default TaskItem;
