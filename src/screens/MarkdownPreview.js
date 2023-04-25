import styled from "styled-components/native";
import PropTypes from "prop-types";

import Markdown from "../components/Markdown";

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  background-color: white;
`;

const StyledScrollView = styled.ScrollView`
  padding: 20px;
`;

function MarkdownPreview({ navigation, route }) {
  const { inputText } = route.params;

  return (
    <Container>
      <StyledScrollView>
        <Markdown inputText={inputText} />
      </StyledScrollView>
    </Container>
  );
}

export default MarkdownPreview;

MarkdownPreview.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      inputText: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
