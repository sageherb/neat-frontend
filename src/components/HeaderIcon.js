import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const IconContainer = styled.TouchableOpacity`
  margin-left: 16px;
`;

function HeaderIcon({ name, onPress = null }) {
  return (
    <IconContainer key={name} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={28} />
    </IconContainer>
  );
}

export default HeaderIcon;

HeaderIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};
