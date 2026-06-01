import styled, { keyframes } from "styled-components";

export const Page = styled.div`
  min-height: 100%;
  padding: ${({ theme }) =>
    `${theme.space["2xl"]} ${theme.space["3xl"]} ${theme.space["4xl"]}`};

  @media (max-width: 900px) {
    padding: ${({ theme }) =>
      `${theme.space.xl} ${theme.space.xl} ${theme.space["3xl"]}`};
  }

  @media (max-width: 640px) {
    padding: ${({ theme }) =>
      `${theme.space.xl} ${theme.space.lg} ${theme.space["3xl"]}`};
  }
`;

export const Shell = styled.div`
  width: 100%;
  max-width: 1720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

export const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const BrandMark = styled.img`
  width: 26px;
  height: 26px;
  display: block;
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Updated = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.text.tertiary};
`;

export const TabPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

export const DataActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid transparent;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 150ms ease,
    border-color 150ms ease,
    color 150ms ease;

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const PrimaryAction = styled(ActionButton)`
  background: ${({ theme }) => theme.color.accent.solid};
  color: ${({ theme }) => theme.color.text.onAccent};

  &:hover {
    background: ${({ theme }) => theme.color.accent.hover};
  }
`;

export const GhostAction = styled(ActionButton)`
  background: ${({ theme }) => theme.color.surface};
  border-color: ${({ theme }) => theme.color.borderStrong};
  color: ${({ theme }) => theme.color.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.color.text.primary};
    border-color: ${({ theme }) => theme.color.text.tertiary};
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

export const SectionHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const SectionDesc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.tertiary};
`;

export const ChartPanel = styled.div`
  padding: ${({ theme }) => `${theme.space.xl} ${theme.space.xl}`};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const StateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  min-height: 280px;
  text-align: center;
`;

export const Spinner = styled.span`
  width: 26px;
  height: 26px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 2.5px solid ${({ theme }) => theme.color.border};
  border-top-color: ${({ theme }) => theme.color.accent.solid};
  animation: ${spin} 700ms linear infinite;
`;

export const StateTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.primary};
`;

export const StateText = styled.p`
  font-size: 14px;
  max-width: 42ch;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const RetryButton = styled.button`
  margin-top: ${({ theme }) => theme.space.xs};
  padding: 9px 18px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.color.accent.solid};
  color: ${({ theme }) => theme.color.text.onAccent};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms ease;

  &:hover {
    background: ${({ theme }) => theme.color.accent.hover};
  }
`;
