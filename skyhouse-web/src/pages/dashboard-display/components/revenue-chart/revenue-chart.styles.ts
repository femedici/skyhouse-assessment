import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

export const Item = styled.li`
  display: grid;
  grid-template-columns: minmax(120px, 190px) 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space.xs};
  }
`;

export const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.secondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Track = styled.div`
  position: relative;
  height: 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.surfaceMuted};
  overflow: hidden;
`;

export const Bar = styled.div<{ $pct: number; $shown: boolean }>`
  position: absolute;
  inset: 0;
  width: ${({ $pct }) => $pct}%;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.color.accent.solid},
    ${({ theme }) => theme.color.accent.hover}
  );
  transform-origin: left center;
  transform: scaleX(${({ $shown }) => ($shown ? 1 : 0)});
  transition: transform 640ms cubic-bezier(0.22, 1, 0.36, 1);
`;

export const Value = styled.span`
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.color.text.primary};
  text-align: right;

  @media (max-width: 560px) {
    text-align: left;
    color: ${({ theme }) => theme.color.text.secondary};
  }
`;

export const Empty = styled.p`
  padding: ${({ theme }) => theme.space.xl};
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.tertiary};
`;
