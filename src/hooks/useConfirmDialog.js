import { useState } from 'react';

export default function useConfirmDialog() {
  const [confirmState, setConfirmState] = useState(null);

  const askToConfirm = (title, message, actionLabel, onConfirm) =>
    setConfirmState({ title, message, actionLabel, onConfirm });

  const confirmAction = () => {
    confirmState.onConfirm();
    setConfirmState(null);
  };

  const cancel = () => setConfirmState(null);

  return { confirmState, askToConfirm, confirmAction, cancel };
}
