import * as S from "./roas-filter.styles";

interface RoasFilterProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}

export function RoasFilter({
  value,
  onChange,
  resultCount,
  totalCount,
}: RoasFilterProps) {
  const isFiltered = value.trim() !== "";

  return (
    <S.Wrap>
      <S.Field>
        Minimum ROAS
        <S.InputShell>
          <S.Prefix>≥</S.Prefix>
          <S.Input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            placeholder="e.g. 3.0"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label="Minimum ROAS filter"
          />
          {isFiltered && (
            <S.Clear
              type="button"
              aria-label="Clear filter"
              onClick={() => onChange("")}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </S.Clear>
          )}
        </S.InputShell>
      </S.Field>

      <S.Count>
        Showing <strong>{resultCount}</strong> of {totalCount} campaigns
      </S.Count>
    </S.Wrap>
  );
}
