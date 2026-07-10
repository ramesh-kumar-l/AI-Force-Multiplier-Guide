export const velocitySection = {
  "id": "velocity",
  "title": "Velocity Multipliers: Rapid Development",
  "iconKey": "zap",
  "color": "from-cyan-600 to-blue-500",
  "cards": [
    {
      "id": "vel-1",
      "title": "Boilerplate Generation: The \"Scaffold Everything\"",
      "content": "\nDon't write boilerplate. Ask for:\n1. Full project structure\n2. Configuration files\n3. Example components\n4. Test setup\n5. CI/CD config\n\nTakes 30 seconds of prompting, saves hours of setup.\n",
      "exampleCode": "\"Generate a complete Next.js project scaffold:\n- With TypeScript\n- Tailwind CSS\n- Testing setup (Jest + React Testing Library)\n- .gitignore, ESLint, Prettier\n- Example pages and components\n- Environment configuration\n- Basic CI/CD GitHub Actions\""
    },
    {
      "id": "vel-2",
      "title": "Documentation Generation: Ask for \"Self-Documenting Code\"",
      "content": "\nInstead of writing docs separately:\n\"Write this with comprehensive JSDoc comments. Include: types, params, return values, examples, edge cases.\"\n\nThen ask: \"Generate markdown documentation from these comments.\"\n\nDocs stay in sync with code.\n",
      "exampleCode": "\"Write this function with JSDoc so complete you could auto-generate docs:\n\n[describe function]\n\nThen: 'Generate markdown documentation from these comments.'\""
    },
    {
      "id": "vel-3",
      "title": "Configuration as Code: The \"AI Config Generator\"",
      "content": "\nAsk for any config file:\n- Webpack config optimized for your use case\n- GitHub Actions CI/CD\n- Docker multi-stage builds\n- Terraform infrastructure\n- ESLint/Prettier rules\n\nUsually better than defaults and exactly tailored.\n",
      "exampleCode": "\"Generate a production-ready GitHub Actions workflow for:\n- Node.js app\n- Run tests on PR\n- Deploy to staging on merge\n- Manual approval for production\n- Slack notifications on failure\""
    },
    {
      "id": "vel-4",
      "title": "The \"Copy-Paste Ready\" Requirement",
      "content": "\nAlways specify: \"Format this so I can copy-paste directly into [file/tool]. No explanations needed in the output.\"\n\nThis removes back-and-forth cleanup time.\n",
      "exampleCode": "\"Generate .env.example file for a Node.js/React app. Format as copy-paste ready, no markdown code blocks.\""
    },
    {
      "id": "vel-5",
      "title": "Batch Processing: The \"Give Me Everything\" Approach",
      "content": "\nInstead of asking one thing at a time:\n\"Generate: 1) Component code, 2) Tests, 3) Storybook stories, 4) Types, 5) Docs. In one response.\"\n\nGet a complete deliverable in one round-trip.\n",
      "exampleCode": "\"For a Modal component, provide:\n1. Full React component (TypeScript)\n2. Jest tests covering open/close/escape key\n3. Storybook stories (default, with custom header, with form)\n4. Type definitions\n5. Props documentation\n\nAll in one response.\""
    }
  ]
};
