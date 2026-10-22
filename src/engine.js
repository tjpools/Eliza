(function (root) {
  "use strict";

  const reflections = [
    ["i am", "you are"],
    ["i'm", "you're"],
    ["you are", "I am"],
    ["you're", "I'm"],
    ["my", "your"],
    ["your", "my"],
    ["mine", "yours"],
    ["yours", "mine"],
    ["me", "you"],
    ["you", "I"],
    ["i", "you"],
    ["am", "are"],
    ["are", "am"],
    ["was", "were"],
    ["were", "was"]
  ];

  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[’]/g, "'")
      .replace(/[^\p{L}\p{N}'\s-]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function preserveCase(original, replacement) {
    if (original === original.toUpperCase()) {
      return replacement.toUpperCase();
    }
    if (original[0] === original[0].toUpperCase()) {
      return replacement[0].toUpperCase() + replacement.slice(1);
    }
    return replacement;
  }

  function reflect(text) {
    const alternatives = reflections
      .map(([source, replacement]) => [
        source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        replacement
      ])
      .sort((a, b) => b[0].length - a[0].length);
    const pattern = new RegExp(
      `\\b(${alternatives.map(([source]) => source).join("|")})\\b`,
      "gi"
    );

    return text.replace(pattern, (match) => {
      const entry = alternatives.find(([source]) => source.toLowerCase() === match.toLowerCase());
      return entry ? preserveCase(match, entry[1]) : match;
    });
  }

  function findKeyword(text, keywords) {
    let bestMatch = null;

    for (const keyword of keywords) {
      const normalizedKeyword = normalize(keyword);
      const escaped = normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const match = new RegExp(`(^|\\s)(${escaped})(?=$|\\s)`, "i").exec(text);
      if (match && (!bestMatch || match.index < bestMatch.index)) {
        bestMatch = {
          keyword: normalizedKeyword,
          index: match.index + match[1].length,
          length: match[2].length
        };
      }
    }

    return bestMatch;
  }

  function phraseAfter(text, match) {
    if (!match) {
      return text;
    }
    return text.slice(match.index + match.length).trim().replace(/^[,;:.\s]+|[,;:!?."\s]+$/g, "");
  }

  class Eliza {
    constructor(rules) {
      if (!Array.isArray(rules) || rules.length === 0) {
        throw new TypeError("Eliza requires a non-empty array of rules.");
      }
      this.rules = [...rules].sort((left, right) => right.priority - left.priority);
      this.reset();
    }

    reset() {
      this.responseIndexes = new Map();
    }

    respond(input) {
      const original = typeof input === "string" ? input.trim() : "";
      if (!original) {
        throw new TypeError("Eliza cannot respond to an empty message.");
      }

      const normalized = normalize(original);
      const selected = this.rules
        .map((rule) => ({ rule, match: findKeyword(normalized, rule.keywords) }))
        .find(({ rule, match }) => rule.id === "fallback" || match);
      const { rule, match } = selected;
      const captured = phraseAfter(normalized, match);
      const transformed = reflect(captured || normalized);
      const responses = rule.responses;
      const responseIndex = this.responseIndexes.get(rule.id) || 0;
      const template = responses[responseIndex % responses.length];
      this.responseIndexes.set(rule.id, responseIndex + 1);

      const text = template
        .replaceAll("{reflection}", transformed || "that")
        .replaceAll("{input}", original)
        .replaceAll("{keyword}", match ? match.keyword : "");

      return {
        text,
        rule: { id: rule.id, keyword: match ? match.keyword : null, priority: rule.priority },
        captured,
        transformed
      };
    }
  }

  const api = { Eliza, normalize, reflect };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.ELIZA_ENGINE = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
