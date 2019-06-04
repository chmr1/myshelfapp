import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';

import api from '../../services/api';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  ContainerAdd,
  SuccessMessage,
  Input,
  ErrorMessage,
  Logo,
  Button,
  ButtonText,
  MainLink,
  MainLinkText,
} from './styles';

export default class BookAdd extends Component {
  static navigationOptions = {
    title: 'Cadastrar Livro',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    isbn: '123456789123',
    title: 'Teste',
    subtitle: 'Mais um teste de cadastro',
    volume: '1',
    number_page: '50',
    author: 'Carlos Henrique',
    publishing_company: 'Editora Moderna',
    error: '',
    success: '',
  };

  handleIsbnChange = (isbn) => {
    this.setState({ isbn });
  };

  handleTitleChange = (title) => {
    this.setState({ title });
  };

  handleSubTitleChange = (subtitle) => {
    this.setState({ subtitle });
  };

  handleVolumeChange = (volume) => {
    this.setState({ volume });
  };

  handleNumberPageChange = (number_page) => {
    this.setState({ number_page });
  };

  handleAuthorChange = (author) => {
    this.setState({ author });
  };

  handlePublishingCompanyChange = (publishing_company) => {
    this.setState({ publishing_company });
  };

  handleBackToMainPress = () => {
    this.props.navigation.goBack();
  };

  handleSavePress = async () => {
    if (this.state.isbn.length === 0 || this.state.title.length === 0 || this.state.volume.length === 0 || this.state.number_page.length === 0 || this.state.author.length === 0 || this.state.publishing_company.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        await api.post('/books', {
          isbn: this.state.isbn,
          title: this.state.title,
          subtitle: this.state.subtitle,
          volume: this.state.volume,
          number_page: this.state.number_page,
          author: this.state.author,
          publishing_company: this.state.publishing_company,
        });

        this.setState({ success: 'Livro cadastrado com sucesso! Redirecionando para sua estante', error: '' });

        setTimeout(this.goToMain, 2500);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
    }
  };

  goToMain = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <ContainerAdd>
        <StatusBar hidden />
        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
        <Logo source={require('../../images/mybook.png')} resizeMode="contain" />
        <Input
          placeholder="ISBN"
          value={this.state.isbn}
          onChangeText={this.handleIsbnChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Título"
          value={this.state.title}
          onChangeText={this.handleTitleChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="SubTítulo"
          value={this.state.subtitle}
          onChangeText={this.handleSubTitleChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Volume"
          value={this.state.volume}
          onChangeText={this.handleVolumeChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Número de Páginas"
          value={this.state.number_page}
          onChangeText={this.handleNumberPageChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Autor"
          value={this.state.author}
          onChangeText={this.handleAuthorChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Editora"
          value={this.state.publishing_company}
          onChangeText={this.handlePublishingCompanyChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button onPress={this.handleSavePress}>
          <ButtonText>Salvar</ButtonText>
        </Button>
        <MainLink onPress={this.handleBackToMainPress}>
          <MainLinkText>Voltar</MainLinkText>
        </MainLink>
      </ContainerAdd>
    );
  }
}