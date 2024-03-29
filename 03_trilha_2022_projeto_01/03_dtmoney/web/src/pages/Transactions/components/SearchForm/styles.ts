import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;

    border-radius: 6px;
    border: 0;

    background: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};

    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    border: 1px solid ${(props) => props.theme["green-300"]};
    border-radius: 6px;

    background: transparent;
    color: ${(props) => props.theme["green-300"]};

    font-weight: bold;

    padding: 1rem;

    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      border-color: ${(props) => props.theme["green-500"]};
      background: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};

      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`;
