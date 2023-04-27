import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import axios from "axios";
import { SERVER_URI } from "@env";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderIcon from "../components/HeaderIcon";
import getDecodeToken from "../utils/getDecodeToken";
import debounce from "../utils/debounce";
import { updateMemo } from "../redux/memoSlice";

const Editor = styled.TextInput`
  flex: 1;
  padding: 20px;
  font-size: 18px;
  background-color: white;
`;

function MemoEditor({ navigation, route }) {
  const dispatch = useDispatch();
  const { memoId } = route.params;
  const [inputText, setInputText] = useState("");

  const saveMemoContent = async (content) => {
    try {
      const userId = await getDecodeToken();

      const response = await axios.put(
        `${SERVER_URI}/api/users/${userId}/memos/${memoId}`,
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.data;
      const updatedMemo = data.memo;

      dispatch(updateMemo(updatedMemo));
    } catch (error) {
      console.log(error);
    }
  };

  const saveMemoDebounced = useMemo(() => debounce(saveMemoContent, 3000), []);

  const handleChangeText = useCallback(
    (text) => {
      setInputText(text);
      saveMemoDebounced(text);
    },
    [saveMemoDebounced]
  );

  const handleSaveMemo = useCallback(async () => {
    saveMemoDebounced.cancel();
    await saveMemoContent(inputText);
  }, [inputText, saveMemoContent]);

  const handleMarkDownButton = useCallback(() => {
    navigation.navigate("MarkdownPreview", { inputText });
  }, [inputText, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", handleSaveMemo);

    return () => {
      unsubscribe();
    };
  }, [navigation, handleSaveMemo]);

  useEffect(() => {
    const getMemoContent = async () => {
      try {
        const userId = await getDecodeToken();
        const token = await AsyncStorage.getItem("token");

        const response = await axios.get(
          `${SERVER_URI}/api/users/${userId}/memos/${memoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.data;
        const { memo } = data;

        setInputText(memo.content);
      } catch (error) {
        console.log(error);
      }
    };

    getMemoContent();
  }, [memoId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <HeaderIcon
            name="language-markdown-outline"
            onPress={handleMarkDownButton}
          />
          <HeaderIcon
            name="keyboard-close"
            onPress={() => Keyboard.dismiss()}
          />
        </>
      ),
    });
  }, [navigation, handleMarkDownButton]);

  return (
    <Editor
      autoFocus
      multiline
      keyboardType="default"
      onChangeText={handleChangeText}
      value={inputText}
    />
  );
}

export default MemoEditor;

MemoEditor.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      memoId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
