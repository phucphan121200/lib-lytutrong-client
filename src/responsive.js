import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media (min-width: 481px) and (max-width: 1023px) {
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
