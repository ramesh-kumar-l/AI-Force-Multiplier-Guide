import { useMemo, useState } from 'react';
import { collectTags, computeStats, filterVisibleSections } from '../lib/lexiconFilters';

export default function useLexiconFilters(sections) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagMode, setTagMode] = useState('any');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const availableTags = useMemo(() => collectTags(sections), [sections]);

  const visibleSections = useMemo(
    () => filterVisibleSections(sections, { query: searchQuery, selectedTags, tagMode, favoritesOnly }),
    [sections, searchQuery, selectedTags, tagMode, favoritesOnly]
  );

  const stats = useMemo(() => computeStats(sections), [sections]);

  const toggleTag = (tag) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const hasActiveFilters = searchQuery.trim() !== '' || selectedTags.length > 0 || favoritesOnly;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setFavoritesOnly(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    tagMode,
    setTagMode,
    favoritesOnly,
    setFavoritesOnly,
    availableTags,
    visibleSections,
    stats,
    hasActiveFilters,
    clearFilters
  };
}
