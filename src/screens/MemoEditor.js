import { useLayoutEffect } from "react";
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <HeaderIcon name="language-markdown-outline" />
          <HeaderIcon name="keyboard-close" />
        </>
      ),
    });
  }, [navigation]);

  return <Editor autoFocus multiline keyboardType="default" />;
}

export default MemoEditor;

MemoEditor.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
