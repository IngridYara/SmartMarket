import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { app } from '../Database/Firebase';
import { useNavigation } from '@react-navigation/native';
import Routes from '../Routes/index';

export default function CriarConta() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const auth = getAuth(app);
    const navigation = useNavigation();

    function handleCadastro() {

        if (!email || !password || !password2) {
            alert('Preencha todos os campos');
            return;
        }

        if (password2 != password) {
            alert('As senhas devem ser iguais');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
          
                const user = userCredential.user;

                setTimeout(() => {
                    navigation.navigate('Routes');
                }, 1000);
                
            })
            .catch((error) => {
                console.log('Erro ao realizar Cadastro: ', error.message);
                alert('Erro ao realizar Cadastro. Verifique suas credenciais.');
              
            });

    }

    return (

        <ScrollView contentContainerStyle={styles.scrollContent}>

            <Text style={styles.title}>Cadastro</Text>

            <View style={styles.formContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="none"
                    onChangeText={(email) => setEmail(email)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(password2) => setPassword2(password2)}
                />

                <TouchableOpacity style={styles.button}
                    onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 5,
    },
    formContainer: {
        flexDirection: 'column',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,

        alignItems: 'center',
    },
    input: {
        height: 80,
        borderRadius: 5,
        borderColor: '#788eec',
        borderWidth: 1,
        overflow: 'hidden',
        padding: 15,
        flex: 1,
        marginRight: 5,
        marginBottom: 10,
        width: '100%',
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    buttonSenha: {

        height: 47,
        borderRadius: 5,
        borderColor: '#788eec',
        borderWidth: 2,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingVertical: 30
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 5,
        color: '#788eec',
        marginTop: 30,
    }
});