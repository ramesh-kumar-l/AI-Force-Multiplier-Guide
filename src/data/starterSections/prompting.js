export const promptingSection = {
  "id": "prompting",
  "title": "Prompt Engineering Mastery",
  "iconKey": "brain",
  "color": "from-blue-600 to-cyan-500",
  "cards": [
    {
      "id": "prompting-1",
      "title": "The CONTEXT-TASK-CONSTRAINTS Framework",
      "content": "\n**Give AI the full picture:**\n- **Context**: What problem are you solving? Who is the end user? What's the domain?\n- **Task**: What exactly do you need? Be specific about format, structure, scope.\n- **Constraints**: Performance requirements, tech stack, file size limits, audience level.\n\nExample: \"I'm building a real-time stock dashboard (context) that needs a React component showing market data (task) using only free APIs, max 50KB bundle size (constraints).\"\n\nThis beats: \"Make a stock dashboard\"\n",
      "exampleCode": "// DON'T:\n\"Generate a form\"\n\n// DO:\n\"I'm building a SaaS product for fitness trainers. I need a React form that captures client measurements (weight, height, body fat %) with real-time metric/imperial unit conversion. Users are non-technical trainers, so errors should be friendly. Validate positive numbers and store in a flat JSON structure. Must work offline.\""
    },
    {
      "id": "prompting-2",
      "title": "Chain-of-Thought Prompting for Complex Logic",
      "content": "\nForce the AI to **think through the problem step-by-step** instead of jumping to exampleCode:\n\n1. Ask it to explain the approach first\n2. Then ask for implementation\n3. Then ask for edge cases\n\nThis prevents hallucinated solutions and catches logical errors early.\n",
      "exampleCode": "// Ask in stages:\n\n// Stage 1 - Reasoning:\n\"I need to match payments to invoices. Explain the algorithm considering: 1) overpayments, 2) partial payments, 3) invoice order (FIFO vs date-based). What approach is best?\"\n\n// Stage 2 - Code:\n\"Now implement that algorithm in TypeScript with full comments\"\n\n// Stage 3 - Edge cases:\n\"What breaks this? Give me test cases for edge cases.\""
    },
    {
      "id": "prompting-3",
      "title": "Few-Shot Prompting: Show, Don't Tell",
      "content": "\nInstead of describing what you want, **show examples** of input -> output. AI learns patterns 3x faster this way.\n\nEspecially powerful for:\n- Code style consistency\n- Specific formatting\n- Domain-specific terminology\n- Tone/voice for writing\n",
      "exampleCode": "// DON'T describe the pattern:\n\"Generate 5 product names that are punchy and startup-like\"\n\n// DO show examples:\n\"Generate 5 more product names in this style:\n- Existing names: Stripe, Figma, Notion, Loom, Airtable\n- Pattern: Short (1-2 syllables), memorable, tech-forward but not try-hard\n- Generate 5 more following this exact pattern\""
    },
    {
      "id": "prompting-4",
      "title": "Iterative Refinement: The Conversation Loop",
      "content": "\nDon't start over-**build on what you have**. Each question should refine the previous output.\n\nEffective patterns:\n1. \"Add [feature] to this\"\n2. \"Simplify the [section] part\"\n3. \"Make it more [characteristic]\"\n4. \"What if we change [assumption]?\"\n\nThis creates institutional knowledge in a single conversation vs scattered chats.\n",
      "exampleCode": "// Conversation progression:\nQ1: \"Write a progress bar component\"\nQ2: \"Add animated segment transitions\"\nQ3: \"Make it support rtl mode\"\nQ4: \"Use CSS instead of SVG for better perf\"\nQ5: \"Add accessibility attributes\"\n// You now have a production-ready component iteratively refined"
    },
    {
      "id": "prompting-5",
      "title": "The \"Rubber Duck\" Anti-Pattern Hack",
      "content": "\nUse Claude/ChatGPT as a rubber duck debugger:\n- Paste your broken code\n- Ask \"What's wrong with this?\"\n- Force it to explain line-by-line\n\nOften **you** will spot the bug while the AI explains, OR the AI catches it. Either way, you win.\n\nBonus: Use \"Explain this code to a 10-year-old\" to catch overengineering.\n",
      "exampleCode": "Paste your code, then ask:\n\"Walk me through what this function does, step by step. What should happen at each line?\"\n\nOr: \"Explain to someone who's never programmed before what this code does.\""
    }
  ]
};
