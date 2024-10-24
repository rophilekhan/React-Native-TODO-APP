import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState(['']);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addTodo = () => {
    if (input.trim()) {
      setTodo([...todo, input.trim()]);
      setInput('');
    }
  };

  const deleteTodo = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const editTodo = () => {
    if (updateInput.trim()) {
      const newTodos = [...todo];
      newTodos[editIndex] = updateInput.trim();
      setTodo(newTodos);
      setModalVisible(false);
      setUpdateInput('');
    }
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setUpdateInput(todo[index]);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>MY TODO LIST</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInput}
          value={input}
          placeholder="Add a new task"
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {todo.length > 0 ? (
        <FlatList
          style={styles.list}
          data={todo}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.itemButtons}>
                <TouchableOpacity onPress={() => openEditModal(index)}>
                  <Ionicons name="create-outline" size={24} color="#4A90E2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(index)}>
                  <Ionicons name="trash-outline" size={24} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Task</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={setUpdateInput}
              value={updateInput}
              placeholder="Update your task"
            />
            <TouchableOpacity style={styles.modalButton} onPress={editTodo}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
   },
   
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  list: {
    flex: 1,
    marginHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  itemText: {
    fontSize: 16,
  },
  itemButtons: {
    flexDirection: 'row',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  modalButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default Home;