import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.get('https://66f726ffb5d85f31a34220f7.mockapi.io/api/v1/users')
      .then(response => {
        const user = response.data.find(u => u.email === email && u.password === password);
        if (user) {
          navigation.navigate('Books', { userId: user.id });
        } else {
          Alert.alert('Error', 'Invalid credentials');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Unable to connect to server');
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 20 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 20 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;