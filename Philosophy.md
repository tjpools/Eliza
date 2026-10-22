# Philosophy

## Lineage

ELIZA was created by Joseph Weizenbaum at MIT in the mid-1960s. Its best-known
script, DOCTOR, responded in the style of a reflective psychotherapist: it
noticed selected words and phrases, transformed parts of what a person said,
and returned prompts that encouraged the person to continue.

The 1956 Dartmouth proposal is often remembered through the question of
whether machines can think. Another useful framing is about mapping: can
features of human learning and intelligent behavior be represented by
corresponding machine processes? In this project, **homomorphism** names that
structural question, not a claim that human and machine experience are
identical, or a verdict about machine consciousness.

ELIZA makes one such mapping concrete on a small scale. Human utterances are
matched to machine-defined keywords and patterns; selected pieces are
transformed and mapped to response templates. The interesting question is
what this mapping preserves, what it leaves out, and how far a coherent
interaction can be built from it. This keeps the focus on representation and
correspondence rather than treating consciousness as the project's test.

This project takes inspiration from that lineage. It is an educational
recreation, not a claim to reproduce Weizenbaum's original source code or every
detail of the original program.

## What this project is for

The goal is to make a small, inspectable chatbot that shows its workings. Its
behavior should come from explicit rules rather than a hidden model. Readers
should be able to trace how an utterance is mapped from the input, through a
match and any transformations, to a response template, and inspect where that
mapping is selective or lossy.

The program is a limited conversational system, not a therapist or adviser.
Its interface and documentation should describe its actual rules and limits
without presenting those limits as a resolution of broader questions about
mind or consciousness.

## Architecture

The browser implementation is organized around a simple pipeline:

1. **Normalize input** for matching while retaining the user's original text
   where useful.
2. **Find candidate rules** by keyword and priority.
3. **Decompose a match** into the parts needed by that rule.
4. **Transform** selected words or phrases, such as first-person and
   second-person pronouns.
5. **Reassemble a reply** from one of the rule's response templates.
6. **Use a fallback** when no rule applies.

The engine should be separate from the rule data. The engine owns matching,
transformation, response selection, and minimal in-memory rotation state. The
rules describe priorities, keywords, transformations, and templates. The
browser interface handles input, output, and accessible presentation without
embedding conversation logic in the page controls.

The initial implementation uses plain HTML, CSS, and JavaScript so it can be
opened directly in a browser without a server, installation, or network
access. Keep the mechanisms small and explicit; add complexity only when it
helps explain or test the behavior. Node's built-in test runner checks the
engine without adding runtime dependencies.

## Design principles

- **Legibility over cleverness.** Prefer rules that can be read and followed
  over compact but opaque tricks.
- **Visible mappings.** Make the path from human utterance to machine reply
  inspectable, including the simplifications and information it leaves out.
- **Honest boundaries.** Describe what this implementation does, and avoid
  presenting the bot as a source of professional help.
- **Small pieces.** Keep the rule data, engine, and user interface distinct.
- **Deterministic tests.** Make rule selection and transformations testable
  without relying on a live conversation or external services.
- **Room to experiment.** Treat the initial rule set as a starting point, not
  a definitive or historically exact reconstruction.
