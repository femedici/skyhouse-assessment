import { useTheme } from "styled-components";
import type { Summary } from "../../../../services/campaign.types";
import { classifyRoas } from "../../display.controller";
import { formatCurrency, formatRoas } from "../../../../lib/format";
import * as S from "./summary-bar.styles";

interface SummaryBarProps {
  summary: Summary | null;
}

export function SummaryBar({ summary }: SummaryBarProps) {
  const theme = useTheme();
  const tier = classifyRoas(summary?.overallRoas ?? null);
  const dotColor = theme.color.tier[tier].solid;

  return (
    <S.Strip aria-label="Account summary">
      <S.Metric>
        <S.Label>Total Spend</S.Label>
        <S.Value data-numeric>
          {formatCurrency(summary?.totalSpend ?? null)}
        </S.Value>
      </S.Metric>

      <S.Metric>
        <S.Label>Total Revenue</S.Label>
        <S.Value data-numeric>
          {formatCurrency(summary?.totalRevenue ?? null)}
        </S.Value>
      </S.Metric>

      <S.Metric>
        <S.Label>Overall ROAS</S.Label>
        <S.Value data-numeric>
          <S.Dot $color={dotColor} aria-hidden />
          {formatRoas(summary?.overallRoas ?? null)}
          {summary && <S.Sub>across {summary.campaignCount} campaigns</S.Sub>}
        </S.Value>
      </S.Metric>
    </S.Strip>
  );
}
