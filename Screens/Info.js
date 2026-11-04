import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Info() {

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.title}>
                    <Ionicons name="information-circle-outline" size={24} /> Sobre o Projeto
                </Text>

                <Text style={styles.sectionTitle}>📋 Objetivo</Text>

                <Text style={styles.paragraph}>
                    Este aplicativo tem como objetivo gerenciar tarefas pessoais (To-Do List), permitindo adicionar,
                    editar e remover atividades com persistência de dados em nuvem.
                </Text>

                <Text style={styles.sectionTitle}>🚀 Funcionalidades</Text>
                <Text style={styles.paragraph}>• Adicionar tarefas</Text>
                <Text style={styles.paragraph}>• Editar tarefas existentes</Text>
                <Text style={styles.paragraph}>• Remover tarefas da lista</Text>
                <Text style={styles.paragraph}>• Feedback visual com Toasts e mensagens</Text>
                <Text style={styles.sectionTitle}>🧰 Tecnologias Utilizadas</Text>
                <Text style={styles.paragraph}>• React Native + Expo</Text>
                <Text style={styles.paragraph}>• Firebase Firestore (banco de dados em nuvem)</Text>
                <Text style={styles.paragraph}>• React Navigation</Text>
                <Text style={styles.paragraph}>• FlashMessage e Toast para notificações</Text>
                <Text style={styles.sectionTitle}>👨‍💻 Autor</Text>
                <Text style={styles.paragraph}>Desenvolvido por Sinaide Bezerra</Text>
                <Text style={styles.paragraph}>Versão: 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
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
    paragraph: {
        fontSize: 16,
        marginBottom: 5,
    },

});