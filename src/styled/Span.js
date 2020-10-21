import styled from "styled-components";

export default styled.span`
  -webkit-text-stroke-width: 0.5px;
  color: ${props => (props.score ? "#f25042" : "inherit")};
`;
