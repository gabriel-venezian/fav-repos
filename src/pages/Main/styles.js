import styled, { keyframes, css } from 'styled-components';

export const Container = styled.main`
  max-inline-size: 700px;
  background-color: #FFF;
  border-radius: 4px;
  padding-inline: 30px;
  padding-block: 30px;
  margin-inline: auto;
  margin-block: 80px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 40px;
  display: flex;

  input {
    flex: 1;
    border: 1px solid #ddd;
    padding-block: 10px;
    padding-inline: 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const spinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background-color: #0D2636;
  border: 0;
  border-radius: 4px;
  margin-inline-start: 10px;
  padding-block: 0;
  padding-inline: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.loading && css`
    svg {
      animation: ${spinnerAnimation} 2s linear infinite;
    }
  `}
`;
