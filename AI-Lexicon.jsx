import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Copy, Search, Zap, Code, Brain, Rocket, Lightbulb, Settings } from 'lucide-react';
import { loadLexiconData, saveLexiconData } from './src/lib/lexiconStorage';

const iconRegistry = {
  brain: Brain,
  code: Code,
  zap: Zap,
  rocket: Rocket,
  lightbulb: Lightbulb,
  settings: Settings
};

export default function AILexicon() {
  const [lexiconData, setLexiconData] = useState(() => loadLexiconData());
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const guideSections = lexiconData.sections;

  useEffect(() => {
    saveLexiconData(lexiconData);
  }, [lexiconData]);

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setLexiconData(prev => ({
      ...prev,
      sections: prev.sections.map(section => ({
        ...section,
        cards: section.cards.map(card =>
          card.id === id
            ? {
                ...card,
                copyCount: card.copyCount + 1,
                lastCopiedAt: new Date().toISOString()
              }
            : card
        )
      }))
    }));
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSections = useMemo(() => {
    if (!searchQuery) return guideSections;
    
    const query = searchQuery.toLowerCase();
    return guideSections.map(section => ({
      ...section,
      cards: section.cards.filter(card =>
        card.title.toLowerCase().includes(query) ||
        card.content.toLowerCase().includes(query) ||
        card.exampleCode?.toLowerCase().includes(query)
      )
    })).filter(section => section.cards.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 font-['Geist_Mono']">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/30 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Lexicon
            </h1>
          </div>
          <p className="text-slate-400 text-sm mb-4">Master prompting, coding, testing, and architecture with AI. Copy, modify, extend.</p>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search tips, tricks, hacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-4">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No results found for "{searchQuery}"
            </div>
          ) : (
            filteredSections.map(section => {
              const Icon = iconRegistry[section.iconKey] || Brain;
              return (
                <div key={section.id} className="space-y-3">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full group"
                  >
                    <div className={`bg-gradient-to-r ${section.color} p-0.5 rounded-lg`}>
                      <div className="bg-slate-800 rounded-md p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6" />
                          <h2 className="text-lg font-bold text-left">{section.title}</h2>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${expandedSections[section.id] ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Cards */}
                  {expandedSections[section.id] && (
                    <div className="space-y-2 ml-4">
                      {section.cards.map(card => (
                        <div
                          key={card.id}
                          className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors"
                        >
                          <button
                            onClick={() => toggleItem(card.id)}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors text-left"
                          >
                            <h3 className="font-semibold text-slate-100">{card.title}</h3>
                            <ChevronDown
                              className={`w-4 h-4 flex-shrink-0 transition-transform text-slate-400 ${expandedItems[card.id] ? 'rotate-180' : ''}`}
                            />
                          </button>

                          {expandedItems[card.id] && (
                            <div className="border-t border-slate-700 p-4 space-y-4 bg-slate-900/30">
                              {/* Content */}
                              <div className="prose prose-invert max-w-none text-sm">
                                {card.content.split('\n').map((line, i) => {
                                  if (line.startsWith('**') && line.endsWith('**')) {
                                    return <div key={i} className="font-bold text-cyan-400 mt-3">{line.replace(/\*\*/g, '')}</div>;
                                  }
                                  if (line.startsWith('- ')) {
                                    return <div key={i} className="ml-4 text-slate-300">- {line.substring(2)}</div>;
                                  }
                                  if (line.trim() === '') return <div key={i}>&nbsp;</div>;
                                  return <div key={i} className="text-slate-300">{line}</div>;
                                })}
                              </div>

                              {/* Code Block */}
                              {card.exampleCode && (
                                <div className="mt-4">
                                  <div className="bg-slate-950 rounded-lg border border-slate-700 overflow-hidden">
                                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-700">
                                      <span className="text-xs text-slate-400 font-mono">Example</span>
                                      <button
                                        onClick={() => copyToClipboard(card.exampleCode, card.id)}
                                        className="flex items-center gap-2 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
                                      >
                                        <Copy className="w-4 h-4" />
                                        {copiedId === card.id ? 'Copied!' : 'Copy'}
                                      </button>
                                    </div>
                                    <pre className="p-4 overflow-x-auto text-xs text-slate-300 font-mono leading-relaxed">
                                      {card.exampleCode}
                                    </pre>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 p-6 bg-slate-800/30 border border-slate-700 rounded-lg text-center">
          <p className="text-slate-400 text-sm mb-3">
            <strong>Make it extensible:</strong> Save this guide. Add your own sections and proven prompts.
          </p>
          <p className="text-slate-500 text-xs">
            Update: May 2025 - Claude 3.5, ChatGPT 4o - These techniques work across all modern LLMs
          </p>
        </div>
      </div>
    </div>
  );
}
