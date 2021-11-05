import { EventEmitter } from 'events';

export function waitForEvent<T>(name: string, emitter: EventEmitter): Promise<T> {
  return new Promise((resolve) => {
    emitter.once(name, resolve);
  });
}