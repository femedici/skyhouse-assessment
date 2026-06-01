import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
`;

export const Field = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const InputShell = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => `7px ${theme.space.md}`};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: ${({ theme }) => theme.radius.md};
  transition:
    border-color 140ms ease,
    box-shadow 140ms ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.color.accent.solid};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.accent.soft};
  }
`;

export const Prefix = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.color.text.tertiary};
`;

export const Input = styled.input`
  width: 72px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.color.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.color.text.tertiary};
    font-weight: 400;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  appearance: textfield;
`;

export const Clear = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text.tertiary};
  display: grid;
  place-items: center;
  padding: 2px;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    color: ${({ theme }) => theme.color.text.primary};
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

export const Count = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.text.tertiary};

  strong {
    color: ${({ theme }) => theme.color.text.primary};
    font-weight: 600;
  }
`;
