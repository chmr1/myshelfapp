import React, { Component } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';

import api from '../../services/api';

import {
  ContainerIndex,
  BookContainer,
  BookTitle,
  BookDescription,
} from './styles';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default class BookIndex extends Component {

    static navigationOptions = {
      title: 'Livraria'
    };

    state = {
      data: [],
      books: [],
      shelf: ''
    };

    componentDidMount() {
      const { navigation } = this.props;
      books = navigation.getParam('books', []);
      shelf = navigation.getParam('shelf', '');
      this.loadBooks();
    };

    loadBooks = async () => {
      const response = await api.get('/books');
      const { data } = response.data;
      this.setState({ data });
    };

    handleBookListPress = () => {
      this.props.navigation.navigate('BookIndex');
    };

    handleAddBookShelfPress = async (book) => {
      books.push(book.id);
      await api.patch(`/shelves/${shelf}`, { books: books });
      this.props.navigation.navigate('Main', { shelf: shelf });
    };

    handleAddBookPress = () => {
      this.props.navigation.navigate('BookAdd');
    };

    handleEditBookPress = (book) => {
      //this.props.navigation.navigate('BookUpdate');
    };

    handleDetailPress = (book) => {
      //this.props.navigation.navigate('BookDetail');
    };

    handleDeleteBookPress = async (book) => {
      const response = await api.delete(`/books/${book.id}`);
      alert(response.data.message);
      this.loadBooks();
    };

    renderItem = ({ item }) => (
      <BookContainer>
        <BookTitle>{item.title}</BookTitle>
        <BookDescription>{item.author}</BookDescription>
        <Menu>
          <MenuTrigger text='Select action' />
          <MenuOptions>
            <MenuOption onSelect={() => this.handleAddBookShelfPress(item) } ><Text style={{color: 'blue'}}>Adicionar a Estante</Text></MenuOption>
            <MenuOption onSelect={() => this.handleAddBookPress() } ><Text style={{color: 'green'}}>Adicionar Novo Livro</Text></MenuOption>
            <MenuOption onSelect={() => this.handleEditBookPress(item) } ><Text style={{color: 'green'}}>Alterar Livro</Text></MenuOption>
            <MenuOption><Text>--------------------------------------------</Text></MenuOption>
            <MenuOption onSelect={() => this.handleDeleteBookPress(item) } ><Text style={{color: 'red'}}>Excluir</Text></MenuOption>
          </MenuOptions>
        </Menu>
      </BookContainer>
    );

    render() {
      return(
        <ContainerIndex>          
          <FlatList
            contentContainerStyle={indexStyles.list}
            data={this.state.data}
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