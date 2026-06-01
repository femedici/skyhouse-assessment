import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.space.xl};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const Tab = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.md} 2px`};
  margin-bottom: -1px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme, $active }) =>
    $active ? theme.color.text.primary : theme.color.text.secondary};
  border-bottom: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.color.accent.solid : "transparent"};
  transition:
    color 160ms ease,
    border-color 160ms ease;

  &:hover {
    color: ${({ theme }) => theme.color.text.primary};
  }
`;

export const Badge = styled.span`
  padding: 2px 7px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.color.accent.text};
  background: ${({ theme }) => theme.color.accent.soft};
`;
