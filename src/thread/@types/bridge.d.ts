import bridge from '../bridge';

declare global {
  // eslint-disable-next-line
  interface Window {
    bridge: typeof bridge;
  }
}
