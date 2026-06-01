import styled from "styled-components";
import type { RoasTier } from "../../display.types";

export const Scroll = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  text-align: left;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text.primary};
  background: ${({ theme }) => theme.color.surfaceMuted};
  border-bottom: 1px solid ${({ theme }) => theme.color.borderStrong};
  white-space: nowrap;
`;

export const Row = styled.tr<{ $tier: RoasTier }>`
  background: ${({ theme, $tier }) => theme.color.tier[$tier].soft};
  transition: filter 140ms ease;

  &:not(:last-child) td {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }

  &:hover {
    filter: brightness(0.985);
  }
`;

export const Td = styled.td`
  text-align: left;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  font-size: 14px;
  color: ${({ theme }) => theme.color.text.primary};
  white-space: nowrap;
`;

export const CampaignCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  min-width: 200px;
  white-space: normal;
`;

export const CampaignName = styled.span`
  font-weight: 500;
`;

export const WarnGlyph = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.color.tier.medium.text};
  display: inline-grid;
  place-items: center;
  cursor: help;

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const PlatformPill = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text.secondary};
  background: ${({ theme }) => theme.color.surfaceMuted};
  border: 1px solid ${({ theme }) => theme.color.border};
`;

export const RoasBadge = styled.span<{ $tier: RoasTier }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme, $tier }) => theme.color.tier[$tier].text};
  background: ${({ theme, $tier }) => theme.color.tier[$tier].soft};
  border: 1px solid ${({ theme, $tier }) => theme.color.tier[$tier].border};

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: ${({ theme, $tier }) => theme.color.tier[$tier].solid};
  }
`;

export const Empty = styled.td`
  padding: ${({ theme }) => `${theme.space["3xl"]} ${theme.space.lg}`};
  text-align: center;
  color: ${({ theme }) => theme.color.text.tertiary};
  font-size: 14px;
`;

export const Tf = styled.td`
  text-align: left;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text.primary};
  background: ${({ theme }) => theme.color.surfaceMuted};
  border-top: 1px solid ${({ theme }) => theme.color.borderStrong};
  white-space: nowrap;
`;

export const TfLabel = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 12px;
`;
