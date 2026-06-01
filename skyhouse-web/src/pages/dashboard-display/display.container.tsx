import { useCallback, useEffect, useMemo, useState } from "react";
import { campaignService } from "../../services/campaign.service";
import { insightsService } from "../../services/insights.service";
import { ApiError } from "../../lib/api";
import { useToast } from "../../components/toast/toast.context";
import { DashboardComponent } from "./display.component";
import { toRows, parseMinRoas, filterByMinRoas } from "./display.controller";
import type { Campaign, Summary } from "../../services/campaign.types";
import type { NewsArticle, NewsMeta } from "../../services/insights.types";
import type { TabKey } from "./display.types";

export function DashboardContainer() {
  const { notify } = useToast();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [csv, setCsv] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<TabKey>("performance");
  const [minRoasInput, setMinRoasInput] = useState("");

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsMeta, setNewsMeta] = useState<NewsMeta | null>(null);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [newsLoaded, setNewsLoaded] = useState(false);

  const load = useCallback(
    async ({ announce = false }: { announce?: boolean } = {}) => {
      setLoading(true);
      setError(null);
      try {
        const [campaignResult, summaryResult, csvResult] = await Promise.all([
          campaignService.fetchCampaigns(),
          campaignService.fetchSummary(),
          campaignService.fetchRawCsv(),
        ]);

        setCampaigns(campaignResult.campaigns);
        setSummary(summaryResult);
        setCsv(csvResult);

        if (announce) {
          const count = campaignResult.campaigns.length;
          notify({
            tone: "success",
            title: "Campaign data loaded",
            message: `${count} ${count === 1 ? "campaign" : "campaigns"} from campaigns.csv.`,
          });
        }

        if (campaignResult.warnings.length > 0) {
          console.warn(
            "[dashboard] campaign data warnings:",
            campaignResult.warnings,
          );
          const [first, ...rest] = campaignResult.warnings;
          notify({
            tone: "warning",
            title: "Some campaign data needs attention",
            message:
              rest.length > 0 ? `${first} (and ${rest.length} more)` : first,
          });
        }
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Something went wrong loading the dashboard.";
        console.error("[dashboard] failed to load campaigns:", err);
        setError(message);
        notify({ tone: "error", title: "Could not load dashboard", message });
      } finally {
        setLoading(false);
      }
    },
    [notify],
  );

  useEffect(() => {
    void load();
  }, [load]);

  const reloadData = useCallback(() => {
    void load({ announce: true });
  }, [load]);

  const clearData = useCallback(() => {
    setCampaigns([]);
    setSummary(null);
    setCsv("");
    setError(null);
    notify({
      tone: "success",
      title: "Campaign data cleared",
      message: "Use “Fetch CSV data” to reload it.",
    });
  }, [notify]);

  const loadNews = useCallback(async () => {
    setNewsLoading(true);
    setNewsError(null);
    setNewsLoaded(true);
    try {
      const { articles, meta } = await insightsService.fetchMarketingNews();
      setNews(articles);
      setNewsMeta(meta);
      const count = articles.length;
      notify({
        tone: "success",
        title: meta.cached
          ? "Insights loaded from cache"
          : "Live insights loaded",
        message: `${count} ${count === 1 ? "story" : "stories"} from GNews.`,
      });
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Something went wrong loading insights.";
      console.error("[dashboard] failed to load insights:", err);
      setNewsError(message);
      notify({ tone: "error", title: "Could not load insights", message });
    } finally {
      setNewsLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    if (activeTab === "insights" && !newsLoaded) {
      void loadNews();
    }
  }, [activeTab, newsLoaded, loadNews]);

  const rows = useMemo(() => toRows(campaigns), [campaigns]);
  const minRoas = useMemo(() => parseMinRoas(minRoasInput), [minRoasInput]);
  const visibleRows = useMemo(
    () => filterByMinRoas(rows, minRoas),
    [rows, minRoas],
  );

  return (
    <DashboardComponent
      loading={loading}
      error={error}
      onRetry={reloadData}
      onReloadData={reloadData}
      onClearData={clearData}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      summary={summary}
      rows={visibleRows}
      totalCount={rows.length}
      minRoas={minRoasInput}
      onMinRoasChange={setMinRoasInput}
      csv={csv}
      news={news}
      newsMeta={newsMeta}
      newsLoading={newsLoading}
      newsError={newsError}
      onRetryNews={loadNews}
    />
  );
}
