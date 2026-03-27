import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

interface TaskItem {
    _id: string;
    text: string;
}

interface TaskListProps {
    tasks: TaskItem[];
    updateMode: (id: string, text: string) => void;
    deleteToDo: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    updateMode,
    deleteToDo,
}) => {

    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <TaskItem
                    text={item.text}
                    updateMode={() => updateMode(item._id, item.text)}
                    deleteToDo={() => deleteToDo(item._id)}
                />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingBottom: 32,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
        fontWeight: '600',
    },
    emptySubText: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
    },
});

export default TaskList;
