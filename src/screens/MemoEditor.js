import { useCallback, useLayoutEffect, useState } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import HeaderIcon from "../components/HeaderIcon";

const Editor = styled.TextInput`
  flex: 1;
  padding: 20px;
  font-size: 18px;
  background-color: white;
`;

function MemoEditor({ navigation }) {
  const [inputText, setInputText] = useState("");

  const handleMarkDownButton = useCallback(() => {
    navigation.navigate("MarkdownPreview", { inputText });
  }, [inputText, navigation]);

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
      onChangeText={(text) => setInputText(text)}
    />
  );
}

export default MemoEditor;

MemoEditor.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
