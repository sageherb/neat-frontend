import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
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
import { addMemo, appendMemos, setMemos } from "../redux/memoSlice";

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
  const dispatch = useDispatch();
  const memoList = useSelector((state) => state.memo.memos);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  const getMemos = async () => {
    try {
      if (!hasMore || loading) return;

      setLoading(true);

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

      if (memos.length < limit) {
        setHasMore(false);
      }

      if (offset === 0) {
        dispatch(setMemos(memos));
      } else {
        dispatch(appendMemos(memos));
      }

      setOffset((prev) => prev + limit);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
      const { memo } = data;

      dispatch(addMemo(memo));
      navigation.navigate("MemoEditor", { memoId: memo._id });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMemo = (memoId) => {
    navigation.navigate("MemoEditor", { memoId });
  };

  const handleDeleteMemo = async (memoId) => {
    try {
      const userId = await getDecodeToken();
      const token = await AsyncStorage.getItem("token");

      await axios.delete(`${SERVER_URI}/api/users/${userId}/memos/${memoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setMemos(memoList.filter((memo) => memo._id !== memoId)));
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderIcon name="sort" />,
    });
  }, [navigation]);

  useEffect(() => {
    getMemos();
  }, []);

  return (
    <Container>
      <FlatList
        data={memoList}
        renderItem={({ item }) => (
          <Memo
            item={item}
            onOpenMemo={handleOpenMemo}
            onDeleteMemo={handleDeleteMemo}
          />
        )}
        keyExtractor={(item) => item._id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Empty message="메모 없음" />}
        ItemSeparatorComponent={<Separator />}
        onEndReached={() => getMemos()}
        onEndReachedThreshold={0.8}
        extraData={memoList}
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
