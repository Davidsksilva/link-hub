import styled from 'styled-components';

export const Header = styled.header`
  height: 60px;
  width: 100%;
  padding: 0 42px;

  /* background: ${(props) => props.theme.colors.header}; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    /* color: ${(props) => props.theme.colors.light}; */
    font-weight: 400;
  }
`;

export const Navigation = styled.nav`
  a + a {
    margin-left: 20px;
  }

  a {
    text-decoration: none;
    /* color: ${(props) => props.theme.colors.light}; */
    font-size: 18px;
  }
`;
