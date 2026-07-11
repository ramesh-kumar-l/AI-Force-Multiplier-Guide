import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function useDialogA11y(isOpen, onClose, initialFocusRef) {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const wasOpenRef = useRef(false);

  if (isOpen && !wasOpenRef.current && typeof document !== 'undefined') {
    triggerRef.current = document.activeElement;
  }
  wasOpenRef.current = isOpen;

  useEffect(() => {
    if (!isOpen) return undefined;

    const container = containerRef.current;
    const focusable = container?.querySelectorAll(FOCUSABLE_SELECTOR);
    (initialFocusRef?.current || focusable?.[0] || container)?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !container) return;

      const nodes = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [isOpen, onClose]);

  return containerRef;
}
