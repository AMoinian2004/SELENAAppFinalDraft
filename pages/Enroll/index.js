import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Enroll = ({ route, navigation }) => {
  const { id, URI, token, user } = route.params;

  const enrollCourse = async () => {
    try {
      const URL = `${URI}/wp-json/learnpress/v1/courses/enroll`;

      const response = await axios.post(URL, { id: id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert(`${response.data.status}`, `${response.data.message}`, [
        { text: 'Continue', onPress: () => navigation.navigate('Lessons', { id, URI, token, user }) },
      ]);

    } catch (error) {
    
      console.error(error);
      Alert.alert('Error', 'An error occurred while enrolling in the course. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do you want to enroll in this course?</Text>
      <Pressable onPress={enrollCourse} style={styles.button}>
        <Text style={styles.buttonText}>Enroll</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff', 
    },
    title: {
      fontSize: 20,
      color: '#333', 
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      backgroundColor: '#2196F3', 
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 18, 
      textAlign: 'center',
      color: '#fff', 
    },
  });

export default Enroll;
