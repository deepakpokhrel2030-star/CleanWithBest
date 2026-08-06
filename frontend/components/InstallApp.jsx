'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

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
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    if (isStandalone() || window.localStorage.getItem('cleanwithbest-install-dismissed') === '1') {
      return;
    }

    const onPrompt = event => {
      event.preventDefault();
      setInstallPrompt(event);
      setDismissed(false);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);

    const iosTimer = window.setTimeout(() => {
      if (isIos() && !isStandalone()) {
        setShowIosHelp(true);
        setDismissed(false);
      }
    }, 1800);

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.clearTimeout(iosTimer);
    };
  }, []);

  const close = () => {
    window.localStorage.setItem('cleanwithbest-install-dismissed', '1');
    setDismissed(true);
  };

  const install = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice.catch(() => null);
      setInstallPrompt(null);
      setDismissed(true);
      return;
    }

    setShowIosHelp(true);
  };

  if (dismissed || (!installPrompt && !showIosHelp)) return null;

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
            Install app
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

        {showIosHelp && !installPrompt && (
          <p className="mt-2 max-w-[230px] text-xs leading-relaxed text-slate-600">
            On iPhone, tap Share, then Add to Home Screen.
          </p>
        )}
      </div>
    </div>
  );
}
