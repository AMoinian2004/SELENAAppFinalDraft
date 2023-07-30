import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { WindowHeight, WindowWidth } from '../../globals/Dimensions';

const Login = ({ navigation }) => {
  const URI = 'https://myselena.org';
  const [user, setUser] = useState({
    username: 'SelenaContent',
    password: 'eattheredpizza',
  });

  const getToken = async () => {
    try {
      const response = await axios.post(`${URI}/wp-json/learnpress/v1/token`, user);
      const token = response.data.token;
      if (await validateToken(token) === 200) {
        navigation.navigate('Courses', { token, user, URI, validateToken });
      }
    } catch (error) {
      console.warn({ message: 'validation error', error });
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await axios.post(
        `${URI}/wp-json/learnpress/v1/token/validate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data.status;
    } catch (error) {
      return { error };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="User"
          value={user.username}
          onChangeText={(input) => setUser({ ...user, username: input })}
          style={styles.input}
          placeholderTextColor="#777" // Lighter placeholder color
        />
        <TextInput
          placeholder="Password"
          value={user.password}
          onChangeText={(input) => setUser({ ...user, password: input })}
          style={styles.input}
          placeholderTextColor="#777" // Lighter placeholder color
          secureTextEntry={true} // Hide the password input
        />

        <Pressable style={styles.submit} onPress={getToken}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
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
  formContainer: {
    borderRadius: 16,
    width: WindowWidth * 0.8,
    padding: 24, // Increased padding for better spacing
    backgroundColor: '#fff', // White background
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    fontSize: 18, // Reduced font size for better fit
    paddingVertical: 12, // Reduced padding for better fit
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: '#f5f5f5', // Light grayish background for the input
    color: '#000', // Black text color
    borderRadius: 8,
    marginBottom: 16, // Increased margin for better spacing
  },
  submit: {
    paddingVertical: 16, // Reduced padding for better fit
    backgroundColor: '#2196F3', // Blue background
    borderRadius: 8,
  },
  btnText: {
    fontSize: 18, // Reduced font size for better fit
    textAlign: 'center',
    color: '#fff', // White text color
    fontWeight: 'bold',
  },
});

export default Login;
