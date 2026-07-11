import { useMemo, useState } from 'react';
import { applyTemplateVariables, extractTemplateVariables } from '../lib/templateVariables';

export default function useTemplateFill(actions) {
  const [session, setSession] = useState(null);
  const [copied, setCopied] = useState(false);

  const openTemplate = (card) => {
    const variables = extractTemplateVariables(`${card.content}\n${card.exampleCode}`);
    const values = Object.fromEntries(variables.map((name) => [name, '']));
    setCopied(false);
    setSession({ card, variables, values });
  };

  const updateValue = (name, value) =>
    setSession((prev) => (prev ? { ...prev, values: { ...prev.values, [name]: value } } : prev));

  const closeTemplate = () => {
    setSession(null);
    setCopied(false);
  };

  const generated = useMemo(() => {
    if (!session) return null;
    return {
      content: applyTemplateVariables(session.card.content, session.values),
      exampleCode: applyTemplateVariables(session.card.exampleCode, session.values)
    };
  }, [session]);

  const copyGenerated = async () => {
    if (!session || !generated) return;
    const text = generated.exampleCode || generated.content;
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    actions.recordTemplateCopy(session.card.id);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return { session, generated, copied, openTemplate, updateValue, closeTemplate, copyGenerated };
}
