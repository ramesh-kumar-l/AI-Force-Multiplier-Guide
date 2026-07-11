const VARIABLE_PATTERN = /\{([A-Za-z][A-Za-z0-9_]*)\}/g;

export const extractTemplateVariables = (text) => {
  const seen = new Set();
  const names = [];

  for (const match of String(text || '').matchAll(VARIABLE_PATTERN)) {
    const name = match[1];
    if (seen.has(name)) continue;
    seen.add(name);
    names.push(name);
  }

  return names;
};

export const applyTemplateVariables = (text, values) =>
  String(text || '').replace(VARIABLE_PATTERN, (token, name) => {
    const value = values?.[name];
    return value && value.trim() ? value : token;
  });
