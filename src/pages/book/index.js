import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

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
    };

    componentDidMount() {
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

    handleAddBookShelfPress = () => {
      alert(`Save`);
      //this.props.navigation.navigate('Main', { shelf: 3 });
    };

    handleAddBookPress = () => {
      this.props.navigation.navigate('BookAdd');
    };

    handleEditBookPress = () => {
      this.props.navigation.navigate('BookUpdate');
    };

    handleDetailPress = () => {
      this.props.navigation.navigate('BookDetail');
    };

    handleDeleteBookPress = () => {
      alert(`Delete`);
    };

    renderItem = ({ item }) => (
      <BookContainer>
        <BookTitle>{item.title}</BookTitle>
        <BookDescription>{item.author}</BookDescription>
        <Menu>
          <MenuTrigger text='Select action' />
          <MenuOptions>
            <MenuOption onSelect={() => this.handleAddBookShelfPress() } ><Text style={{color: 'blue'}}>Adicionar a Estante</Text></MenuOption>
            <MenuOption onSelect={() => this.handleAddBookPress() } ><Text style={{color: 'green'}}>Adicionar Novo Livro</Text></MenuOption>
            <MenuOption onSelect={() => this.handleEditBookPress() } ><Text style={{color: 'green'}}>Alterar Livro</Text></MenuOption>
            <MenuOption onSelect={() => this.handleDeleteBookPress() } ><Text style={{color: 'red'}}>Excluir</Text></MenuOption>
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