import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { SERVER_URI } from "@env";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderIcon from "../components/HeaderIcon";
import getDecodeToken from "../utils/getDecodeToken";
import debounce from "../utils/debounce";

const Editor = styled.TextInput`
  flex: 1;
  padding: 20px;
  font-size: 18px;
  background-color: white;
`;

function MemoEditor({ navigation, route }) {
  const [inputText, setInputText] = useState("");
  const { memoId } = route.params;

  const saveMemoContent = async (content) => {
    try {
      if (content.trim() === "") return;

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
      const { memo } = data;

      return memo;
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

  const handleMarkDownButton = useCallback(() => {
    navigation.navigate("MarkdownPreview", { inputText });
  }, [inputText, navigation]);

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

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async () => {
      if (inputText.trim() !== "") {
        const updatedMemo = await saveMemoContent(inputText);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, inputText, saveMemoContent]);

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
