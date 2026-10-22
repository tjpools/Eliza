# Eliza

A small, inspectable chatbot inspired by ELIZA, Joseph Weizenbaum's 1960s
conversation program. It uses explicit keyword rules and response templates;
it does not understand language or generate replies with an AI model.

The guiding principles and architectural background are described in
[Philosophy.md](./Philosophy.md).

## Run locally

Open [`index.html`](./index.html) in a modern browser. The entire app runs
locally: there is no server to start, package to install, account to create,
or network request. Your conversation stays in the current page and is
discarded when you reset it or close the tab.

You can also serve the directory with any static file server if preferred.

## Use

- Type a message and press **Enter** to send; use **Shift+Enter** for a
  newline.
- Select **Show how replies are made** to see the matched keyword and the
  phrase transformed by the rule engine.
- Select **Start over** to clear the conversation and reset response rotation.

## Development

The app uses plain HTML, CSS, and JavaScript with no runtime dependencies.
Conversation rules live separately from the matching and response engine.

Run the engine tests with Node.js:

```sh
node --test
```

The page is designed to work from `file://` as well as from a static server;
scripts are local and do not fetch resources.
