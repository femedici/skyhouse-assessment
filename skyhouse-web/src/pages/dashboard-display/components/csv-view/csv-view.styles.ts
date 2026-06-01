import styled from "styled-components";

export const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surfaceMuted};
`;

export const FileName = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.secondary};
  font-family: ${({ theme }) => theme.font.mono};

  svg {
    width: 15px;
    height: 15px;
    color: ${({ theme }) => theme.color.text.tertiary};
  }
`;

export const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.surface};
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.secondary};
  cursor: pointer;
  transition:
    background 140ms ease,
    color 140ms ease;

  &:hover {
    background: ${({ theme }) => theme.color.surfaceMuted};
    color: ${({ theme }) => theme.color.text.primary};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const Scroll = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  min-width: 640px;
`;

export const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.tertiary};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
  color: ${({ theme }) => theme.color.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

export const IndexCol = styled.span`
  color: ${({ theme }) => theme.color.text.tertiary};
  font-family: ${({ theme }) => theme.font.mono};
`;
