import { useEffect, useMemo, useState } from "react";
import type { CampaignRow } from "../../display.types";
import { formatCurrency } from "../../../../lib/format";
import * as S from "./revenue-chart.styles";

interface RevenueChartProps {
  rows: CampaignRow[];
}

export function RevenueChart({ rows }: RevenueChartProps) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0)),
    [rows],
  );

  const maxRevenue = useMemo(
    () => sorted.reduce((max, row) => Math.max(max, row.revenue ?? 0), 0),
    [sorted],
  );

  if (sorted.length === 0) {
    return <S.Empty>No campaigns to chart.</S.Empty>;
  }

  return (
    <S.List>
      {sorted.map((row, index) => {
        const revenue = row.revenue ?? 0;
        const pct = maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0;
        return (
          <S.Item key={row.campaignId ?? row.campaignName ?? `row-${index}`}>
            <S.Name title={row.campaignName ?? undefined}>
              {row.campaignName ?? "Untitled"}
            </S.Name>
            <S.Track>
              <S.Bar $pct={pct} $shown={shown} />
            </S.Track>
            <S.Value data-numeric>{formatCurrency(row.revenue)}</S.Value>
          </S.Item>
        );
      })}
    </S.List>
  );
}
