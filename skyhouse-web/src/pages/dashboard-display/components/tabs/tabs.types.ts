import type { TabKey } from "../../display.types";

export interface TabItem {
  key: TabKey;
  label: string;
  badge?: string;
}

export interface TabsProps {
  tabs: TabItem[];
  active: TabKey;
  onChange: (key: TabKey) => void;
}
