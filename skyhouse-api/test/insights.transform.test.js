import test from "node:test";
import assert from "node:assert/strict";

import { transform } from "../src/services/insights.service.js";

function samplePayload() {
  return {
    totalArticles: 1240,
    articles: [
      {
        title: "Story A",
        description: "desc a",
        url: "https://ex.com/a",
        image: "https://ex.com/a.jpg",
        source: { name: "AdAge" },
        publishedAt: "2026-06-01T10:00:00Z",
      },
      {
        // Same story, syndicated under a different outlet — must be de-duped by URL.
        title: "Story A (syndicated)",
        description: "dup",
        url: "https://EX.com/A",
        source: { name: "AdWeek" },
        publishedAt: "2026-06-01T09:00:00Z",
      },
      { title: "", url: "https://ex.com/b" }, // dropped: no title
      { title: "No URL here" }, // dropped: no url
      {
        title: "Story C",
        url: "https://ex.com/c",
        source: { name: "AdAge" },
        publishedAt: "2026-05-30T08:00:00Z",
      },
    ],
  };
}

test("transform drops malformed items and de-duplicates by normalized URL", () => {
  const { articles } = transform(samplePayload());
  assert.equal(articles.length, 2);
  assert.deepEqual(
    articles.map((a) => a.url),
    ["https://ex.com/a", "https://ex.com/c"],
  );
});

test("transform sorts newest first and maps fields safely", () => {
  const { articles } = transform(samplePayload());
  assert.equal(articles[0].title, "Story A");
  assert.equal(articles[0].source, "AdAge");
  assert.equal(articles[0].summary, "desc a");
  assert.equal(articles[0].imageUrl, "https://ex.com/a.jpg");
  assert.equal(typeof articles[0].ageHours, "number");

  // Story C had no description/image → safe nulls, not undefined.
  assert.equal(articles[1].summary, null);
  assert.equal(articles[1].imageUrl, null);
});

test("transform aggregates a source breakdown and freshness window", () => {
  const { meta } = transform(samplePayload());
  assert.equal(meta.totalReturned, 2);
  assert.equal(meta.totalAvailable, 1240);
  assert.equal(meta.topSource, "AdAge");
  assert.deepEqual(meta.sources, [{ name: "AdAge", count: 2 }]);
  assert.equal(meta.newest, "2026-06-01T10:00:00.000Z");
  assert.equal(meta.oldest, "2026-05-30T08:00:00.000Z");
  assert.equal(meta.cached, false);
});

test("transform handles an empty / shapeless payload without throwing", () => {
  const { articles, meta } = transform({});
  assert.deepEqual(articles, []);
  assert.equal(meta.totalReturned, 0);
  assert.equal(meta.totalAvailable, null);
  assert.equal(meta.topSource, null);
});
