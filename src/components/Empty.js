import styled from "styled-components/native";
import PropTypes from "prop-types";

const EmptyContainer = styled.View`
  margin-top: 60%;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  color: #a9a9a9;
`;

function Empty({ message }) {
  return (
    <EmptyContainer>
      <EmptyText>{message}</EmptyText>
    </EmptyContainer>
  );
}

export default Empty;

Empty.propTypes = {
  message: PropTypes.string.isRequired,
};
