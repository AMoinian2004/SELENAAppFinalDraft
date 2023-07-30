import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';

const Lesson = ({ navigation, route }) => {
  const { lessonId, token, URI, user } = route.params;
  const [lesson, setLesson] = useState({});
  const [pdfLink, setPdfLink] = useState('');

  useEffect(() => {
    const extractDownloadLink = (content) => {
      const start = content.indexOf('href=') + 6;
      const end = content.indexOf('download><') - 2;
      const string = content.substring(start, end);

      return content.substring(start, end);
    };

    const getLesson = async () => {
      try {
        const response = await axios.get(`${URI}/wp-json/learnpress/v1/lessons/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPdfLink(extractDownloadLink(response.data.content));
        setLesson(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLesson();
  }, []);

  const getPdf = async () => {
    await WebBrowser.openBrowserAsync(pdfLink);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.lessonId}>{lessonId}</Text>
      <Text style={styles.lessonName}>{lesson.name}</Text>
      <Pressable style={styles.button} onPress={getPdf}>
        <Text style={styles.buttonText}>Download PDF</Text>
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
  lessonId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lessonName: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Lesson;
