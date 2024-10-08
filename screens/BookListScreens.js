import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, Alert } from 'react-native';
import axios from 'axios';

const BookListScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://66f726ffb5d85f31a34220f7.mockapi.io/api/v1/books')
      .then(response => {
        // Filtra los libros para el usuario actual
        const userBooks = response.data.find(user => user.userId === userId);
        if (userBooks && userBooks.listBooks) {
          setBooks(userBooks.listBooks);
        } else {
          Alert.alert('Error', 'No books found for this user');
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', 'Unable to load books');
      });
  }, [userId]);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={books}
        keyExtractor={book => book.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            {item.image && <Image source={{ uri: item.image }} style={{ width: 100, height: 150 }} />}
            <Text>Title: {item.title}</Text>
            <Text>Author: {item.author}</Text>
            <Text>Year: {item.year}</Text>
            <Text>Description: {item.description}</Text>
          </View>
        )}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default BookListScreen;