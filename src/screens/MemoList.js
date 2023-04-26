import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import axios from "axios";
import { SERVER_URI } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Memo from "../components/Memo";
import HeaderIcon from "../components/HeaderIcon";
import Empty from "../components/Empty";
import Separator from "../components/Separator";
import getDecodeToken from "../utils/getDecodeToken";

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
  const [memoList, setMemoList] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const getMemos = async () => {
    try {
      const userId = await getDecodeToken();
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${SERVER_URI}/api/users/${userId}/memos?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data;
      const { memos } = data;

      setMemoList((prev) => [...prev, ...memos]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewMemoButton = async () => {
    try {
      const userId = await getDecodeToken();
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        `${SERVER_URI}/api/users/${userId}/memos`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data;
      const { memoId } = data;

      navigation.navigate("MemoEditor", { memoId });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMemo = (memoId) => {
    navigation.navigate("MemoEditor", { memoId });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderIcon name="sort" />,
    });
  }, [navigation]);

  useEffect(() => {
    getMemos();
  }, [offset]);

  return (
    <Container>
      <FlatList
        data={memoList}
        renderItem={({ item }) => (
          <Memo item={item} onOpenMemo={handleOpenMemo} />
        )}
        keyExtractor={(item) => item._id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Empty message="메모 없음" />}
        ItemSeparatorComponent={<Separator />}
        onEndReached={() => setOffset((prev) => prev + limit)}
        onEndReachedThreshold={0.5}
      />
      <NewMemoButton onPress={handleNewMemoButton}>
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
