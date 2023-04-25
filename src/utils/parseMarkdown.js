import { MARKDOWN_OPTION } from "./constants";

const parseInline = (text) => {
  const result = [];
  let position = 0;

  while (position < text.length) {
    const boldMatch = /^\*\*(.*?)\*\*/.exec(text.slice(position));
    const inlineCodeMatch = /^`(.*?)`/.exec(text.slice(position));
    const linkMatch = /^\[(.*?)\]\((.*?)\)/.exec(text.slice(position));

    if (boldMatch) {
      result.push({ type: MARKDOWN_OPTION.BOLD, content: boldMatch[1] });
      position += boldMatch[0].length;
    } else if (inlineCodeMatch) {
      result.push({
        type: MARKDOWN_OPTION.INLINE_CODE,
        content: inlineCodeMatch[1],
      });
      position += inlineCodeMatch[0].length;
    } else if (linkMatch) {
      result.push({
        type: MARKDOWN_OPTION.LINK,
        content: linkMatch[1],
        href: linkMatch[2],
      });
      position += linkMatch[0].length;
    } else {
      result.push({
        type: MARKDOWN_OPTION.PLAIN_TEXT,
        content: text[position],
      });
      position += 1;
    }
  }

  return result;
};

const parseLine = (lineText) => {
  if (lineText.match(/^---+$/)) {
    return { type: MARKDOWN_OPTION.HORIZONTAL_LINE };
  }

  if (lineText.match(/^# /)) {
    return {
      type: MARKDOWN_OPTION.HEADER1,
      content: lineText.slice(2),
    };
  }

  if (lineText.match(/^-\s+\[(x\s?| )\]\s(.*)$/i)) {
    const match = lineText.match(/^-\s+\[(x\s?| )\]\s(.*)$/i);

    return {
      type: MARKDOWN_OPTION.CHECKBOX,
      checked: match[1].toLowerCase() === "x",
      content: parseInline(match[2]),
    };
  }

  if (lineText.match(/^- (.*)$/i)) {
    const match = lineText.match(/^- (.*)$/i);

    return {
      type: MARKDOWN_OPTION.UNORDERED_LIST,
      content: parseInline(match[1]),
    };
  }

  return {
    type: MARKDOWN_OPTION.PLAIN_TEXT,
    content: parseInline(lineText),
  };
};

const parseMarkdown = (inputText) => {
  const lines = inputText.split("\n");
  const parsedElements = lines.map(parseLine);

  return parsedElements;
};

export default parseMarkdown;
