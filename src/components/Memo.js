import styled from "styled-components/native";
import PropTypes from "prop-types";

import getDate from "../utils/getDate";

const MemoContainer = styled.TouchableOpacity`
  padding: 20px;
`;

const MemoContentText = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
`;

const MemoDateText = styled.Text`
  font-size: 12px;
  color: #727272;
`;

function Memo({ item, onOpenMemo }) {
  return (
    <MemoContainer onPress={() => onOpenMemo(item._id)}>
      <MemoContentText numberOfLines={3}>{item.content}</MemoContentText>
      <MemoDateText>{getDate(item.createdAt)}</MemoDateText>
    </MemoContainer>
  );
}

export default Memo;

Memo.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }),
  onOpenMemo: PropTypes.func.isRequired,
};
