export const starterGuideSections = [
    {
      id: 'prompting',
      title: 'Prompt Engineering Mastery',
      iconKey: 'brain',
      color: 'from-blue-600 to-cyan-500',
      cards: [
        {
          id: 'prompting-1',
          title: 'The CONTEXT-TASK-CONSTRAINTS Framework',
          content: `
**Give AI the full picture:**
- **Context**: What problem are you solving? Who is the end user? What's the domain?
- **Task**: What exactly do you need? Be specific about format, structure, scope.
- **Constraints**: Performance requirements, tech stack, file size limits, audience level.

Example: "I'm building a real-time stock dashboard (context) that needs a React component showing market data (task) using only free APIs, max 50KB bundle size (constraints)."

This beats: "Make a stock dashboard"
`,
          exampleCode: `// DON'T:
"Generate a form"

// DO:
"I'm building a SaaS product for fitness trainers. I need a React form that captures client measurements (weight, height, body fat %) with real-time metric/imperial unit conversion. Users are non-technical trainers, so errors should be friendly. Validate positive numbers and store in a flat JSON structure. Must work offline."`
        },
        {
          id: 'prompting-2',
          title: 'Chain-of-Thought Prompting for Complex Logic',
          content: `
Force the AI to **think through the problem step-by-step** instead of jumping to exampleCode:

1. Ask it to explain the approach first
2. Then ask for implementation
3. Then ask for edge cases

This prevents hallucinated solutions and catches logical errors early.
`,
          exampleCode: `// Ask in stages:

// Stage 1 - Reasoning:
"I need to match payments to invoices. Explain the algorithm considering: 1) overpayments, 2) partial payments, 3) invoice order (FIFO vs date-based). What approach is best?"

// Stage 2 - Code:
"Now implement that algorithm in TypeScript with full comments"

// Stage 3 - Edge cases:
"What breaks this? Give me test cases for edge cases."`
        },
        {
          id: 'prompting-3',
          title: 'Few-Shot Prompting: Show, Don\'t Tell',
          content: `
Instead of describing what you want, **show examples** of input -> output. AI learns patterns 3x faster this way.

Especially powerful for:
- Code style consistency
- Specific formatting
- Domain-specific terminology
- Tone/voice for writing
`,
          exampleCode: `// DON'T describe the pattern:
"Generate 5 product names that are punchy and startup-like"

// DO show examples:
"Generate 5 more product names in this style:
- Existing names: Stripe, Figma, Notion, Loom, Airtable
- Pattern: Short (1-2 syllables), memorable, tech-forward but not try-hard
- Generate 5 more following this exact pattern"`
        },
        {
          id: 'prompting-4',
          title: 'Iterative Refinement: The Conversation Loop',
          content: `
Don't start over-**build on what you have**. Each question should refine the previous output.

Effective patterns:
1. "Add [feature] to this"
2. "Simplify the [section] part"
3. "Make it more [characteristic]"
4. "What if we change [assumption]?"

This creates institutional knowledge in a single conversation vs scattered chats.
`,
          exampleCode: `// Conversation progression:
Q1: "Write a progress bar component"
Q2: "Add animated segment transitions"
Q3: "Make it support rtl mode"
Q4: "Use CSS instead of SVG for better perf"
Q5: "Add accessibility attributes"
// You now have a production-ready component iteratively refined`
        },
        {
          id: 'prompting-5',
          title: 'The "Rubber Duck" Anti-Pattern Hack',
          content: `
Use Claude/ChatGPT as a rubber duck debugger:
- Paste your broken code
- Ask "What's wrong with this?"
- Force it to explain line-by-line

Often **you** will spot the bug while the AI explains, OR the AI catches it. Either way, you win.

Bonus: Use "Explain this code to a 10-year-old" to catch overengineering.
`,
          exampleCode: `Paste your code, then ask:
"Walk me through what this function does, step by step. What should happen at each line?"

Or: "Explain to someone who's never programmed before what this code does."`
        }
      ]
    },
    {
      id: 'coding',
      title: 'Development Workflow Hacks',
      iconKey: 'code',
      color: 'from-purple-600 to-pink-500',
      cards: [
        {
          id: 'coding-1',
          title: 'The "Spike -> Refactor" Double Pass',
          content: `
Pass 1: "Spike" - Ask for a working solution, no optimization.
Pass 2: Ask for a production-ready version with improvements.

Reason: AI often optimizes prematurely. Let it solve first, then clean.
`,
          exampleCode: `// Pass 1:
"Write a function that finds all possible subsets of an array. Make it work, don't worry about efficiency."

// Pass 2:
"Optimize this for space and time. Add memoization if helpful. Add JSDoc comments."`
        },
        {
          id: 'coding-2',
          title: 'Context Compression: The File Summary Trick',
          content: `
Large codebases exceed context limits. Instead of pasting entire files:

1. Ask AI to create a SUMMARY of the file structure:
   "Summarize this codebase: what are the main exports, dependencies, and patterns?"

2. Then use that summary + specific functions you need help with.

Saves 50-70% of tokens while keeping AI informed.
`,
          exampleCode: `// Instead of pasting 500 lines:
"Summarize this auth.js file - I need to know: 1) Main exports, 2) How tokens are stored, 3) Key dependencies"

Then: "Now, add a refresh token mechanism to [specific function]"`
        },
        {
          id: 'coding-3',
          title: 'Atomic Commits via AI: Ask for Testable Chunks',
          content: `
Ask AI to split work into small, testable, independently deployable pieces.

This prevents:
- Massive diffs that reviewers hate
- Debugging 15 things at once
- Merge conflicts

Pro move: Ask AI to generate commit messages following conventional commits.
`,
          exampleCode: `"Break this feature into the smallest independently-testable chunks. For each:
1. List files to create/modify
2. Describe what it does
3. Suggest a test
4. Write a conventional commit message"

Example breakdown:
- feat: Add user auth schema to database
- feat: Implement sign-up endpoint
- feat: Add sign-up form UI
- test: Integration tests for auth flow`
        },
        {
          id: 'coding-4',
          title: 'Type-First Development: Ask for Types Before Code',
          content: `
For TypeScript projects, ask for:
1. Interface/Type definitions FIRST
2. Then implementation

AI is often better at data structure design than logic. This creates a contract before implementation.
`,
          exampleCode: `// Pass 1:
"Design TypeScript interfaces for a payment system. Consider: transactions, refunds, status states, validation."

// Pass 2:
"Now implement functions to process transactions using these types. Ensure type safety."`
        },
        {
          id: 'coding-5',
          title: 'The "Test-Driven Reverse": Ask for Tests First',
          content: `
Reverse TDD:
1. Ask AI to generate comprehensive test cases for a feature
2. Then ask for code that passes those tests

This clarifies requirements and prevents scope creep.
`,
          exampleCode: `"Generate comprehensive Jest tests for a password validator that:
- Requires 8+ chars
- Needs uppercase + lowercase
- Needs at least one number
- Special chars optional but encouraged

Include edge cases and error messages."`
        },
        {
          id: 'coding-6',
          title: 'Debug Pair Programming: The "Trace Through" Method',
          content: `
When code is broken:
1. Paste the broken code
2. Paste the error + context
3. Ask: "Walk me through the execution path. Where does it fail?"
4. Follow up: "How do we fix step [number]?"

This creates a debugging partner that explains reasoning.
`,
          exampleCode: `Prompt:
"This function throws 'Cannot read property of undefined' at line 15. Walk me through execution:
- Input: [example]
- Expected output: [example]
- Error: [full stack trace]

Where does it break and why?"`
        }
      ]
    },
    {
      id: 'optimization',
      title: 'Optimization & Performance Hacks',
      iconKey: 'zap',
      color: 'from-orange-600 to-red-500',
      cards: [
        {
          id: 'opt-1',
          title: 'Performance Auditing: Ask for Bottleneck Analysis',
          content: `
Paste code + description of what's slow, ask:
"What are the performance bottlenecks in this code? Rank them by impact. Suggest fixes for the top 3."

AI is good at spotting:
- N+1 queries
- Unnecessary re-renders
- Missing memoization
- Inefficient algorithms
`,
          exampleCode: `"This React component feels sluggish. Analyze for performance issues:
[paste component code]
Specifically check: re-renders, useMemo opportunities, array operations, API calls."`
        },
        {
          id: 'opt-2',
          title: 'Algorithmic Complexity: Ask for Big-O Analysis',
          content: `
Paste an algorithm, ask:
"What's the time and space complexity of this? Can we do better?"

Follow with: "Rewrite this to be O(n) instead of O(n^2)"

AI can usually optimize if a better algorithm exists.
`,
          exampleCode: `"Analyze this function's complexity and suggest an optimal solution:
[paste code]

Also provide: 1) Original complexity, 2) Optimized complexity, 3) Trade-offs"`
        },
        {
          id: 'opt-3',
          title: 'Bundle Size Reduction: Ask for Tree-Shake Safe Code',
          content: `
When adding features:
"Write this feature to be maximally tree-shakeable. Avoid side effects. Use ESM syntax. Comment what can be removed."

Can save 20-40% bundle size with the right patterns.
`,
          exampleCode: `"Implement user analytics tracking as tree-shakeable modules:
- Only import what's used
- No global side effects
- ESM syntax only
- Suggest import strategy for apps that don't need it"`
        },
        {
          id: 'opt-4',
          title: 'The "Premature Optimization" Check',
          content: `
Before optimizing, ask:
"Is this actually a bottleneck? How would we measure it? What's the current vs target metric?"

AI will call out premature optimization you don't need. Saves time on yak shaving.
`,
          exampleCode: `"I'm thinking of optimizing [feature]. Help me:
1. Quantify if it's actually slow
2. Suggest metrics to measure
3. Identify what to optimize first
4. Is this premature optimization?"`
        }
      ]
    },
    {
      id: 'testing',
      title: 'Testing & Quality Assurance',
      iconKey: 'lightbulb',
      color: 'from-green-600 to-emerald-500',
      cards: [
        {
          id: 'test-1',
          title: 'Edge Case Generation: Ask for "How Can This Break?"',
          content: `
For any feature, ask:
"Generate 20 test cases that would break this. Include: boundary cases, null/undefined, empty collections, massive inputs, race conditions, invalid types."

This catches bugs before production.
`,
          exampleCode: `"Generate comprehensive test cases for this payment function:
- Amounts: $0, negative, huge, decimals with rounding
- Edge cases: null input, concurrent calls, network errors
- Integration: database failures, timeout scenarios"`
        },
        {
          id: 'test-2',
          title: 'Mutation Testing: Ask for "What Would Break This Test?"',
          content: `
Paste your tests, ask:
"What code changes would this test NOT catch? Generate mutations that pass the tests but are wrong."

Reveals test gaps immediately.
`,
          exampleCode: `"Analyze these tests for gaps:
[paste test code]

Generate 10 mutations of the actual code that would pass these tests but are logically wrong."`
        },
        {
          id: 'test-3',
          title: 'Integration Test Scenarios: The User Story Approach',
          content: `
Instead of unit tests only, describe a user workflow:
"User signs up -> creates project -> invites team -> sets permissions. Write tests covering this flow."

AI will create realistic integration tests.
`,
          exampleCode: `"Write E2E tests for this user journey:
1. User signs up with email
2. Verifies email link
3. Creates first project
4. Uploads dataset
5. Runs analysis
6. Shares results

Cover success and error paths."`
        },
        {
          id: 'test-4',
          title: 'Documentation Through Tests: The "Living Docs" Pattern',
          content: `
Write tests that also serve as documentation:
"Generate tests that read like documentation. Each test should show: what it tests, expected behavior, edge case explanation."

Test names become spec docs.
`,
          exampleCode: `"Write tests for payment processing that double as documentation:
- Test name explains the scenario
- Comments explain business logic
- Assertions are crystal clear
- Someone reading tests understands the system"`
        }
      ]
    },
    {
      id: 'architecture',
      title: 'Architecture & Systems Design',
      iconKey: 'rocket',
      color: 'from-indigo-600 to-blue-500',
      cards: [
        {
          id: 'arch-1',
          title: 'Design Review: Ask for "What Could Go Wrong?"',
          content: `
Paste your architecture/design, ask:
"Critique this design. What are the failure modes? Scalability issues? What would break with 1M users?"

AI often spots issues experienced engineers would catch in code review.
`,
          exampleCode: `"Review this architecture for a real-time collaboration app:
[paste design/diagram description]

Identify: 1) Bottlenecks, 2) Single points of failure, 3) Scalability issues, 4) Security gaps"`
        },
        {
          id: 'arch-2',
          title: 'Pattern Recommendation: Ask for the "Best Pattern"',
          content: `
Describe your constraint, ask:
"I need to [requirement]. What's the best architectural pattern? Pros/cons of each approach?"

Examples:
- Caching strategies (TTL vs LRU vs event-driven)
- State management patterns
- Database sharding strategies
- Microservices vs monolith
`,
          exampleCode: `"I need to cache frequently accessed data that changes unpredictably. Options:
1. Simple TTL cache (60 seconds)
2. Event-driven cache invalidation
3. LRU cache with manual refresh

What's best given: 1M daily users, P99 latency < 100ms, 85% cache hit target?"`
        },
        {
          id: 'arch-3',
          title: 'The "What\'s The Cost?" Analysis',
          content: `
Ask for cost implications of design choices:
"I'm choosing between [option A] and [option B]. What are the operational/financial costs? Latency differences?"

Prevents choosing "technically elegant" solutions that cost 10x more.
`,
          exampleCode: `"Compare these database strategies:
A) Single PostgreSQL with vertical scaling
B) Sharded PostgreSQL with read replicas
C) MongoDB for flexibility

For 1M records growing to 1B: costs, latency, operational complexity?"`
        },
        {
          id: 'arch-4',
          title: 'Migration Planning: Ask for "How Do We Get There?"',
          content: `
Instead of redesigning from scratch, ask:
"Our current system is [X]. We want [Y]. What's the migration plan? What's the minimum viable change?"

Forces incremental, safe transitions.
`,
          exampleCode: `"We're currently: Monolithic Node.js app, single database
Goal: Microservices + separate databases + async messaging

Give me: 1) Migration phases, 2) What's safe to deploy first, 3) Rollback plans"`
        }
      ]
    },
    {
      id: 'velocity',
      title: 'Velocity Multipliers: Rapid Development',
      iconKey: 'zap',
      color: 'from-cyan-600 to-blue-500',
      cards: [
        {
          id: 'vel-1',
          title: 'Boilerplate Generation: The "Scaffold Everything"',
          content: `
Don't write boilerplate. Ask for:
1. Full project structure
2. Configuration files
3. Example components
4. Test setup
5. CI/CD config

Takes 30 seconds of prompting, saves hours of setup.
`,
          exampleCode: `"Generate a complete Next.js project scaffold:
- With TypeScript
- Tailwind CSS
- Testing setup (Jest + React Testing Library)
- .gitignore, ESLint, Prettier
- Example pages and components
- Environment configuration
- Basic CI/CD GitHub Actions"`
        },
        {
          id: 'vel-2',
          title: 'Documentation Generation: Ask for "Self-Documenting Code"',
          content: `
Instead of writing docs separately:
"Write this with comprehensive JSDoc comments. Include: types, params, return values, examples, edge cases."

Then ask: "Generate markdown documentation from these comments."

Docs stay in sync with code.
`,
          exampleCode: `"Write this function with JSDoc so complete you could auto-generate docs:

[describe function]

Then: 'Generate markdown documentation from these comments.'"`
        },
        {
          id: 'vel-3',
          title: 'Configuration as Code: The "AI Config Generator"',
          content: `
Ask for any config file:
- Webpack config optimized for your use case
- GitHub Actions CI/CD
- Docker multi-stage builds
- Terraform infrastructure
- ESLint/Prettier rules

Usually better than defaults and exactly tailored.
`,
          exampleCode: `"Generate a production-ready GitHub Actions workflow for:
- Node.js app
- Run tests on PR
- Deploy to staging on merge
- Manual approval for production
- Slack notifications on failure"`
        },
        {
          id: 'vel-4',
          title: 'The "Copy-Paste Ready" Requirement',
          content: `
Always specify: "Format this so I can copy-paste directly into [file/tool]. No explanations needed in the output."

This removes back-and-forth cleanup time.
`,
          exampleCode: `"Generate .env.example file for a Node.js/React app. Format as copy-paste ready, no markdown code blocks."`
        },
        {
          id: 'vel-5',
          title: 'Batch Processing: The "Give Me Everything" Approach',
          content: `
Instead of asking one thing at a time:
"Generate: 1) Component code, 2) Tests, 3) Storybook stories, 4) Types, 5) Docs. In one response."

Get a complete deliverable in one round-trip.
`,
          exampleCode: `"For a Modal component, provide:
1. Full React component (TypeScript)
2. Jest tests covering open/close/escape key
3. Storybook stories (default, with custom header, with form)
4. Type definitions
5. Props documentation

All in one response."`
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Techniques & Meta-Prompting',
      iconKey: 'brain',
      color: 'from-pink-600 to-rose-500',
      cards: [
        {
          id: 'adv-1',
          title: 'Role-Playing: "You Are a Security Expert"',
          content: `
Assign a role to get specific thinking patterns:
"You are a security-focused code reviewer. Audit this code and list vulnerabilities."
"You are a performance engineer. What would you optimize first?"
"You are a user experience designer. What's confusing about this UI?"

Different roles produce different insights.
`,
          exampleCode: `"You are an expert database architect. Review this schema:
[schema]

List: 1) Normalization issues, 2) Missing indexes, 3) Scalability problems, 4) Suggest improvements"`
        },
        {
          id: 'adv-2',
          title: 'The "Generate the Opposite" Technique',
          content: `
Ask for what you DON'T want:
"Generate the worst possible implementation of [feature]. Then refactor it into the best version."

Often reveals anti-patterns to avoid.
`,
          exampleCode: `"Generate the WORST possible way to implement authentication. Then refactor it into the BEST way.

Show: 1) Bad version (what to avoid), 2) Good version (production-ready), 3) Differences explained"`
        },
        {
          id: 'adv-3',
          title: 'Comparative Analysis: "A vs B vs C"',
          content: `
Ask for options then comparison table:
"I can implement this using: React Hooks, Context API, Redux, Zustand. Which is best for [constraints]?"

Then: "Create a comparison table: boilerplate, performance, bundle size, learning curve"

Forces AI to be specific rather than wishy-washy.
`,
          exampleCode: `"Compare approaches for real-time collaboration:
- Operational transformation
- CRDT (Conflict-free replicated data types)
- Lock-based consensus

Table with: complexity, latency, offline support, consistency, battle-tested examples"`
        },
        {
          id: 'adv-4',
          title: 'The "Socratic Method": Ask Why 5 Times',
          content: `
When understanding a problem:
"Why is this slow?" -> "Why is that?" -> "Why is that?" -> "Why is that?" -> "Why is that?"

Each "why" gets you closer to root cause.

AI is good at playing the "why" game.
`,
          exampleCode: `Q1: "This database query is slow. Why?"
A1: "Missing index on user_id"
Q2: "Why is user_id missing?"
A2: "Table structure doesn't expect filtering by user_id"
Q3: "Why wasn't it expected?"
A3: "Original schema designed for admin only access"`
        },
        {
          id: 'adv-5',
          title: 'Custom GPT/Claude Configuration: Persona as Code',
          content: `
Create a "system prompt" persona and reuse it:

"You are [Role]. You specialize in [Domain]. When I ask questions:
1. Always provide working code examples
2. Point out gotchas and edge cases
3. Suggest tests for correctness
4. Recommend optimizations
5. Format as: Explanation -> Code -> Tests

Remember these constraints: [list them]"

Save this, reuse in every chat. Consistency compounding.
`,
          exampleCode: `Save this as your standard opener:

"You are a production-focused backend engineer. When I ask code questions:
1. Always provide async-safe implementations
2. Include error handling
3. Write type-safe code (TypeScript)
4. Suggest relevant design patterns
5. Point out performance implications
6. Include tests

Context: Building a real-time API. Assume 1000s of concurrent users. Database is PostgreSQL. Framework is Node.js/Express."`
        }
      ]
    },
    {
      id: 'tools',
      title: 'Tool Selection & Integration',
      iconKey: 'settings',
      color: 'from-slate-600 to-gray-500',
      cards: [
        {
          id: 'tools-1',
          title: 'Claude vs ChatGPT vs Others: When to Use What',
          content: `
**Claude (Anthropic):**
- Better for: Long documents, complex reasoning, code quality, safety analysis, creative writing
- Best for: Deep analysis, refactoring, architecture decisions
- Context: 200K tokens (vs ChatGPT 128K)

**ChatGPT (OpenAI):**
- Better for: Web search, latest data, broad knowledge
- Best for: Quick facts, internet-aware questions
- Best for: DALL-E integration if needed

**Strategy:** Use Claude for development work, ChatGPT for research/knowledge.
`,
          exampleCode: `Claude: "Refactor this 500-line module to microservices. Show architecture trade-offs."

ChatGPT: "What are the latest best practices in React 2025?"

Claude: "Debug why this distributed cache is inconsistent"

ChatGPT: "What's the current exchange rate for crypto?"`
        },
        {
          id: 'tools-2',
          title: 'API Usage: Programmatic AI as a Tool',
          content: `
Don't use just the web interface. Use APIs:
- Batch process code reviews via Claude API
- Auto-generate test cases in CI/CD
- Real-time code suggestions in your IDE
- Automated documentation generation
- Scheduled architecture audits

Cost: ~$0.01 per 1K tokens. Saves hours.
`,
          exampleCode: `// Example: Auto-generate tests on git commit
const { Anthropic } = require("@anthropic-ai/sdk");

async function generateTests(functionCode) {
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-opus-4-20250514",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: \`Generate comprehensive Jest tests for this function:
\${functionCode}\`
      }
    ]
  });
  return response.content[0].text;
}`
        },
        {
          id: 'tools-3',
          title: 'IDE Integration: The "AI Pair Programmer"',
          content: `
**Setup:**
- VS Code: GitHub Copilot, Codeium (free tier)
- IDE inline: Use Claude or ChatGPT API integrations
- Terminal: AI-powered CLI tools (GitHub Copilot CLI)

**Usage:**
- Auto-complete is nice but weak
- Use Cmd+I / Ctrl+I for inline generation
- Describe in plain English in a comment, let AI implement
- Especially powerful for boilerplate and tests

Cost-benefit: Free/low-cost, saves 2-3 hours daily.
`,
          exampleCode: `// In VS Code with Copilot:
// Write a function that debounces async operations
// (Press Cmd+I, type this, let AI complete)

// Or use inline generation:
// 1. Select function signature
// 2. Cmd+I: "Implement with proper error handling and tests"
// 3. Accept/edit suggestion`
        },
        {
          id: 'tools-4',
          title: 'Multi-Model Chains: Use Two AIs Together',
          content: `
Chain tools together for better results:
1. Claude -> generates solution
2. ChatGPT -> generates test cases
3. Claude -> reviews both

Or:
1. ChatGPT -> research question
2. Claude -> implement based on research

Costs 2x tokens, saves 5x time on quality.
`,
          exampleCode: `// Two-pass approach:
// Pass 1 - Claude (better code quality):
"Generate authentication system: JWT, refresh tokens, role-based access"

// Pass 2 - ChatGPT (broader knowledge):
"Generate comprehensive tests for this auth system covering all edge cases"

// Pass 3 - Claude (review):
"Review these tests. Are they complete? What's missing?"`
        }
      ]
    },
    {
      id: 'workflow',
      title: 'Complete Development Workflow',
      iconKey: 'rocket',
      color: 'from-violet-600 to-purple-500',
      cards: [
        {
          id: 'workflow-1',
          title: 'The "AI-First" Development Process',
          content: `
**Phase 1: Design (AI) - 10 min**
- Describe feature
- Ask for architecture options
- Choose best approach
- Get rough API design

**Phase 2: Implementation (AI) - 20 min**
- Ask for skeleton code
- Ask for implementation
- Ask for edge cases
- Ask for tests

**Phase 3: Review (You) - 15 min**
- Understand code
- Run tests
- Try it locally
- Fix any issues

**Phase 4: Deployment (You) - 5 min**
- Commit with conventional messages
- Push and deploy

**Total: 50 minutes from idea to production**

Compare to traditional: 3-4 hours
`,
          exampleCode: `// Example conversation flow:

[You]: I need a file upload system with progress tracking
[AI]: Here are 3 approaches: multipart, chunked, presigned URLs. Chunked is best for your constraints.
[AI]: Here's the API and database schema
[You]: Good, implement the backend
[AI]: [provides complete implementation]
[You]: Add error handling for network failures
[AI]: [adds retry logic]
[You]: Generate tests
[AI]: [provides comprehensive tests]
[You]: Copy, test locally, push
[You]: Done `
        },
        {
          id: 'workflow-2',
          title: 'The "Context Persistence" Pattern',
          content: `
Keep ONE long conversation per feature, not scattered chats.

Reasons:
1. AI remembers decisions (no re-explaining)
2. You can iterate easily ("also add X", "change approach", "optimize")
3. Full conversation is your design document
4. Easy to hand off to team member (send conversation link)

Each conversation should be 1-3 features max. Don't mix projects.
`,
          exampleCode: `// DON'T:
- New chat for auth
- New chat for validation
- New chat for testing
- New chat for optimization

// DO:
- One conversation: "Auth system: design -> implement -> test -> optimize"
- Ask iteratively in same thread
- Entire history is your spec document`
        },
        {
          id: 'workflow-3',
          title: 'Quick-Start Templates: Copy-Paste Prompts',
          content: `
Save your best prompts as templates. For common tasks:
- "Build a CRUD API endpoint"
- "Create a form with validation"
- "Set up authentication"
- "Add analytics tracking"
- "Performance audit this code"

Tweak the saved prompt for each use.
`,
          exampleCode: `// TEMPLATE: CRUD API
"I'm building a [resource name] API endpoint.
Requirements:
- [list requirements]
- Validation: [rules]
- Errors: [how to handle]
- Testing: [what to test]
- Tech: [Node/database/framework]

Provide: 1) TypeScript types, 2) Implementation, 3) Tests, 4) Error handling"`
        },
        {
          id: 'workflow-4',
          title: 'Team Handoff: The "Self-Documenting Conversation"',
          content: `
When handing work to a team member:
1. Share the AI conversation link (Claude, ChatGPT support sharing)
2. Share the generated code
3. Share tests

Teammate can:
- Read reasoning in conversation
- Understand decisions
- Continue iterating with same AI
- No meeting needed

Super efficient onboarding for AI-assisted work.
`,
          exampleCode: `// Instead of:
Meeting: explain architecture
Email: send code
Slack: answer questions

// Do:
Send: "Read this conversation for full context: [link]
Code is ready at: [file]
Tests are in: [test file]
Questions? Reply in chat or continue the conversation."`
        }
      ]
    }
  ];
