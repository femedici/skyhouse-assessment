import type { CampaignRow } from "../../display.types";
import {
  formatCurrency,
  formatInteger,
  formatRoas,
} from "../../../../lib/format";
import * as S from "./campaign-table.styles";

interface CampaignTableProps {
  rows: CampaignRow[];
  isFiltered: boolean;
}

const WarnIcon = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 2.5l5.5 9.5h-11z" />
    <path d="M8 6.5v2.5" />
    <path d="M8 11h.01" />
  </svg>
);

function sumBy(rows: CampaignRow[], pick: (row: CampaignRow) => number | null) {
  return rows.reduce<number>((acc, row) => {
    const value = pick(row);
    return value == null ? acc : acc + value;
  }, 0);
}

export function CampaignTable({ rows, isFiltered }: CampaignTableProps) {
  const hasRows = rows.length > 0;
  const totalSpend = sumBy(rows, (r) => r.spend);
  const totalRevenue = sumBy(rows, (r) => r.revenue);
  const totalConversions = sumBy(rows, (r) => r.conversions);
  const overallRoas = totalSpend > 0 ? totalRevenue / totalSpend : null;
  const overallCpa =
    totalConversions > 0 ? totalSpend / totalConversions : null;

  return (
    <S.Scroll>
      <S.Table>
        <thead>
          <tr>
            <S.Th>Campaign</S.Th>
            <S.Th>Platform</S.Th>
            <S.Th>Spend</S.Th>
            <S.Th>Revenue</S.Th>
            <S.Th>Conversions</S.Th>
            <S.Th>CPA</S.Th>
            <S.Th>ROAS</S.Th>
          </tr>
        </thead>
        <tbody>
          {!hasRows ? (
            <tr>
              <S.Empty colSpan={7}>
                {isFiltered
                  ? "No campaigns meet this minimum ROAS. Try lowering the threshold."
                  : "No campaign data available."}
              </S.Empty>
            </tr>
          ) : (
            rows.map((row) => (
              <S.Row
                key={row.campaignId ?? row.campaignName ?? Math.random()}
                $tier={row.tier}
              >
                <S.Td>
                  <S.CampaignCell>
                    {row.warnings.length > 0 && (
                      <S.WarnGlyph
                        title={row.warnings.join("\n")}
                        aria-label="Data warning"
                      >
                        {WarnIcon}
                      </S.WarnGlyph>
                    )}
                    <S.CampaignName>
                      {row.campaignName ?? "Untitled campaign"}
                    </S.CampaignName>
                  </S.CampaignCell>
                </S.Td>
                <S.Td>
                  <S.PlatformPill>{row.platform ?? "—"}</S.PlatformPill>
                </S.Td>
                <S.Td data-numeric>{formatCurrency(row.spend)}</S.Td>
                <S.Td data-numeric>{formatCurrency(row.revenue)}</S.Td>
                <S.Td data-numeric>{formatInteger(row.conversions)}</S.Td>
                <S.Td data-numeric>{formatCurrency(row.cpa)}</S.Td>
                <S.Td>
                  <S.RoasBadge $tier={row.tier}>
                    {formatRoas(row.roas)}
                  </S.RoasBadge>
                </S.Td>
              </S.Row>
            ))
          )}
        </tbody>
        {hasRows && (
          <tfoot>
            <tr>
              <S.Tf>
                <S.TfLabel>Totals</S.TfLabel>
              </S.Tf>
              <S.Tf>{rows.length} campaigns</S.Tf>
              <S.Tf data-numeric>{formatCurrency(totalSpend)}</S.Tf>
              <S.Tf data-numeric>{formatCurrency(totalRevenue)}</S.Tf>
              <S.Tf data-numeric>{formatInteger(totalConversions)}</S.Tf>
              <S.Tf data-numeric>{formatCurrency(overallCpa)}</S.Tf>
              <S.Tf data-numeric>{formatRoas(overallRoas)}</S.Tf>
            </tr>
          </tfoot>
        )}
      </S.Table>
    </S.Scroll>
  );
}
