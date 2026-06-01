import { Tabs } from "./components/tabs/tabs.component";
import { SummaryBar } from "./components/summary-bar/summary-bar.component";
import { RoasFilter } from "./components/roas-filter/roas-filter.component";
import { CampaignTable } from "./components/campaign-table/campaign-table.component";
import { RevenueChart } from "./components/revenue-chart/revenue-chart.component";
import { CsvView } from "./components/csv-view/csv-view.component";
import { InsightsFeed } from "./components/insights/insights.component";
import type { TabItem } from "./components/tabs/tabs.types";
import type { DashboardViewProps } from "./display.types";
import * as S from "./display.styles";

const TABS: TabItem[] = [
  { key: "csv", label: "CSV" },
  { key: "performance", label: "Campaign Performance" },
  { key: "insights", label: "Campaign Insights", badge: "Live" },
];

const ReloadIcon = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
    <path d="M13.6 2.5V5H11.1" />
  </svg>
);

const ClearIcon = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
  </svg>
);

export function DashboardComponent(props: DashboardViewProps) {
  const {
    loading,
    error,
    onRetry,
    onReloadData,
    onClearData,
    activeTab,
    onTabChange,
    summary,
    rows,
    totalCount,
    minRoas,
    onMinRoasChange,
    csv,
    news,
    newsMeta,
    newsLoading,
    newsError,
    onRetryNews,
  } = props;

  function renderActiveTab() {
    if (activeTab === "insights") {
      return (
        <InsightsFeed
          articles={news}
          meta={newsMeta}
          loading={newsLoading}
          error={newsError}
          onRetry={onRetryNews}
        />
      );
    }

    if (loading) {
      return (
        <S.StateWrap>
          <S.Spinner aria-hidden />
          <S.StateText>Loading campaign data…</S.StateText>
        </S.StateWrap>
      );
    }

    if (error) {
      return (
        <S.StateWrap>
          <S.StateTitle>Could not load the dashboard</S.StateTitle>
          <S.StateText>{error}</S.StateText>
          <S.RetryButton type="button" onClick={onRetry}>
            Try again
          </S.RetryButton>
        </S.StateWrap>
      );
    }

    if (activeTab === "csv") return <CsvView csv={csv} />;

    return (
      <S.TabPanel>
        <S.DataActions>
          <S.GhostAction type="button" onClick={onClearData}>
            {ClearIcon}
            Clear data
          </S.GhostAction>
          <S.PrimaryAction type="button" onClick={onReloadData}>
            {ReloadIcon}
            Fetch CSV data
          </S.PrimaryAction>
        </S.DataActions>

        <SummaryBar summary={summary} />

        <S.Section>
          <S.SectionHead>
            <S.SectionTitle>Campaigns</S.SectionTitle>
            <S.SectionDesc>
              ROAS = revenue ÷ spend · CPA = spend ÷ conversions · rows colored
              by ROAS tier.
            </S.SectionDesc>
          </S.SectionHead>
          <RoasFilter
            value={minRoas}
            onChange={onMinRoasChange}
            resultCount={rows.length}
            totalCount={totalCount}
          />
          <CampaignTable rows={rows} isFiltered={minRoas.trim() !== ""} />
        </S.Section>

        <S.Section>
          <S.SectionHead>
            <S.SectionTitle>Revenue by campaign</S.SectionTitle>
          </S.SectionHead>
          <S.ChartPanel>
            <RevenueChart rows={rows} />
          </S.ChartPanel>
        </S.Section>
      </S.TabPanel>
    );
  }

  return (
    <S.Page>
      <S.Shell>
        <S.Brand>
          <S.BrandMark src="/logo.svg" alt="" aria-hidden />
          SkyHouse
        </S.Brand>

        <S.Header>
          <S.Heading>
            <S.Title>Campaign Performance</S.Title>
            <S.Subtitle>
              Spend, revenue and return across every active campaign.
            </S.Subtitle>
          </S.Heading>
          <S.Updated>Source: campaigns.csv</S.Updated>
        </S.Header>

        <Tabs tabs={TABS} active={activeTab} onChange={onTabChange} />

        {renderActiveTab()}
      </S.Shell>
    </S.Page>
  );
}
