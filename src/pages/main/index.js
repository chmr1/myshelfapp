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

export default class Main extends Component {

    static navigationOptions = {
      title: 'Minha Estante'
    };

    state = {
      data: [],
    };

    componentDidMount() {
      const { navigation } = this.props;
      const shelf = navigation.getParam('shelf', 'NO-ID');
      this.loadBooks(shelf);
    };

    loadBooks = async (shelf) => {      
      const response = await api.get(`/shelves/${shelf}`);
      const { data } = response.data;
      this.setState({ data });
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