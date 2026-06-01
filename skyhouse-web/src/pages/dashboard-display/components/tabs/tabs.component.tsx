import type { TabsProps } from "./tabs.types";
import * as S from "./tabs.styles";

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <S.Nav role="tablist" aria-label="Dashboard sections">
      {tabs.map((tab) => (
        <S.Tab
          key={tab.key}
          role="tab"
          aria-selected={tab.key === active}
          $active={tab.key === active}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
          {tab.badge && <S.Badge>{tab.badge}</S.Badge>}
        </S.Tab>
      ))}
    </S.Nav>
  );
}
