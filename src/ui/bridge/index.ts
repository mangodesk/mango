import { ipcRenderer, contextBridge, IpcRendererEvent } from 'electron';

import Messager from '../../shared-bridge/Messager';
import { waitForEvent } from '../../shared-bridge/events';

const bridge = {
  initialize: async () => {
    ipcRenderer.send('request-thread-channel');

    const { ports } = await waitForEvent<IpcRendererEvent>('provide-thread-channel', ipcRenderer);

    const [port] = ports;

    const messager = new Messager(port);

    return {
      messager: {
        handle: (name: string, handlerFn: (message: any) => Promise<any>) => messager.handle(name, handlerFn),
        invoke: (name: string, payload?: any) => messager.invoke(name, payload),
      },
    };
  },
};

export default bridge;

contextBridge.exposeInMainWorld('bridge', bridge);
