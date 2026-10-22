# Philosophy

## Lineage

ELIZA was created by Joseph Weizenbaum at MIT in the mid-1960s. Its best-known
script, DOCTOR, responded in the style of a reflective psychotherapist: it
noticed selected words and phrases, transformed parts of what a person said,
and returned prompts that encouraged the person to continue.

The historical importance of ELIZA is not that it understood people. It did
not. Its conversations demonstrated how readily people can attribute
understanding to a system whose replies feel relevant. The effect is a useful
starting point for studying language, interaction, and the boundaries between
simulation and understanding.

This project takes inspiration from that lineage. It is an educational
recreation, not a claim to reproduce Weizenbaum's original source code or every
detail of the original program.

## What this project is for

The goal is to make a small, inspectable chatbot that shows its workings. Its
behavior should come from explicit rules rather than a hidden model or a claim
of intelligence. Readers should be able to trace a reply from the input,
through a match and any transformations, to the response template.

The program is a conversational mirror, not a therapist, adviser, or
understanding agent. Its interface and documentation should not imply
otherwise.

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
- **Honest boundaries.** Make clear that pattern matching is not
  understanding, and avoid presenting the bot as a source of professional
  help.
- **Small pieces.** Keep the rule data, engine, and user interface distinct.
- **Deterministic tests.** Make rule selection and transformations testable
  without relying on a live conversation or external services.
- **Room to experiment.** Treat the initial rule set as a starting point, not
  a definitive or historically exact reconstruction.
