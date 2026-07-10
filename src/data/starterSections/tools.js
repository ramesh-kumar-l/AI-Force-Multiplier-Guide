export const toolsSection = {
  "id": "tools",
  "title": "Tool Selection & Integration",
  "iconKey": "settings",
  "color": "from-slate-600 to-gray-500",
  "cards": [
    {
      "id": "tools-1",
      "title": "Claude vs ChatGPT vs Others: When to Use What",
      "content": "\n**Claude (Anthropic):**\n- Better for: Long documents, complex reasoning, code quality, safety analysis, creative writing\n- Best for: Deep analysis, refactoring, architecture decisions\n- Context: 200K tokens (vs ChatGPT 128K)\n\n**ChatGPT (OpenAI):**\n- Better for: Web search, latest data, broad knowledge\n- Best for: Quick facts, internet-aware questions\n- Best for: DALL-E integration if needed\n\n**Strategy:** Use Claude for development work, ChatGPT for research/knowledge.\n",
      "exampleCode": "Claude: \"Refactor this 500-line module to microservices. Show architecture trade-offs.\"\n\nChatGPT: \"What are the latest best practices in React 2025?\"\n\nClaude: \"Debug why this distributed cache is inconsistent\"\n\nChatGPT: \"What's the current exchange rate for crypto?\""
    },
    {
      "id": "tools-2",
      "title": "API Usage: Programmatic AI as a Tool",
      "content": "\nDon't use just the web interface. Use APIs:\n- Batch process code reviews via Claude API\n- Auto-generate test cases in CI/CD\n- Real-time code suggestions in your IDE\n- Automated documentation generation\n- Scheduled architecture audits\n\nCost: ~$0.01 per 1K tokens. Saves hours.\n",
      "exampleCode": "// Example: Auto-generate tests on git commit\nconst { Anthropic } = require(\"@anthropic-ai/sdk\");\n\nasync function generateTests(functionCode) {\n  const client = new Anthropic();\n  const response = await client.messages.create({\n    model: \"claude-opus-4-20250514\",\n    max_tokens: 1000,\n    messages: [\n      {\n        role: \"user\",\n        content: `Generate comprehensive Jest tests for this function:\n${functionCode}`\n      }\n    ]\n  });\n  return response.content[0].text;\n}"
    },
    {
      "id": "tools-3",
      "title": "IDE Integration: The \"AI Pair Programmer\"",
      "content": "\n**Setup:**\n- VS Code: GitHub Copilot, Codeium (free tier)\n- IDE inline: Use Claude or ChatGPT API integrations\n- Terminal: AI-powered CLI tools (GitHub Copilot CLI)\n\n**Usage:**\n- Auto-complete is nice but weak\n- Use Cmd+I / Ctrl+I for inline generation\n- Describe in plain English in a comment, let AI implement\n- Especially powerful for boilerplate and tests\n\nCost-benefit: Free/low-cost, saves 2-3 hours daily.\n",
      "exampleCode": "// In VS Code with Copilot:\n// Write a function that debounces async operations\n// (Press Cmd+I, type this, let AI complete)\n\n// Or use inline generation:\n// 1. Select function signature\n// 2. Cmd+I: \"Implement with proper error handling and tests\"\n// 3. Accept/edit suggestion"
    },
    {
      "id": "tools-4",
      "title": "Multi-Model Chains: Use Two AIs Together",
      "content": "\nChain tools together for better results:\n1. Claude -> generates solution\n2. ChatGPT -> generates test cases\n3. Claude -> reviews both\n\nOr:\n1. ChatGPT -> research question\n2. Claude -> implement based on research\n\nCosts 2x tokens, saves 5x time on quality.\n",
      "exampleCode": "// Two-pass approach:\n// Pass 1 - Claude (better code quality):\n\"Generate authentication system: JWT, refresh tokens, role-based access\"\n\n// Pass 2 - ChatGPT (broader knowledge):\n\"Generate comprehensive tests for this auth system covering all edge cases\"\n\n// Pass 3 - Claude (review):\n\"Review these tests. Are they complete? What's missing?\""
    }
  ]
};
