// Lasy Console Bridge - Simplified version
(function setupLasyConsoleBridge() {
  // Evitar múltiplas inicializações
  if (window.__lasyBridgeInitialized) return;
  window.__lasyBridgeInitialized = true;

  const TARGET_ORIGIN = '*';
  let logCounter = 0;

  const publish = (evt) => {
    try {
      evt.id = 'log_' + Date.now() + '_' + (++logCounter);
      evt.timestamp = Date.now();
      
      window.parent?.postMessage({ 
        __lasy: true, 
        type: 'sandbox-log', 
        payload: evt 
      }, TARGET_ORIGIN);
    } catch (error) {
      // Falha silenciosa
    }
  };

  // Interceptar console básico
  ['log', 'info', 'warn', 'error'].forEach((level) => {
    const existingFunction = console[level];
    
    console[level] = (...args) => {
      const firstArg = args.length > 0 ? String(args[0]) : '';
      if (!firstArg.includes('Lasy') && !firstArg.includes('HMR')) {
        try {
          publish({
            source: 'client-console',
            level: level,
            args: args,
            message: args.map(arg => String(arg)).join(' '),
            type: 'console-call'
          });
        } catch {}
      }
      
      return existingFunction.apply(console, args);
    };
  });

  // Interceptar erros básicos
  window.addEventListener('error', (e) => {
    try {
      publish({
        source: 'client-error',
        level: 'error',
        message: e.message,
        stack: e.error?.stack,
        args: [e.message],
        type: 'javascript-error'
      });
    } catch {}
  });

  // Notificar que bridge está pronto
  function notifyBridgeReady() {
    try {
      window.parent?.postMessage({ 
        __lasy: true, 
        type: 'lasy-bridge-ready' 
      }, TARGET_ORIGIN);
    } catch {}
  }

  // Inicializar após DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(notifyBridgeReady, 100);
    });
  } else {
    setTimeout(notifyBridgeReady, 100);
  }

})();