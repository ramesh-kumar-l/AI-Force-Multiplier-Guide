export const advancedSection = {
  "id": "advanced",
  "title": "Advanced Techniques & Meta-Prompting",
  "iconKey": "brain",
  "color": "from-pink-600 to-rose-500",
  "cards": [
    {
      "id": "adv-1",
      "title": "Role-Playing: \"You Are a Security Expert\"",
      "content": "\nAssign a role to get specific thinking patterns:\n\"You are a security-focused code reviewer. Audit this code and list vulnerabilities.\"\n\"You are a performance engineer. What would you optimize first?\"\n\"You are a user experience designer. What's confusing about this UI?\"\n\nDifferent roles produce different insights.\n",
      "exampleCode": "\"You are an expert database architect. Review this schema:\n[schema]\n\nList: 1) Normalization issues, 2) Missing indexes, 3) Scalability problems, 4) Suggest improvements\""
    },
    {
      "id": "adv-2",
      "title": "The \"Generate the Opposite\" Technique",
      "content": "\nAsk for what you DON'T want:\n\"Generate the worst possible implementation of [feature]. Then refactor it into the best version.\"\n\nOften reveals anti-patterns to avoid.\n",
      "exampleCode": "\"Generate the WORST possible way to implement authentication. Then refactor it into the BEST way.\n\nShow: 1) Bad version (what to avoid), 2) Good version (production-ready), 3) Differences explained\""
    },
    {
      "id": "adv-3",
      "title": "Comparative Analysis: \"A vs B vs C\"",
      "content": "\nAsk for options then comparison table:\n\"I can implement this using: React Hooks, Context API, Redux, Zustand. Which is best for [constraints]?\"\n\nThen: \"Create a comparison table: boilerplate, performance, bundle size, learning curve\"\n\nForces AI to be specific rather than wishy-washy.\n",
      "exampleCode": "\"Compare approaches for real-time collaboration:\n- Operational transformation\n- CRDT (Conflict-free replicated data types)\n- Lock-based consensus\n\nTable with: complexity, latency, offline support, consistency, battle-tested examples\""
    },
    {
      "id": "adv-4",
      "title": "The \"Socratic Method\": Ask Why 5 Times",
      "content": "\nWhen understanding a problem:\n\"Why is this slow?\" -> \"Why is that?\" -> \"Why is that?\" -> \"Why is that?\" -> \"Why is that?\"\n\nEach \"why\" gets you closer to root cause.\n\nAI is good at playing the \"why\" game.\n",
      "exampleCode": "Q1: \"This database query is slow. Why?\"\nA1: \"Missing index on user_id\"\nQ2: \"Why is user_id missing?\"\nA2: \"Table structure doesn't expect filtering by user_id\"\nQ3: \"Why wasn't it expected?\"\nA3: \"Original schema designed for admin only access\""
    },
    {
      "id": "adv-5",
      "title": "Custom GPT/Claude Configuration: Persona as Code",
      "content": "\nCreate a \"system prompt\" persona and reuse it:\n\n\"You are [Role]. You specialize in [Domain]. When I ask questions:\n1. Always provide working code examples\n2. Point out gotchas and edge cases\n3. Suggest tests for correctness\n4. Recommend optimizations\n5. Format as: Explanation -> Code -> Tests\n\nRemember these constraints: [list them]\"\n\nSave this, reuse in every chat. Consistency compounding.\n",
      "exampleCode": "Save this as your standard opener:\n\n\"You are a production-focused backend engineer. When I ask code questions:\n1. Always provide async-safe implementations\n2. Include error handling\n3. Write type-safe code (TypeScript)\n4. Suggest relevant design patterns\n5. Point out performance implications\n6. Include tests\n\nContext: Building a real-time API. Assume 1000s of concurrent users. Database is PostgreSQL. Framework is Node.js/Express.\""
    }
  ]
};
