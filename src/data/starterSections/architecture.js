export const architectureSection = {
  "id": "architecture",
  "title": "Architecture & Systems Design",
  "iconKey": "rocket",
  "color": "from-indigo-600 to-blue-500",
  "cards": [
    {
      "id": "arch-1",
      "title": "Design Review: Ask for \"What Could Go Wrong?\"",
      "content": "\nPaste your architecture/design, ask:\n\"Critique this design. What are the failure modes? Scalability issues? What would break with 1M users?\"\n\nAI often spots issues experienced engineers would catch in code review.\n",
      "exampleCode": "\"Review this architecture for a real-time collaboration app:\n[paste design/diagram description]\n\nIdentify: 1) Bottlenecks, 2) Single points of failure, 3) Scalability issues, 4) Security gaps\""
    },
    {
      "id": "arch-2",
      "title": "Pattern Recommendation: Ask for the \"Best Pattern\"",
      "content": "\nDescribe your constraint, ask:\n\"I need to [requirement]. What's the best architectural pattern? Pros/cons of each approach?\"\n\nExamples:\n- Caching strategies (TTL vs LRU vs event-driven)\n- State management patterns\n- Database sharding strategies\n- Microservices vs monolith\n",
      "exampleCode": "\"I need to cache frequently accessed data that changes unpredictably. Options:\n1. Simple TTL cache (60 seconds)\n2. Event-driven cache invalidation\n3. LRU cache with manual refresh\n\nWhat's best given: 1M daily users, P99 latency < 100ms, 85% cache hit target?\""
    },
    {
      "id": "arch-3",
      "title": "The \"What's The Cost?\" Analysis",
      "content": "\nAsk for cost implications of design choices:\n\"I'm choosing between [option A] and [option B]. What are the operational/financial costs? Latency differences?\"\n\nPrevents choosing \"technically elegant\" solutions that cost 10x more.\n",
      "exampleCode": "\"Compare these database strategies:\nA) Single PostgreSQL with vertical scaling\nB) Sharded PostgreSQL with read replicas\nC) MongoDB for flexibility\n\nFor 1M records growing to 1B: costs, latency, operational complexity?\""
    },
    {
      "id": "arch-4",
      "title": "Migration Planning: Ask for \"How Do We Get There?\"",
      "content": "\nInstead of redesigning from scratch, ask:\n\"Our current system is [X]. We want [Y]. What's the migration plan? What's the minimum viable change?\"\n\nForces incremental, safe transitions.\n",
      "exampleCode": "\"We're currently: Monolithic Node.js app, single database\nGoal: Microservices + separate databases + async messaging\n\nGive me: 1) Migration phases, 2) What's safe to deploy first, 3) Rollback plans\""
    }
  ]
};
