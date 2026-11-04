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

const Atualizar = ({ route }) => {

    const item = route?.params?.item;
    const [produto, setProduto] = useState(item?.produto || '');
    const [preco, setPreco] = useState(item?.preco || '');
    const [quantidade, setQuantidade] = useState(item?.quantidade || '');
    const [total, setTotal] = useState(item?.total || '');
    const [idTodo, setIdTodo] = useState(item?.id || '');
    //hook utilizado para atualizar os dados, quando necessário, na home

    const { updatedData, setUpdatedData } = useUpdateData();
    const navigation = useNavigation();
    const [msg, setMsg] = useState(idTodo);

    useEffect(() => {

        setProduto(item?.produto || '');
        setPreco(item?.preco || '');
        setQuantidade(item?.quantidade || '');
        setTotal(item?.total || '');
        setIdTodo(item?.id || '');
        setMsg(idTodo);
    }, [route]);

    const updateTodo = async () => {

        if (!produto || produto.length <= 0)
            return;

        try {

            const ref = doc(db, 'tarefas', idTodo);
            const total = parseFloat(preco) * parseFloat(quantidade);
            await updateDoc(ref, { produto, preco, quantidade, total });
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
                        tarefa
                    </Text>
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Produto: </Text>
                    <TextInput
                        style={styles.textfield}
                        onChangeText={setProduto}
                        value={produto}
                        placeholder="Update tarefa"
                    />
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Preço: </Text>
                    <TextInput
                    style={styles.textfield}
                    onChangeText={setPreco}
                    value={preco}
                    placeholder="Update preço"
                />
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Quantidade: </Text>
                    <TextInput
                        style={styles.textfield}
                        onChangeText={setQuantidade}
                        value={quantidade}
                        placeholder="Update quantidade"
                    />
                </View> 

                <TouchableOpacity
                    style={styles.buttonUpdate}
                    onPress={updateTodo}>
                    <Text style={styles.buttonText}>Atualizar</Text>
                </TouchableOpacity>

                <Toast />
            </View>
        </SafeAreaView>
    );
};

export default Atualizar;

const styles = StyleSheet.create({

    container: {
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
    },
    textfield: {
        marginBottom: 20,
        marginTop: 10,
        padding: 15,
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
        backgroundColor: '#788eec',
        
    },
    buttonText: {

        fontSize: 20,
        color: 'white',
    },
    textHeadingContainer: {
        
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        
    },
    containerInput:{

        
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    todoIcon: {
        marginTop: 1,
        fontSize: 20,
        marginLeft: 34,
    },
})