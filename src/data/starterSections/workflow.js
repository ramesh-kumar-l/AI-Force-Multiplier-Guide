export const workflowSection = {
  "id": "workflow",
  "title": "Complete Development Workflow",
  "iconKey": "rocket",
  "color": "from-violet-600 to-purple-500",
  "cards": [
    {
      "id": "workflow-1",
      "title": "The \"AI-First\" Development Process",
      "content": "\n**Phase 1: Design (AI) - 10 min**\n- Describe feature\n- Ask for architecture options\n- Choose best approach\n- Get rough API design\n\n**Phase 2: Implementation (AI) - 20 min**\n- Ask for skeleton code\n- Ask for implementation\n- Ask for edge cases\n- Ask for tests\n\n**Phase 3: Review (You) - 15 min**\n- Understand code\n- Run tests\n- Try it locally\n- Fix any issues\n\n**Phase 4: Deployment (You) - 5 min**\n- Commit with conventional messages\n- Push and deploy\n\n**Total: 50 minutes from idea to production**\n\nCompare to traditional: 3-4 hours\n",
      "exampleCode": "// Example conversation flow:\n\n[You]: I need a file upload system with progress tracking\n[AI]: Here are 3 approaches: multipart, chunked, presigned URLs. Chunked is best for your constraints.\n[AI]: Here's the API and database schema\n[You]: Good, implement the backend\n[AI]: [provides complete implementation]\n[You]: Add error handling for network failures\n[AI]: [adds retry logic]\n[You]: Generate tests\n[AI]: [provides comprehensive tests]\n[You]: Copy, test locally, push\n[You]: Done "
    },
    {
      "id": "workflow-2",
      "title": "The \"Context Persistence\" Pattern",
      "content": "\nKeep ONE long conversation per feature, not scattered chats.\n\nReasons:\n1. AI remembers decisions (no re-explaining)\n2. You can iterate easily (\"also add X\", \"change approach\", \"optimize\")\n3. Full conversation is your design document\n4. Easy to hand off to team member (send conversation link)\n\nEach conversation should be 1-3 features max. Don't mix projects.\n",
      "exampleCode": "// DON'T:\n- New chat for auth\n- New chat for validation\n- New chat for testing\n- New chat for optimization\n\n// DO:\n- One conversation: \"Auth system: design -> implement -> test -> optimize\"\n- Ask iteratively in same thread\n- Entire history is your spec document"
    },
    {
      "id": "workflow-3",
      "title": "Quick-Start Templates: Copy-Paste Prompts",
      "content": "\nSave your best prompts as templates. For common tasks:\n- \"Build a CRUD API endpoint\"\n- \"Create a form with validation\"\n- \"Set up authentication\"\n- \"Add analytics tracking\"\n- \"Performance audit this code\"\n\nTweak the saved prompt for each use.\n",
      "exampleCode": "// TEMPLATE: CRUD API\n\"I'm building a [resource name] API endpoint.\nRequirements:\n- [list requirements]\n- Validation: [rules]\n- Errors: [how to handle]\n- Testing: [what to test]\n- Tech: [Node/database/framework]\n\nProvide: 1) TypeScript types, 2) Implementation, 3) Tests, 4) Error handling\""
    },
    {
      "id": "workflow-4",
      "title": "Team Handoff: The \"Self-Documenting Conversation\"",
      "content": "\nWhen handing work to a team member:\n1. Share the AI conversation link (Claude, ChatGPT support sharing)\n2. Share the generated code\n3. Share tests\n\nTeammate can:\n- Read reasoning in conversation\n- Understand decisions\n- Continue iterating with same AI\n- No meeting needed\n\nSuper efficient onboarding for AI-assisted work.\n",
      "exampleCode": "// Instead of:\nMeeting: explain architecture\nEmail: send code\nSlack: answer questions\n\n// Do:\nSend: \"Read this conversation for full context: [link]\nCode is ready at: [file]\nTests are in: [test file]\nQuestions? Reply in chat or continue the conversation.\""
    }
  ]
};
