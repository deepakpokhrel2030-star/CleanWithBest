'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Download, Share, X } from 'lucide-react';

const DISMISS_KEY = 'cleanwithbest-install-dismissed-v2';

function isStandalone() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function isIos() {
  if (typeof window === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export default function InstallApp() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    if (isStandalone()) {
      setInstalled(true);
      return;
    }

    if (window.localStorage.getItem(DISMISS_KEY) !== '1') {
      const showTimer = window.setTimeout(() => setDismissed(false), 900);
      return () => window.clearTimeout(showTimer);
    }
  }, []);

  useEffect(() => {
    const onPrompt = event => {
      event.preventDefault();
      setInstallPrompt(event);
      setDismissed(false);
    };

    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      setDismissed(true);
      window.localStorage.setItem(DISMISS_KEY, '1');
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const close = () => {
    window.localStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  };

  const install = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const result = await installPrompt.userChoice.catch(() => null);
      setInstallPrompt(null);
      if (result?.outcome === 'accepted') {
        setInstalled(true);
        setDismissed(true);
        window.localStorage.setItem(DISMISS_KEY, '1');
      } else {
        setShowHelp(true);
      }
      return;
    }

    setShowHelp(true);
  };

  if (installed || dismissed) return null;

  const ios = isIos();

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 z-[60] max-w-[calc(100vw-6.5rem)] sm:left-5">
      <div className="rounded-2xl border border-emerald-100 bg-white/95 p-2.5 shadow-xl shadow-emerald-900/10 backdrop-blur">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={install}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white shadow-sm hover:bg-emerald-700 sm:text-sm"
          >
            <Download size={15} />
            {installPrompt ? 'Install app' : 'Add app'}
          </button>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Hide install app option"
          >
            <X size={15} />
          </button>
        </div>

        {showHelp && (
          <div className="mt-2 max-w-[250px] rounded-xl bg-emerald-50 p-3 text-xs leading-relaxed text-slate-700 ring-1 ring-emerald-100">
            {ios ? (
              <p>
                <Share size={13} className="mr-1 inline text-emerald-700" />
                On iPhone, tap Share, then Add to Home Screen.
              </p>
            ) : (
              <p>
                <CheckCircle size={13} className="mr-1 inline text-emerald-700" />
                If the prompt does not open, use your browser menu and choose Install app or Add to Home screen.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
