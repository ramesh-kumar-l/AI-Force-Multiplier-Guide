export default function ContentRenderer({ content }) {
  return (
    <div className="prose prose-invert max-w-none text-sm">
      {content.split('\n').map((line, index) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <div key={index} className="mt-3 font-bold text-cyan-400">
              {line.replace(/\*\*/g, '')}
            </div>
          );
        }

        if (line.startsWith('- ')) {
          return (
            <div key={index} className="ml-4 text-slate-300">
              - {line.substring(2)}
            </div>
          );
        }

        if (line.trim() === '') return <div key={index}>&nbsp;</div>;

        return (
          <div key={index} className="text-slate-300">
            {line}
          </div>
        );
      })}
    </div>
  );
}
