import styled, { keyframes } from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.xl}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.accent.soft};
  border: 1px solid oklch(0.86 0.08 267);
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.accent.text};
`;

export const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.onAccent};
  background: ${({ theme }) => theme.color.accent.solid};

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: ${({ theme }) => theme.color.text.onAccent};
  }
`;

export const RefreshButton = styled.button`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 13px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.color.accent.solid};
  background: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.accent.text};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 140ms ease,
    color 140ms ease;

  &:hover {
    background: ${({ theme }) => theme.color.accent.solid};
    color: ${({ theme }) => theme.color.text.onAccent};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.secondary};
  max-width: 70ch;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  flex-wrap: wrap;
  font-size: 13px;
  color: ${({ theme }) => theme.color.text.tertiary};
`;

export const Sources = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  flex-wrap: wrap;
`;

export const SourceChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.secondary};
  background: ${({ theme }) => theme.color.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.color.border};
`;

export const SourceCount = styled.span`
  color: ${({ theme }) => theme.color.text.tertiary};
  font-variant-numeric: tabular-nums;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  flex-wrap: wrap;
`;

export const SearchShell = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  flex: 1 1 260px;
  max-width: 380px;
  padding: ${({ theme }) => `8px ${theme.space.md}`};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.text.tertiary};
  transition:
    border-color 140ms ease,
    box-shadow 140ms ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.color.accent.solid};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.accent.soft};
    color: ${({ theme }) => theme.color.text.secondary};
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.color.text.tertiary};
  }
`;

export const SearchClear = styled.button`
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

export const ResultCount = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.color.text.tertiary};
  white-space: nowrap;

  strong {
    color: ${({ theme }) => theme.color.text.primary};
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
`;

export const NoMatch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space["2xl"]} ${theme.space.xl}`};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
`;

export const NoMatchText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.secondary};

  strong {
    color: ${({ theme }) => theme.color.text.primary};
    font-weight: 600;
  }
`;

export const NoMatchClear = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.accent.text};
  padding: 2px 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  overflow: hidden;
`;

export const Item = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.xl}`};
  transition: background 140ms ease;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }

  &:hover {
    background: ${({ theme }) => theme.color.surfaceMuted};
  }
`;

export const Thumb = styled.div<{ $src: string }>`
  flex-shrink: 0;
  width: 88px;
  height: 88px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.color.border};
  background-color: ${({ theme }) => theme.color.surfaceMuted};
  background-image: ${({ $src }) => `url("${$src}")`};
  background-size: cover;
  background-position: center;

  @media (max-width: 560px) {
    display: none;
  }
`;

export const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: 12px;
  color: ${({ theme }) => theme.color.text.tertiary};
`;

export const SourceName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Dot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.text.tertiary};
`;

export const ItemTitle = styled.a`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.color.text.primary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.color.accent.text};
    text-decoration: underline;
  }
`;

export const ItemSummary = styled.p`
  font-size: 13.5px;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const State = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  min-height: 260px;
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
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
  max-width: 52ch;
  line-height: 1.5;
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
