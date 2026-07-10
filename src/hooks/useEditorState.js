import { useState } from 'react';
import {
  createBlankCardDraft,
  createBlankSectionDraft,
  createCardDraft,
  createSectionDraft
} from '../lib/lexiconActions';

export default function useEditorState(actions) {
  const [editor, setEditor] = useState(null);

  const openCreateSection = () =>
    setEditor({ type: 'section', mode: 'create', draft: createBlankSectionDraft() });

  const openEditSection = (section) =>
    setEditor({
      type: 'section',
      mode: 'edit',
      sectionId: section.id,
      draft: createSectionDraft(section)
    });

  const openCreateCard = (sectionId) =>
    setEditor({ type: 'card', mode: 'create', sectionId, draft: createBlankCardDraft() });

  const openEditCard = (card) =>
    setEditor({ type: 'card', mode: 'edit', cardId: card.id, draft: createCardDraft(card) });

  const updateDraft = (draft) => setEditor((prev) => ({ ...prev, draft }));

  const closeEditor = () => setEditor(null);

  const saveEditor = () => {
    if (!editor) return;

    if (editor.type === 'section' && editor.mode === 'create') {
      actions.addSection(editor.draft);
    } else if (editor.type === 'section') {
      actions.updateSection(editor.sectionId, editor.draft);
    } else if (editor.type === 'card' && editor.mode === 'create') {
      actions.addCard(editor.sectionId, editor.draft);
    } else {
      actions.updateCard(editor.cardId, editor.draft);
    }

    setEditor(null);
  };

  return {
    editor,
    openCreateSection,
    openEditSection,
    openCreateCard,
    openEditCard,
    updateDraft,
    closeEditor,
    saveEditor
  };
}
