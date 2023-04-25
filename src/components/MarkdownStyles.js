import styled from "styled-components/native";

export const PlainText = styled.Text`
  font-size: 18px;
`;

export const HorizontalLine = styled.View`
  height: 1px;
  background-color: #cccccc;
  margin-vertical: 10px;
`;

export const Header1 = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

export const LineView = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 4px;
`;

export const UncheckedText = styled.Text`
  font-size: 18px;
  margin-left: 5px;
`;

export const CheckedText = styled.Text`
  font-size: 18px;
  text-decoration-line: line-through;
  margin-left: 5px;
`;

export const UnorderedListIcon = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: black;
  margin-right: 5px;
`;

export const UnorderedListText = styled.Text`
  font-size: 18px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const InlineCode = styled.Text`
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: "Courier";
  font-size: 16px;
`;

export const LinkText = styled.Text`
  font-size: 18px;
  color: #0366d6;
  text-decoration-line: underline;
`;
