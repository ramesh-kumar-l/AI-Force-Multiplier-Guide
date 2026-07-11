import { useEffect, useRef, useState } from 'react';

const isPwaRuntime = import.meta.env.PROD;

export default function usePwaUpdate() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const updateSWRef = useRef(null);

  useEffect(() => {
    if (!isPwaRuntime || !('serviceWorker' in navigator)) return undefined;

    let cancelled = false;

    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        if (cancelled) return;
        updateSWRef.current = registerSW({
          onNeedRefresh: () => setNeedRefresh(true),
          onOfflineReady: () => setOfflineReady(true)
        });
      })
      .catch(() => {
        // Service worker registration is a progressive enhancement; ignore failures.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const applyUpdate = () => {
    setNeedRefresh(false);
    updateSWRef.current?.(true);
  };

  const dismissOfflineReady = () => setOfflineReady(false);

  return { needRefresh, offlineReady, applyUpdate, dismissOfflineReady };
}
