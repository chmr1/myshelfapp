import styled from 'styled-components';

const ContainerIndex = styled.View`
  flex: 1;
  backgroundColor: #FAFAFA;
`;

const BookContainer = styled.View`
  backgroundColor: #FFF;
  borderWidth: 1;
  borderColor: #4682B4;
  borderRadius: 5px;
  padding: 20px;
  marginBottom: 20px;
`;

const BookTitle = styled.Text`
  fontSize: 18px;
  fontWeight: bold;
  color: #333;
`;

const BookDescription = styled.Text`
  fontSize: 16px;
  color: #999;
  marginTop: 5px;
  lineHeight: 24px;
`;

export {
  ContainerIndex,
  BookContainer,
  BookTitle,
  BookDescription,
};