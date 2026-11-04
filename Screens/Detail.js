import { useState, useEffect } from 'react';
import {
    View, TextInput, StyleSheet, Text, TouchableOpacity,
    Button
} from 'react-native';
import { db } from '../Database/Firebase';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, updateDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import { useUpdateData } from '../DataContext/index';
import { FontAwesome } from '@expo/vector-icons';

const Detail = ({ route }) => {

    const item = route?.params?.item;
    const [heading, setHeading] = useState(item?.heading || '');
    const [idTodo, setIdTodo] = useState(item?.id || '');
    //hook utilizado para atualizar os dados, quando necessário, na home

    const { updatedData, setUpdatedData } = useUpdateData();
    const navigation = useNavigation();
    const [msg, setMsg] = useState(idTodo);

    useEffect(() => {

        setHeading(item?.heading || '');
        setIdTodo(item?.id || '');
        setMsg(idTodo);
    }, [route]);

    const updateTodo = async () => {

        if (!heading || heading.length <= 0)
            return;

        try {

            const ref = doc(db, 'tarefas', idTodo);
            await updateDoc(ref, { heading });
            //setUpdatedData(true);
            showUpdateTodoToast();

        } catch (error) {
            setMsg('Erro ao salvar tarefa: ', error);
        }
    };

    const showUpdateTodoToast = () => {

        const checkmark =
            String.fromCodePoint(0x1F5D1);

        Toast.show({
            type: 'success',
            text1: `${checkmark} Item alterado!`,
            text2: 'Tarefa alterada com sucesso!',
            visibilityTime: 4000, // duração em ms
            autoHide: true,
            position: 'bottom'
        });
    };

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.textHeadingContainer}>
                    <Text style={styles.textHeading}>Alterar
                        tarefa</Text>
                </View>
                <View style={styles.textHeadingContainer}>
                    <Text style={styles.innerContainer}>Todo id:
                        {msg}</Text>
                </View>
                <TextInput
                    style={styles.textfield}
                    onChangeText={setHeading}
                    value={heading}
                    placeholder="Update tarefa"
                />
                <TouchableOpacity
                    style={styles.buttonUpdate}
                    onPress={updateTodo}>
                    <Text>UPDATE</Text>
                </TouchableOpacity>

                <Toast />
            </View>
        </SafeAreaView>
    );
};

export default Detail;

const styles = StyleSheet.create({

    container: {
        marginTop: 80,
        marginLeft: 15,
        marginRight: 15,
    },
    textfield: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: '#000000',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#0de065',
    },
    textHeadingContainer: {
        paddingVertical: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 24,
    },

    textHeadingContainer: {
        paddingVertical: 20,
        alignContent: 'center',
        alignItems: 'center',
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    todoIcon: {
        marginTop: 1,
        fontSize: 20,
        marginLeft: 34,
    },
})