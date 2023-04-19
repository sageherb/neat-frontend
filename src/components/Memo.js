import styled from "styled-components/native";
import PropTypes from "prop-types";

const MemoContainer = styled.TouchableOpacity`
  padding: 20px;
`;

const MemoTitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const MemoContentText = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
`;

const MemoDateText = styled.Text`
  font-size: 12px;
  color: #a9a9a9;
`;

function Memo({ item }) {
  return (
    <MemoContainer>
      <MemoTitleText>{item.title}</MemoTitleText>
      <MemoContentText>{item.content}</MemoContentText>
      <MemoDateText>{item.updatedAt}</MemoDateText>
    </MemoContainer>
  );
}

export default Memo;

Memo.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};
