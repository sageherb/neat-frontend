import { FlatList } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useLayoutEffect } from "react";

import Memo from "../components/Memo";
import HeaderIcon from "../components/HeaderIcon";
import Empty from "../components/Empty";
import Separator from "../components/Separator";

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const NewMemoButton = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  bottom: 25px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #000000;
  justify-content: center;
  align-items: center;
`;

function MemoList({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderIcon name="sort" />,
    });
  }, [navigation]);

  return (
    <Container>
      <FlatList
        data={null}
        renderItem={({ item }) => <Memo item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Empty message="메모 없음" />}
        ItemSeparatorComponent={<Separator />}
      />
      <NewMemoButton onPress={() => navigation.navigate("MemoEditor")}>
        <MaterialCommunityIcons name="pencil" size={24} color="white" />
      </NewMemoButton>
    </Container>
  );
}

export default MemoList;

MemoList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};
