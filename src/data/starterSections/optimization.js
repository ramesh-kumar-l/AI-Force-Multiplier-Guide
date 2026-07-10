export const optimizationSection = {
  "id": "optimization",
  "title": "Optimization & Performance Hacks",
  "iconKey": "zap",
  "color": "from-orange-600 to-red-500",
  "cards": [
    {
      "id": "opt-1",
      "title": "Performance Auditing: Ask for Bottleneck Analysis",
      "content": "\nPaste code + description of what's slow, ask:\n\"What are the performance bottlenecks in this code? Rank them by impact. Suggest fixes for the top 3.\"\n\nAI is good at spotting:\n- N+1 queries\n- Unnecessary re-renders\n- Missing memoization\n- Inefficient algorithms\n",
      "exampleCode": "\"This React component feels sluggish. Analyze for performance issues:\n[paste component code]\nSpecifically check: re-renders, useMemo opportunities, array operations, API calls.\""
    },
    {
      "id": "opt-2",
      "title": "Algorithmic Complexity: Ask for Big-O Analysis",
      "content": "\nPaste an algorithm, ask:\n\"What's the time and space complexity of this? Can we do better?\"\n\nFollow with: \"Rewrite this to be O(n) instead of O(n^2)\"\n\nAI can usually optimize if a better algorithm exists.\n",
      "exampleCode": "\"Analyze this function's complexity and suggest an optimal solution:\n[paste code]\n\nAlso provide: 1) Original complexity, 2) Optimized complexity, 3) Trade-offs\""
    },
    {
      "id": "opt-3",
      "title": "Bundle Size Reduction: Ask for Tree-Shake Safe Code",
      "content": "\nWhen adding features:\n\"Write this feature to be maximally tree-shakeable. Avoid side effects. Use ESM syntax. Comment what can be removed.\"\n\nCan save 20-40% bundle size with the right patterns.\n",
      "exampleCode": "\"Implement user analytics tracking as tree-shakeable modules:\n- Only import what's used\n- No global side effects\n- ESM syntax only\n- Suggest import strategy for apps that don't need it\""
    },
    {
      "id": "opt-4",
      "title": "The \"Premature Optimization\" Check",
      "content": "\nBefore optimizing, ask:\n\"Is this actually a bottleneck? How would we measure it? What's the current vs target metric?\"\n\nAI will call out premature optimization you don't need. Saves time on yak shaving.\n",
      "exampleCode": "\"I'm thinking of optimizing [feature]. Help me:\n1. Quantify if it's actually slow\n2. Suggest metrics to measure\n3. Identify what to optimize first\n4. Is this premature optimization?\""
    }
  ]
};
