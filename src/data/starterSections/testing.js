export const testingSection = {
  "id": "testing",
  "title": "Testing & Quality Assurance",
  "iconKey": "lightbulb",
  "color": "from-green-600 to-emerald-500",
  "cards": [
    {
      "id": "test-1",
      "title": "Edge Case Generation: Ask for \"How Can This Break?\"",
      "content": "\nFor any feature, ask:\n\"Generate 20 test cases that would break this. Include: boundary cases, null/undefined, empty collections, massive inputs, race conditions, invalid types.\"\n\nThis catches bugs before production.\n",
      "exampleCode": "\"Generate comprehensive test cases for this payment function:\n- Amounts: $0, negative, huge, decimals with rounding\n- Edge cases: null input, concurrent calls, network errors\n- Integration: database failures, timeout scenarios\""
    },
    {
      "id": "test-2",
      "title": "Mutation Testing: Ask for \"What Would Break This Test?\"",
      "content": "\nPaste your tests, ask:\n\"What code changes would this test NOT catch? Generate mutations that pass the tests but are wrong.\"\n\nReveals test gaps immediately.\n",
      "exampleCode": "\"Analyze these tests for gaps:\n[paste test code]\n\nGenerate 10 mutations of the actual code that would pass these tests but are logically wrong.\""
    },
    {
      "id": "test-3",
      "title": "Integration Test Scenarios: The User Story Approach",
      "content": "\nInstead of unit tests only, describe a user workflow:\n\"User signs up -> creates project -> invites team -> sets permissions. Write tests covering this flow.\"\n\nAI will create realistic integration tests.\n",
      "exampleCode": "\"Write E2E tests for this user journey:\n1. User signs up with email\n2. Verifies email link\n3. Creates first project\n4. Uploads dataset\n5. Runs analysis\n6. Shares results\n\nCover success and error paths.\""
    },
    {
      "id": "test-4",
      "title": "Documentation Through Tests: The \"Living Docs\" Pattern",
      "content": "\nWrite tests that also serve as documentation:\n\"Generate tests that read like documentation. Each test should show: what it tests, expected behavior, edge case explanation.\"\n\nTest names become spec docs.\n",
      "exampleCode": "\"Write tests for payment processing that double as documentation:\n- Test name explains the scenario\n- Comments explain business logic\n- Assertions are crystal clear\n- Someone reading tests understands the system\""
    }
  ]
};
