import { useMemo, useState } from "react";
import { formatRelativeTime } from "../../../../lib/format";
import type {
  NewsArticle,
  NewsMeta,
} from "../../../../services/insights.types";
import * as S from "./insights.styles";

interface InsightsFeedProps {
  articles: NewsArticle[];
  meta: NewsMeta | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const MAX_SOURCE_CHIPS = 4;

function SearchGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" strokeLinecap="round" />
    </svg>
  );
}

function RefreshGlyph() {
  return (
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
}

export function InsightsFeed({
  articles,
  meta,
  loading,
  error,
  onRetry,
}: InsightsFeedProps) {
  const [query, setQuery] = useState("");

  const needle = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!needle) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(needle) ||
        a.source.toLowerCase().includes(needle) ||
        (a.summary?.toLowerCase().includes(needle) ?? false),
    );
  }, [articles, needle]);

  if (loading) {
    return (
      <S.State>
        <S.Spinner aria-hidden />
        <S.StateTitle>Gathering the latest stories…</S.StateTitle>
        <S.StateText>
          Pulling fresh advertising and marketing news from the wire.
        </S.StateText>
      </S.State>
    );
  }

  if (error) {
    return (
      <S.State role="alert">
        <S.StateTitle>Couldn’t load insights</S.StateTitle>
        <S.StateText>{error}</S.StateText>
        <S.RetryButton type="button" onClick={onRetry}>
          Try again
        </S.RetryButton>
      </S.State>
    );
  }

  if (articles.length === 0) {
    return (
      <S.State>
        <S.StateTitle>No recent stories</S.StateTitle>
        <S.StateText>
          Nothing came back from the feed just now. Check again in a little
          while.
        </S.StateText>
        <S.RetryButton type="button" onClick={onRetry}>
          Refresh
        </S.RetryButton>
      </S.State>
    );
  }

  const sources = meta?.sources?.slice(0, MAX_SOURCE_CHIPS) ?? [];

  return (
    <S.Wrap>
      <S.Head>
        <S.TitleRow>
          <S.Title>Industry pulse</S.Title>
          <S.LiveBadge>{meta?.cached ? "Cached" : "Live"} · GNews</S.LiveBadge>
          <S.RefreshButton
            type="button"
            onClick={onRetry}
            aria-label="Refresh stories"
          >
            <RefreshGlyph />
            Refresh
          </S.RefreshButton>
        </S.TitleRow>
        <S.Subtitle>
          Branding, business, marketing tech and consumer insights worth knowing
          right now, de-duplicated and sorted newest first.
        </S.Subtitle>
        <S.MetaRow>
          <span>
            Updated {formatRelativeTime(meta?.fetchedAt)} ·{" "}
            {meta?.totalReturned ?? articles.length} stories
          </span>
          {sources.length > 0 && (
            <S.Sources>
              {sources.map((s) => (
                <S.SourceChip key={s.name}>
                  {s.name}
                  <S.SourceCount>{s.count}</S.SourceCount>
                </S.SourceChip>
              ))}
            </S.Sources>
          )}
        </S.MetaRow>
      </S.Head>

      <S.Toolbar>
        <S.SearchShell>
          <SearchGlyph />
          <S.SearchInput
            type="search"
            placeholder="Filter by title, summary or source…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Filter stories"
          />
          {query && (
            <S.SearchClear
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
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
            </S.SearchClear>
          )}
        </S.SearchShell>

        {needle && (
          <S.ResultCount>
            Showing <strong>{filtered.length}</strong> of {articles.length}
          </S.ResultCount>
        )}
      </S.Toolbar>

      {filtered.length === 0 ? (
        <S.NoMatch>
          <S.NoMatchText>
            No stories match <strong>“{query.trim()}”</strong>.
          </S.NoMatchText>
          <S.NoMatchClear type="button" onClick={() => setQuery("")}>
            Clear search
          </S.NoMatchClear>
        </S.NoMatch>
      ) : (
        <S.List>
          {filtered.map((article) => (
            <S.Item key={article.url}>
              {article.imageUrl && (
                <S.Thumb $src={article.imageUrl} aria-hidden />
              )}
              <S.ItemBody>
                <S.ItemMeta>
                  <S.SourceName>{article.source}</S.SourceName>
                  <S.Dot aria-hidden />
                  <span>{formatRelativeTime(article.publishedAt)}</span>
                </S.ItemMeta>
                <S.ItemTitle
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </S.ItemTitle>
                {article.summary && (
                  <S.ItemSummary>{article.summary}</S.ItemSummary>
                )}
              </S.ItemBody>
            </S.Item>
          ))}
        </S.List>
      )}
    </S.Wrap>
  );
}
