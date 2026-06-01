import { useMemo, useState } from "react";
import * as S from "./csv-view.styles";

interface CsvViewProps {
  csv: string;
}

function parseCsv(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length === 0) return { headers: [], rows: [] };
  const [headerLine, ...dataLines] = lines;
  return {
    headers: headerLine.split(","),
    rows: dataLines.map((line) => line.split(",")),
  };
}

const FileIcon = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinejoin="round"
  >
    <path d="M9 1.5H4.5A1.5 1.5 0 0 0 3 3v10a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 13V5.5z" />
    <path d="M9 1.5V5.5H13" />
  </svg>
);

export function CsvView({ csv }: CsvViewProps) {
  const { headers, rows } = useMemo(() => parseCsv(csv), [csv]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(csv);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <S.Panel>
      <S.Header>
        <S.FileName>
          {FileIcon}
          campaigns.csv
        </S.FileName>
        <S.CopyButton type="button" onClick={handleCopy} disabled={!csv}>
          {copied ? "Copied" : "Copy raw"}
        </S.CopyButton>
      </S.Header>

      <S.Scroll>
        <S.Table>
          <thead>
            <tr>
              <S.Th>#</S.Th>
              {headers.map((header) => (
                <S.Th key={header}>{header}</S.Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, rowIndex) => (
              <tr key={rowIndex}>
                <S.Td>
                  <S.IndexCol>{rowIndex + 1}</S.IndexCol>
                </S.Td>
                {cells.map((cell, cellIndex) => (
                  <S.Td key={cellIndex}>{cell}</S.Td>
                ))}
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.Scroll>
    </S.Panel>
  );
}
