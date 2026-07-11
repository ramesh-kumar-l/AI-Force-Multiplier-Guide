import { describe, expect, it } from 'vitest';
import { applyTemplateVariables, extractTemplateVariables } from './templateVariables';

describe('extractTemplateVariables', () => {
  it('finds identifier-style placeholders and dedupes them in first-seen order', () => {
    const text = 'Explain {problem} to {audience} using {framework}. Recap the {problem}.';
    expect(extractTemplateVariables(text)).toEqual(['problem', 'audience', 'framework']);
  });

  it('ignores braces that are not simple identifiers (e.g. code blocks)', () => {
    const text = 'const obj = { foo: 1, bar: "baz" }; return {};';
    expect(extractTemplateVariables(text)).toEqual([]);
  });

  it('returns an empty array for empty/undefined input', () => {
    expect(extractTemplateVariables('')).toEqual([]);
    expect(extractTemplateVariables(undefined)).toEqual([]);
  });
});

describe('applyTemplateVariables', () => {
  it('replaces placeholders with provided values', () => {
    const result = applyTemplateVariables('Explain {problem} to {audience}.', {
      problem: 'race conditions',
      audience: 'juniors'
    });
    expect(result).toBe('Explain race conditions to juniors.');
  });

  it('leaves a placeholder untouched when its value is missing or blank', () => {
    const result = applyTemplateVariables('Explain {problem} to {audience}.', {
      problem: '  '
    });
    expect(result).toBe('Explain {problem} to {audience}.');
  });

  it('does not mutate the original template string', () => {
    const template = 'Explain {problem}.';
    applyTemplateVariables(template, { problem: 'x' });
    expect(template).toBe('Explain {problem}.');
  });
});
