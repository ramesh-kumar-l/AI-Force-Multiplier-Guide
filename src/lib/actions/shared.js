export const nowIso = () => new Date().toISOString();

export const createId = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const touchRoot = (data, sections) => ({
  ...data,
  updatedAt: nowIso(),
  sections
});

export const nextOrder = (items) =>
  items.reduce((highest, item) => Math.max(highest, Number(item.order) || 0), -1) + 1;
