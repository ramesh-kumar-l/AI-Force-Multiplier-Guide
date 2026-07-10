import { useMemo, useState } from 'react';
import { getArchivedView } from '../lib/lexiconFilters';

export default function useArchiveView(sections) {
  const [open, setOpen] = useState(false);
  const { archivedSections, archivedCards } = useMemo(() => getArchivedView(sections), [sections]);

  return {
    open,
    openDrawer: () => setOpen(true),
    closeDrawer: () => setOpen(false),
    archivedSections,
    archivedCards
  };
}
