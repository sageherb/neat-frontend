import { TouchableOpacity, Linking } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import parseMarkdown from "../utils/parseMarkdown";
import {
  PlainText,
  HorizontalLine,
  Header1,
  LineView,
  UncheckedText,
  CheckedText,
  UnorderedListIcon,
  UnorderedListText,
  BoldText,
  InlineCode,
  LinkText,
} from "./MarkdownStyles";
import { MARKDOWN_OPTION } from "../utils/constants";

const renderInlineElement = (element, index) => {
  if (element.type === MARKDOWN_OPTION.BOLD) {
    return (
      <BoldText key={`${element.type}-${index}`}>{element.content}</BoldText>
    );
  }

  if (element.type === MARKDOWN_OPTION.INLINE_CODE) {
    return (
      <InlineCode key={`${element.type}-${index}`}>
        {element.content}
      </InlineCode>
    );
  }

  if (element.type === MARKDOWN_OPTION.LINK) {
    return (
      <TouchableOpacity
        key={`${element.type}-${index}`}
        onPress={() => Linking.openURL(element.href)}
      >
        <LinkText>{element.content}</LinkText>
      </TouchableOpacity>
    );
  }

  if (element.type === MARKDOWN_OPTION.PLAIN_TEXT || !element.type) {
    return element.content;
  }
};

const renderElement = (element, index) => {
  if (element.type === MARKDOWN_OPTION.HORIZONTAL_LINE) {
    return <HorizontalLine key={`${element.type}-${index}`} />;
  }

  if (element.type === MARKDOWN_OPTION.HEADER1) {
    return (
      <LineView key={`${element.type}-${index}`}>
        <Header1>{element.content}</Header1>
      </LineView>
    );
  }

  if (element.type === MARKDOWN_OPTION.CHECKBOX && element.checked === false) {
    return (
      <LineView key={`${element.type}-Unchecked-${index}`}>
        <MaterialCommunityIcons name="checkbox-blank-outline" size={24} />
        <UncheckedText>
          <PlainText>{element.content.map(renderInlineElement)}</PlainText>
        </UncheckedText>
      </LineView>
    );
  }

  if (element.type === MARKDOWN_OPTION.CHECKBOX && element.checked === true) {
    return (
      <LineView key={`${element.type}-Checked-${index}`}>
        <MaterialCommunityIcons name="checkbox-intermediate" size={24} />
        <CheckedText>
          <PlainText>{element.content.map(renderInlineElement)}</PlainText>
        </CheckedText>
      </LineView>
    );
  }

  if (element.type === MARKDOWN_OPTION.UNORDERED_LIST) {
    return (
      <LineView key={`${element.type}-${index}`}>
        <UnorderedListIcon />
        <UnorderedListText>
          <PlainText>{element.content.map(renderInlineElement)}</PlainText>
        </UnorderedListText>
      </LineView>
    );
  }

  if (element.type === MARKDOWN_OPTION.PLAIN_TEXT) {
    return (
      <LineView key={`${element.type}-${index}`}>
        <PlainText>{element.content.map(renderInlineElement)}</PlainText>
      </LineView>
    );
  }
};

function Markdown({ inputText }) {
  const parsedElements = parseMarkdown(inputText);

  return <>{parsedElements.map(renderElement)}</>;
}

export default Markdown;

Markdown.propTypes = {
  inputText: PropTypes.string.isRequired,
};
