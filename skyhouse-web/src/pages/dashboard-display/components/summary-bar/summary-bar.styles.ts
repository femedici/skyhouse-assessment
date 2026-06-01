import styled from "styled-components";

export const Strip = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Metric = styled.div`
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.xl}`};

  & + & {
    border-left: 1px solid ${({ theme }) => theme.color.border};
  }

  @media (max-width: 640px) {
    & + & {
      border-left: none;
      border-top: 1px solid ${({ theme }) => theme.color.border};
    }
  }
`;

export const Label = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text.tertiary};
`;

export const Value = styled.p`
  margin-top: ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Dot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $color }) => $color};
`;

export const Sub = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.tertiary};
`;
