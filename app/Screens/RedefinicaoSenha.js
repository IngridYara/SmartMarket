import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail  } from 'firebase/auth';
import { app } from '../Database/Firebase';
import { useNavigation } from '@react-navigation/native';

export default function RedefinicaoSenha() {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const auth = getAuth(app);

    async function handleRedefinirSenha() {

        if (!email) {
            alert('Preencha o campo de e-mail');
            return;
        }

        try {

            await sendPasswordResetEmail(auth, email);
            alert("Email de redefinição enviado!");
            navigation.navigate('Login');

        } catch (error) {
            console.log("Erro ao enviar email:", error.message);
            alert("Erro ao enviar email de redefinição.");
        }
    }

    return (

        <ScrollView contentContainerStyle={styles.scrollContent}>

            <Text style={styles.title}>Redefinir Senha</Text>

            <View style={styles.formContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="none"
                    onChangeText={(email) => setEmail(email)}
                />

                <TouchableOpacity style={styles.button}
                    onPress={handleRedefinirSenha}>
                    <Text style={styles.buttonText}>Enviar e-mail</Text>
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
        fontSize: 22,
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
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 5,
        color: '#788eec',
        marginTop: 30,
    }
});