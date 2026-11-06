import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
    doc, collection, getDocs, deleteDoc, addDoc,
    serverTimestamp, query,
    onSnapshot
} from 'firebase/firestore';
import Toast from 'react-native-toast-message';
//hook criado para controlar a carga de dados do Firebase
import { useUpdateData } from '../DataContext/index';
import { auth, db } from '../Database/Firebase';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

export default function Lista() {

    const [todos, setTodos] = useState([]);
    const [totalCompra, setTotalCompra] = useState(0);
    const { updatedData, setUpdatedData } = useUpdateData();
    const navigation = useNavigation();
    const collectionName = 'tarefas';
    const auth = getAuth();

    // buscar dados do firestore
    async function buscarTarefas() {

        try {

            const user = auth.currentUser
            const uid = user.uid

            const q = query(collection(db, "tarefas"))

            const resultado = onSnapshot(q, (querySnapshot) =>{

                const lista = [];

                querySnapshot.forEach((doc) => {

                    
                    if(doc.data().userId == uid)
                        lista.push({ id: doc.id, ...doc.data() 

                    });
                });

                setTodos(lista);
            })

        } catch (error) {
            console.error('Erro ao buscar dados: ', error);
        }
    }

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

    useEffect(() => {
        buscarTarefas();
        setUpdatedData

        //msgDadosCarregados();
    }, [updatedData]);

    useEffect(() => {
        const total = todos.reduce((acc, item) => parseFloat(acc) + parseFloat(item.total), 0);
        setTotalCompra(total);
    }, [todos]);

    return (

        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Total Compra: R$ {totalCompra.toFixed(2)}</Text>


            <FlatList
                style={styles.lista}
                data={todos}
                keyExtractor={(item) => item.id}
                numColumns={1}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            style={styles.fundo}
                            onPress={() => navigation.navigate('Atualizar',
                                { item })}>
                            <TouchableOpacity
                                onPress={() => deleteTodo(item)}
                                style={{ padding: 8 }}
                            >
                                <FontAwesome
                                    name="trash-o"
                                    color="red"
                                    style={styles.todoIcon}
                                />
                            </TouchableOpacity>

                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.produto} - {item.quantidade} - R$ {item.preco} - Total: R$ {item.total} - data: {item.data ? item.data.toDate().toLocaleString() : 'Sem data'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Toast />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    lista: {
        marginTop: 0,
    },
    todoIcon: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14,
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    fundo: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 0,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        padding: 10,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 5,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 5,
    },

});