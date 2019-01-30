import styled from 'styled-components';

const Card = styled.div`
  border-radius: 5px;
  box-shadow: 5px 5px 30px 6px var(--colorBGDark);
  padding: 1rem;
  background-color: var(--colorBGWhite);
  box-sizing: border-box;
  max-width: 1200px;

  width: calc(100vw - 4rem);
  justify-self: center;
`;

export default Card;
