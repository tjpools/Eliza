(function () {
  "use strict";

  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#user-input");
  const messages = document.querySelector("#messages");
  const resetButton = document.querySelector("#reset-button");
  const showWorkings = document.querySelector("#show-workings");
  const initialMessage = "Hello. What would you like to talk about?";
  const eliza = new ELIZA_ENGINE.Eliza(ELIZA_RULES);
  let conversation = [{ role: "bot", text: initialMessage }];

  function renderMessage(message) {
    const item = document.createElement("li");
    item.className = `message message--${message.role}`;

    const label = document.createElement("span");
    label.className = "message-label";
    label.textContent = message.role === "user" ? "You" : "Eliza";

    const body = document.createElement("p");
    body.textContent = message.text;
    item.append(label, body);

    if (message.details && showWorkings.checked) {
      const workings = document.createElement("div");
      workings.className = "workings";
      workings.textContent = message.details;
      item.append(workings);
    }
    return item;
  }

  function renderConversation() {
    const fragment = document.createDocumentFragment();
    for (const message of conversation) {
      fragment.append(renderMessage(message));
    }
    messages.replaceChildren(fragment);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage(text) {
    const userMessage = text.trim();
    if (!userMessage) {
      return;
    }

    const reply = eliza.respond(userMessage);
    const details = reply.rule.keyword
      ? `Matched “${reply.rule.keyword}” (priority ${reply.rule.priority}); transformed “${reply.captured || userMessage}” to “${reply.transformed}”.`
      : "No keyword rule matched, so the fallback response was used.";
    conversation.push(
      { role: "user", text: userMessage },
      { role: "bot", text: reply.text, details }
    );
    renderConversation();
    input.value = "";
    input.focus();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(input.value);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  showWorkings.addEventListener("change", renderConversation);

  resetButton.addEventListener("click", () => {
    conversation = [{ role: "bot", text: initialMessage }];
    eliza.reset();
    input.value = "";
    renderConversation();
    input.focus();
  });

  renderConversation();
})();
