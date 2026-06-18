export const APP_DATA_SYNC_EVENT = 'app:data-sync';

export function emitAppDataSync(detail = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(APP_DATA_SYNC_EVENT, { detail }));
}
