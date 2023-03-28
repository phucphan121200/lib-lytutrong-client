import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

export const scence_1 = (props) => {
  return css`
    @media only screen and (max-width: 1350px) {
      ${props}
    }
  `;
};
