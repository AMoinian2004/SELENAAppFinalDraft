import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { WindowHeight, WindowWidth } from '../../globals/Dimensions';

const Courses = ({ route, navigation }) => {
  const { token, URI, user } = route.params;
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const coursesResponse = (await axios.get(`${URI}/wp-json/learnpress/v1/courses`, {
          params: {
            page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })).data;
        setCourses(coursesResponse);
        console.log(coursesResponse);
      } catch (error) {
        console.log(error);
      }
    };

    getCourses();
  }, [page]);

  const getLessons = async (course) => {
    try {
      const id = course.id;
      navigation.navigate('Enroll', { id, URI, token, user });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <Pressable onPress={() => getLessons(item)} style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttons}>
        <Text style={styles.button} onPress={() => setPage(page === 1 ? page : page - 1)}>
          -
        </Text>
        <Text style={styles.button} onPress={() => setPage(page + 1)}>
          +
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light grayish background
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
    shadowOpacity: 0.2,
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    padding: 10,
    backgroundColor: '#333', // Dark background for the buttons
    borderRadius: 16,
    marginBottom: 16, // Increased margin for better spacing
  },
  button: {
    fontSize: 30, // Reduce the font size to 30
    fontWeight: 'normal', // Use normal font weight instead of bold
    color: '#fff', // White text color for the button
  },
});

export default Courses;
