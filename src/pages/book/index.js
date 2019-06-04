import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import api from '../../services/api';

import {
  ContainerIndex,
  BookContainer,
  BookTitle,
  BookDescription,
  Button,
  ButtonText,
} from './styles';

export default class BookIndex extends Component {

    static navigationOptions = {
      title: 'Livraria'
    };

    state = {
      data: [],
    };

    componentDidMount() {
      this.loadBooks();
    }

    loadBooks = async () => {
      const response = await api.get('/books');
      const { data } = response.data;
      this.setState({ data });
    };

    handleDetailPress = () => {
      this.props.navigation.navigate('Book');
    };

    handleAddBookPress = () => {
      this.props.navigation.navigate('BookAdd');
    };

    handleAddBookListPress = () => {
      this.props.navigation.navigate('BookIndex');
    };

    renderItem = ({ item }) => (
      <BookContainer>
        <BookTitle>{item.title}</BookTitle>
        <BookDescription>{item.author}</BookDescription>
        <Button>
          <ButtonText>Adicionar a Estante</ButtonText>
        </Button>
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