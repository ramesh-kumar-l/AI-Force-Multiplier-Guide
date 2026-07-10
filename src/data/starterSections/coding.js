export const codingSection = {
  "id": "coding",
  "title": "Development Workflow Hacks",
  "iconKey": "code",
  "color": "from-purple-600 to-pink-500",
  "cards": [
    {
      "id": "coding-1",
      "title": "The \"Spike -> Refactor\" Double Pass",
      "content": "\nPass 1: \"Spike\" - Ask for a working solution, no optimization.\nPass 2: Ask for a production-ready version with improvements.\n\nReason: AI often optimizes prematurely. Let it solve first, then clean.\n",
      "exampleCode": "// Pass 1:\n\"Write a function that finds all possible subsets of an array. Make it work, don't worry about efficiency.\"\n\n// Pass 2:\n\"Optimize this for space and time. Add memoization if helpful. Add JSDoc comments.\""
    },
    {
      "id": "coding-2",
      "title": "Context Compression: The File Summary Trick",
      "content": "\nLarge codebases exceed context limits. Instead of pasting entire files:\n\n1. Ask AI to create a SUMMARY of the file structure:\n   \"Summarize this codebase: what are the main exports, dependencies, and patterns?\"\n\n2. Then use that summary + specific functions you need help with.\n\nSaves 50-70% of tokens while keeping AI informed.\n",
      "exampleCode": "// Instead of pasting 500 lines:\n\"Summarize this auth.js file - I need to know: 1) Main exports, 2) How tokens are stored, 3) Key dependencies\"\n\nThen: \"Now, add a refresh token mechanism to [specific function]\""
    },
    {
      "id": "coding-3",
      "title": "Atomic Commits via AI: Ask for Testable Chunks",
      "content": "\nAsk AI to split work into small, testable, independently deployable pieces.\n\nThis prevents:\n- Massive diffs that reviewers hate\n- Debugging 15 things at once\n- Merge conflicts\n\nPro move: Ask AI to generate commit messages following conventional commits.\n",
      "exampleCode": "\"Break this feature into the smallest independently-testable chunks. For each:\n1. List files to create/modify\n2. Describe what it does\n3. Suggest a test\n4. Write a conventional commit message\"\n\nExample breakdown:\n- feat: Add user auth schema to database\n- feat: Implement sign-up endpoint\n- feat: Add sign-up form UI\n- test: Integration tests for auth flow"
    },
    {
      "id": "coding-4",
      "title": "Type-First Development: Ask for Types Before Code",
      "content": "\nFor TypeScript projects, ask for:\n1. Interface/Type definitions FIRST\n2. Then implementation\n\nAI is often better at data structure design than logic. This creates a contract before implementation.\n",
      "exampleCode": "// Pass 1:\n\"Design TypeScript interfaces for a payment system. Consider: transactions, refunds, status states, validation.\"\n\n// Pass 2:\n\"Now implement functions to process transactions using these types. Ensure type safety.\""
    },
    {
      "id": "coding-5",
      "title": "The \"Test-Driven Reverse\": Ask for Tests First",
      "content": "\nReverse TDD:\n1. Ask AI to generate comprehensive test cases for a feature\n2. Then ask for code that passes those tests\n\nThis clarifies requirements and prevents scope creep.\n",
      "exampleCode": "\"Generate comprehensive Jest tests for a password validator that:\n- Requires 8+ chars\n- Needs uppercase + lowercase\n- Needs at least one number\n- Special chars optional but encouraged\n\nInclude edge cases and error messages.\""
    },
    {
      "id": "coding-6",
      "title": "Debug Pair Programming: The \"Trace Through\" Method",
      "content": "\nWhen code is broken:\n1. Paste the broken code\n2. Paste the error + context\n3. Ask: \"Walk me through the execution path. Where does it fail?\"\n4. Follow up: \"How do we fix step [number]?\"\n\nThis creates a debugging partner that explains reasoning.\n",
      "exampleCode": "Prompt:\n\"This function throws 'Cannot read property of undefined' at line 15. Walk me through execution:\n- Input: [example]\n- Expected output: [example]\n- Error: [full stack trace]\n\nWhere does it break and why?\""
    }
  ]
};
