import React, { Component } from 'react';
import { Text, FlatList, StyleSheet, AsyncStorage } from 'react-native';

import api from '../../services/api';

import {
  ContainerIndex,
  BookContainer,
  BookTitle,
  BookDescription
} from './styles';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default class Main extends Component {

    static navigationOptions = {
      title: 'Minha Estante'
    };

    state = {
      contador: 0,
      data: [],
      books: []
    };

    componentDidMount() {
      this.loadUser();
    };

    loadUser = async () => {
      const userToken = JSON.parse(await AsyncStorage.getItem('@MyShelfAppAPI:userToken'));
      this.loadBooks(userToken.data.shelves.id);
    }

    loadBooks = async (shelf) => {
      const response = await api.get(`/shelves/${shelf}`);
      const { data } = response.data;
      this.setState({ data });

      await AsyncStorage.setItem('@MyShelfAppAPI:books', JSON.stringify(data));
    };

    handleBookListPress = () => {
      this.props.navigation.navigate('BookIndex');
    };

    handleDeleteBookShelfPress = async (book) => {
      await api.delete(`/shelves/${shelf}`, { books: book.id });
      this.loadBooks(shelf);
    };

    renderItem = ({ item }) => (
      <BookContainer>
        <BookTitle>{item.title}</BookTitle>
        <BookDescription>{item.author}</BookDescription>
        <Menu>
          <MenuTrigger text='Select action' />
          <MenuOptions>
            <MenuOption onSelect={() => this.handleBookListPress() } ><Text style={{color: 'green'}}>Livraria</Text></MenuOption>
            <MenuOption><Text>--------------------------------------------</Text></MenuOption>
            <MenuOption onSelect={() => this.handleDeleteBookShelfPress(item) } ><Text style={{color: 'red'}}>Remover da Estante</Text></MenuOption>
          </MenuOptions>
        </Menu>
      </BookContainer>
    );

    render() {
        return(
          <ContainerIndex>
            <FlatList
              contentContainerStyle={indexStyles.list}
              data={this.state.data.books}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
            />
          </ContainerIndex>
        );
    }
}

const indexStyles = StyleSheet.create({

  list: {
    padding: 20
  },

});