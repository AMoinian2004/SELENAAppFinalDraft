import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { WindowHeight, WindowWidth } from '../../globals/Dimensions';

const Lessons = ({ navigation, route }) => {
  const { id, user, URI, token } = route.params;
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const getLessons = async () => {
      try {
        const response = await axios.get(`${URI}/wp-json/learnpress/v1/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const lessonsResponse = response.data.sections[0].items;
        setLessons(lessonsResponse);
        console.log(lessonsResponse);
      } catch (error) {
        console.log(error);
      }
    };

    getLessons();
  }, []);

  const goToLesson = (lesson) => {
    navigation.navigate('Lesson', { lessonId: lesson.id, token, URI, user });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={({ item }) => (
          <Pressable onPress={() => goToLesson(item)} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
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
  card: {
    width: WindowWidth * 0.7,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#333', // Dark background for the card
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: '#fff', // White text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
});

export default Lessons;
