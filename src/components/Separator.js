import styled from "styled-components/native";

const SeparatorView = styled.View`
  height: 1px;
  background-color: #dddddd;
  margin-left: 20px;
  margin-right: 20px;
`;

function Separator() {
  return <SeparatorView />;
}

export default Separator;
