/**
 * Opens the contact modal from anywhere in the tree without prop-drilling or
 * a context provider — `ContactModal` mounts once in the root layout and
 * listens for this event. A plain DOM CustomEvent is enough for a single
 * global on/off switch; reaching for a state library would be overkill here.
 */
const OPEN_EVENT = "velhoura:open-contact-modal";

export function openContactModal() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function onOpenContactModal(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
