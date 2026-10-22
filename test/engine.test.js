"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const rules = require("../src/rules.js");
const { Eliza, normalize, reflect } = require("../src/engine.js");

test("normalizes punctuation, whitespace, and curly apostrophes", () => {
  assert.equal(normalize("  I’m   Happy! "), "i'm happy");
});

test("selects the highest-priority matching rule", () => {
  const eliza = new Eliza(rules);
  const reply = eliza.respond("I feel sad because of my family.");

  assert.equal(reply.rule.id, "family");
  assert.equal(reply.rule.priority, 90);
});

test("reflects pronouns and preserves capitalization", () => {
  assert.equal(reflect("I am worried about my family"), "You are worried about your family");
  assert.equal(reflect("you are kind"), "I am kind");
});

test("uses fallback for unmatched input and rotates its responses", () => {
  const eliza = new Eliza(rules);
  const first = eliza.respond("The window is open.").text;
  const second = eliza.respond("The window is open.").text;

  assert.notEqual(first, second);
  eliza.reset();
  assert.equal(eliza.respond("The window is open.").text, first);
});

test("rejects empty messages", () => {
  const eliza = new Eliza(rules);

  assert.throws(() => eliza.respond("   "), {
    name: "TypeError",
    message: "Eliza cannot respond to an empty message."
  });
});

test("matches whole keywords rather than substrings", () => {
  const eliza = new Eliza(rules);

  assert.equal(eliza.respond("computerize this").rule.id, "fallback");
});
