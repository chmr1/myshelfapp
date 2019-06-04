import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import api from '../../services/api';
import {
  ContainerIndex,
  BookContainer,
  BookTitle,
  BookDescription,
  Button,
  ButtonText,
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
      data: [],
      books: [],
      shelf: ''
    };

    componentDidMount() {
      const { navigation } = this.props;
      shelf = navigation.getParam('shelf', 'NO-ID');
      this.loadBooks(shelf);
    };

    loadBooks = async (shelf) => {      
      const response = await api.get(`/shelves/${shelf}`);
      const { data } = response.data;
      this.setState({ data });
    };

    handleBookListPress = () => {
      this.props.navigation.navigate('BookIndex', { shelf: shelf, books: [ 10, 12, 18, 4, 5, 9 ] });
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