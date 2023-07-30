
import { useState } from 'react';
import { StyleSheet,  View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './pages/Login';
import Courses from './pages/Courses';
import Lessons from './pages/Lessons';
import Lesson from './pages/Lesson';

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Courses' component={Courses}/>
            <Stack.Screen name='Lessons' component={Lessons}/>
            <Stack.Screen name='Lesson' component={Lesson}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
});
