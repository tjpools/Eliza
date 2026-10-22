(function (root) {
  "use strict";

  const rules = [
    {
      id: "greeting",
      priority: 100,
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
      responses: [
        "Hello. What would you like to talk about?",
        "Hi. How are you feeling today?",
        "Hello again. What is on your mind?"
      ]
    },
    {
      id: "family",
      priority: 90,
      keywords: ["mother", "father", "sister", "brother", "family", "wife", "husband"],
      responses: [
        "Tell me more about your family.",
        "What is your relationship with your family like?",
        "How do you feel when you think about your family?"
      ]
    },
    {
      id: "dream",
      priority: 85,
      keywords: ["dream", "dreams"],
      responses: [
        "What does that dream suggest to you?",
        "Do you often dream about {reflection}?",
        "How do you feel about {reflection}?"
      ]
    },
    {
      id: "remember",
      priority: 80,
      keywords: ["remember", "reminds me"],
      responses: [
        "What else do you remember about {reflection}?",
        "What in the present brings {reflection} to mind?",
        "How does remembering {reflection} make you feel?"
      ]
    },
    {
      id: "because",
      priority: 75,
      keywords: ["because"],
      responses: [
        "Is that the only reason?",
        "What other reasons might there be?",
        "Does that reason feel important to you?"
      ]
    },
    {
      id: "feeling",
      priority: 70,
      keywords: ["feel", "feeling", "afraid", "sad", "happy", "angry", "lonely", "worried"],
      responses: [
        "Why do you feel {reflection}?",
        "When did you first notice feeling {reflection}?",
        "What do you think this feeling is telling you?"
      ]
    },
    {
      id: "self-description",
      priority: 65,
      keywords: ["i am", "i'm", "im"],
      responses: [
        "How long have you felt {reflection}?",
        "What makes you feel {reflection}?",
        "How do you feel about being {reflection}?"
      ]
    },
    {
      id: "always",
      priority: 60,
      keywords: ["always", "never"],
      responses: [
        "Can you think of a specific time?",
        "Do you really think it happens every time?",
        "What does that pattern mean to you?"
      ]
    },
    {
      id: "you",
      priority: 50,
      keywords: ["you", "your", "yours"],
      responses: [
        "Why do you think I {reflection}?",
        "Does it matter to you whether I {reflection}?",
        "What does that question bring up for you?"
      ]
    },
    {
      id: "self",
      priority: 40,
      keywords: ["i", "me", "my", "mine"],
      responses: [
        "What makes you say {reflection}?",
        "Is it because you {reflection}?",
        "How long have you felt that way?"
      ]
    },
    {
      id: "yes",
      priority: 30,
      keywords: ["yes", "yeah", "yep"],
      responses: [
        "You seem quite sure.",
        "I see. Please go on.",
        "What does that agreement mean to you?"
      ]
    },
    {
      id: "no",
      priority: 30,
      keywords: ["no", "nope"],
      responses: [
        "Why not?",
        "Are you saying no just to be negative?",
        "What would make you feel differently?"
      ]
    },
    {
      id: "computer",
      priority: 25,
      keywords: ["computer", "robot", "machine"],
      responses: [
        "Do computers worry you?",
        "What do you think machines have to do with your problem?",
        "What is it about machines that interests you?"
      ]
    },
    {
      id: "fallback",
      priority: 0,
      keywords: [],
      responses: [
        "Please tell me more.",
        "Can you say a little more about that?",
        "How does that make you feel?",
        "Why do you think that is?",
        "Let's explore that thought."
      ]
    }
  ];

  if (typeof module !== "undefined" && module.exports) {
    module.exports = rules;
  } else {
    root.ELIZA_RULES = rules;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
