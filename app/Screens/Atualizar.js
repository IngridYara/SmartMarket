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
    const [preco, setPreco] = useState(item?.preco || 0);
    const [quantidade, setQuantidade] = useState(item?.quantidade || 0);
    const [total, setTotal] = useState(item?.total || 0);
    const [totalCompra, setTotalCompra] = useState(0);
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

    useEffect(() => {

        setTotalCompra(quantidade * preco)

    },[quantidade, preco])

    const updateTodo = async () => {

        if (!produto || produto.length <= 0)
            return;

        try {

            const ref = doc(db, 'tarefas', idTodo);
            const total = parseFloat(preco) * parseFloat(quantidade);
            await updateDoc(ref, { produto, preco, quantidade, total });
            //setUpdatedData(true);
            showUpdateTodoToast();

            setProduto('');
            setQuantidade(0);
            setPreco(0);
            setTotalCompra(0)

            navigation.navigate('Lista')
            
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

                <View style={styles.containerTitle}>
                    <Text style={styles.logo}>SmartMarket</Text>
                    <Text style={styles.title}>Atualizar</Text>
                    <Text style={styles.totalCompra}>Total: R$ {totalCompra.toFixed(2)}</Text>
                </View>


                <View style={styles.containerInput}>
                    <Text style={styles.label}>Produto: </Text>
                    <TextInput
                        style={styles.textfield}
                        onChangeText={setProduto}
                        value={produto}
                       
                    />
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Preço: </Text>
                    <TextInput
                        style={styles.textfield}
                        onChangeText={setPreco}
                        value={preco}
                      
                    />
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Quantidade: </Text>
                    <TextInput
                        style={styles.textfield}
                        onChangeText={setQuantidade}
                        value={quantidade}
                       
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
    containerInput: {


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
    containerTitle:{

        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingLeft:25,
        paddingRight:25,
    },
    logo: {
        fontSize: 25,
        fontWeight: 'bold',
        color:'#6f82d7'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        padding: 10,
        marginTop: 20,
    },
    totalCompra:{

        fontSize: 30,
        fontWeight: 'bold',
        color:'#788eec',
    },
})