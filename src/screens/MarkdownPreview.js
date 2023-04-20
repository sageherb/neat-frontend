import styled from "styled-components/native";
import PropTypes from "prop-types";

const DefaultText = styled.Text`
  flex: 1;
  padding: 20px;
  background-color: white;
  font-size: 18px;
`;

function MarkdownPreview({ navigation, route }) {
  return <DefaultText>{route.params.inputText}</DefaultText>;
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
