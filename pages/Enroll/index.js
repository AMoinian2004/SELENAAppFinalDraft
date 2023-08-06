import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Enroll = ({ route, navigation }) => {
  const { id, URI, token, user } = route.params;

  const enrollCourse = async () => {
    try {
      // URL of the API endpoint for enrollment. Adjust it as needed.
      const URL = `${URI}/wp-json/learnpress/v1/courses/enroll`;

      // POST request to enroll in the course.
      const response = await axios.post(URL, { id: id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response (e.g., success or failure message).
      Alert.alert(`${response.data.status}`, `${response.data.message}`, [
        { text: 'Continue', onPress: () => navigation.navigate('Lessons', { id, URI, token, user }) },
      ]);

    } catch (error) {
      // Handle any errors that occur during the enrollment process.
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
      backgroundColor: '#fff', // White background
    },
    title: {
      fontSize: 20,
      color: '#333', // Dark text color
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      backgroundColor: '#2196F3', // Blue background
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 18, // Font size
      textAlign: 'center',
      color: '#fff', // White text color
    },
  });

export default Enroll;
