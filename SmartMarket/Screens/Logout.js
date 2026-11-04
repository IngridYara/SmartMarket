import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './../Database/Firebase';

export default function Logout() {

    function handleLogin() {

        const auth = getAuth(app);

        signOut(auth).then(() => {

            console.log('Logout realizado com sucesso!');

            setTimeout(() => {
                navigation.navigate('Login');
            }, 1000);
            
        }).catch((error) => {

            console.log('Erro ao realizar logout: ', error.message);
            alert('Erro ao realizar logout. Verifique suas credenciais.');
           
        });
    }

    return (

        <ScrollView contentContainerStyle={styles.scrollContent}>

            <Text style={styles.title}>Volte Sempre!</Text>

            <View style={styles.formContainer}>

                <TouchableOpacity style={styles.button}
                    onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sair</Text>
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
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 5,
        color: '#788eec',
        marginTop: 30,
    }
});