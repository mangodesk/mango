import { ipcRenderer, contextBridge, IpcRendererEvent } from "electron";

import Messager from '../shared/Messager';
import { waitForEvent } from '../shared/events';

const bridge = {
  initialize: async () => {
    const { ports } = await waitForEvent<IpcRendererEvent>('new-client', ipcRenderer);

    const [port] = ports;

    return new Messager(port);
  },
};

export default bridge;

contextBridge.exposeInMainWorld("bridge", bridge);