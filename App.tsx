import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Button, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TaskList from './src/components/TaskList';
import { addTask, deleteTask, deleteAllTasks, getAllTasks, updateTask, TaskItem } from './src/utils/handle-api';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllTasks(setTasks, () => setLoading(false));
    const timeout = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timeout);
  }, []);

  const updateMode = (_id: string, text: string) => {
    setIsUpdating(true);
    setText(text);
    setTaskId(_id);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image source={require('./assets/image.png')} style={styles.logo} />
          <Text style={styles.header}>Tarefas</Text>

          <Text style={styles.counter}>{tasks.length} tarefa(s)</Text>

          <View style={styles.top}>
            <TextInput
              style={styles.input}
              placeholder="Adicione uma tarefa..."
              value={text}
              onChangeText={(val) => setText(val)}
              maxLength={100}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={
                isUpdating
                  ? () => updateTask(taskId, text, setTasks, setText, setIsUpdating)
                  : () => addTask(text, setText, setTasks)
              }
            >
              <Text style={styles.addButtonText}>
                {isUpdating ? "Atualizar" : "Adicionar"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.deleteAllContainer}>
            <Button
              title="Excluir todas as tarefas"
              color="blue"
              onPress={() => deleteAllTasks(tasks, setTasks)}
            />
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
              <Text style={styles.loadingText}></Text>
            </View>
          ) : (
            <TaskList
              tasks={tasks}
              updateMode={updateMode}
              deleteToDo={(id: string) => deleteTask(id, setTasks)}
            />
          )}
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 16,
    resizeMode: 'contain',
  },
  header: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counter: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 24,
    color: '#666',
  },
  top: {
    marginTop: 16,
    gap: 8,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 16,
  },
  deleteAllContainer: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    marginTop: 16,
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: '#999',
  },
});
