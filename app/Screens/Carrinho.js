import React, { useState, useCallback, useEffect } from 'react';
import {
    View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Button
} from 'react-native';
import { db } from '../Database/Firebase';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

//https://firebase.google.com/docs/firestore/quickstart#web_8
import {
    doc, collection, getDocs, deleteDoc, addDoc,
    serverTimestamp
} from 'firebase/firestore';

{/* bibliotecas usadas para notificações*/ }
import Toast from 'react-native-toast-message';
import FlashMessage, { showMessage } from 'react-native-flash-message';

//hook criado para controlar a carga de dados do Firebase
import { useUpdateData } from '../DataContext/index';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Login from './Login';

const Carrinho = () => {

    const [todos, setTodos] = useState([]);
    const [quantidade, setQuantidade] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [preco, setPreco] = useState('');
    const [totalCompra, setTotalCompra] = useState(0);
    const navigation = useNavigation();
    const collectionName = 'tarefas';
    const { updatedData, setUpdatedData } = useUpdateData();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const auth = getAuth();

    // buscar dados do firestore
    async function buscarTarefas() {

        try {

            //https://firebase.google.com/docs/firestore/quickstart#web_8
            const querySnapshot = await getDocs(collection(db, collectionName));
            const lista = [];

            querySnapshot.forEach((doc) => {
                lista.push({ id: doc.id, ...doc.data() });
            });

            setTodos(lista);

        } catch (error) {
            console.error('Erro ao buscar dados: ', error);
        }
    }

    useEffect(() => {
        buscarTarefas();
        setUpdatedData

        //msgDadosCarregados();
    }, [updatedData]);

    useEffect(() => {
        const total = todos.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0);
        setTotalCompra(total);
    }, [todos]);

    // apaga uma tarefa do db
    const deleteTodo = async (todo) => {
        try {
            await deleteDoc(doc(db, collectionName, todo.id));
            buscarTarefas();
            showDeleteTodoToast();
        } catch (error) {
            console.error('Erro ao deletar: ', error);
        }
    }

    // adiciona uma tarefa
    const addTodo = async () => {

        // verifica se existe alguma tarefa.
        if (!nomeProduto || nomeProduto.length <= 0) {

            msgSemAtividade();
            return;
        }

        try {

            // obtem uma timestamp
            const timestamp = serverTimestamp();

            await addDoc(collection(db, collectionName), {

                data: timestamp,
                produto: nomeProduto,
                quantidade: quantidade,
                preco: preco,
                total: (parseFloat(quantidade) * parseFloat(preco)).toFixed(2)
            });

            Keyboard.dismiss();
            showAddTodoToast();
            buscarTarefas();
        }
        catch (error) {
            //setMsg('Erro ao salvar usuário: ', error);
        }
    }

    const showAddTodoToast = () => {

        const checkmark = String.fromCharCode(0x2705);

        Toast.show({
            type: 'success',
            text1: `${checkmark} Tudo certo!`,
            text2: 'Tarefa adicionado com sucesso! 👋',
            visibilityTime: 4000, // duração em ms
            autoHide: true,
            position: 'bottom'
        });
    };

    const showDeleteTodoToast = () => {

        const checkmark = String.fromCodePoint(0x1F5D1);
        Toast.show({
            type: 'success',
            text1: `${checkmark} Item apagado!`,
            text2: 'Tarefa apagada com sucesso!',
            visibilityTime: 4000, // duração em ms
            autoHide: true,
            position: 'bottom'
        });
    }

    const msgSemAtividade = () => {

        showMessage({
            message: 'Operação concluída',
            description: 'Nada a fazer... 😌',
            type: 'info', // info | warning | danger | success
            icon: 'info',
            duration: 4000,
        });
    };

    const msgDadosCarregados = () => {
        showMessage({
            message: 'Operação concluída',
            description: 'Dados Carregados!',
            type: 'warning', // info | warning | danger | success
            icon: 'warning',
            duration: 4000,
        });
    };

    return (


        <SafeAreaView style={{ flex: 1 }}>
            <FlashMessage position="top" />
            <View style={styles.textHeadingContainer}>
                <Text style={styles.textHeading}>SmartMarket</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Produto"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(nomeProduto) => setNomeProduto(nomeProduto)}
                    value={nomeProduto}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantidade"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(quantidade) => setQuantidade(quantidade)}
                    value={quantidade}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Preço Unitário"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(preco) => setPreco(preco)}
                    value={preco}
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button}
                    onPress={addTodo}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textHeadingContainer: {
        paddingVertical: 20,
        alignContent: 'center',
        alignItems: 'center',

    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 45,
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 22,
    },
    formContainer: {
        flexDirection: 'column',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
        alignItems: 'center',
        height: 250,
    },
    input: {
        height: 48,
        borderRadius: 5,
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
        marginBottom: 15,
        padding: 15,
        width: '100%',
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    todoIcon: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14,
    },
    paragraph: {
        fontSize: 26,
        marginTop: 25,
        marginBottom: 20,
        height: 80,
        fontWeight: 'bold',
    },
    lista: {
        marginTop: 85,
    }
})

export default Carrinho;