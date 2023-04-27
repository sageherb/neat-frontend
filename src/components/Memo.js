import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

const SwipeContainer = styled.TouchableOpacity`
  background-color: #d72030;
  justify-content: center;
  align-items: center;
  padding: 0 33px;
`;

function Memo({ item, onOpenMemo, onDeleteMemo }) {
  const rightSwipe = () => {
    return (
      <SwipeContainer onPress={() => onDeleteMemo(item._id)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={33}
          color="white"
        />
      </SwipeContainer>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <MemoContainer onPress={() => onOpenMemo(item._id)}>
        <MemoContentText numberOfLines={3}>{item.content}</MemoContentText>
        <MemoDateText>{getDate(item.createdAt)}</MemoDateText>
      </MemoContainer>
    </Swipeable>
  );
}

export default React.memo(Memo);

Memo.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }),
  onOpenMemo: PropTypes.func.isRequired,
  onDeleteMemo: PropTypes.func.isRequired,
};
