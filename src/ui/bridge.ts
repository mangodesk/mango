import { ipcRenderer, contextBridge, IpcRendererEvent } from "electron";

import Messager from '../shared/Messager';
import { waitForEvent } from '../shared/events';

const bridge = {
  initialize: async () => {
    ipcRenderer.send('request-thread-channel')

    const { ports} = await waitForEvent<IpcRendererEvent>('provide-thread-channel', ipcRenderer);

    const [port] = ports;

    return new Messager(port);
  },
};

export default bridge;

contextBridge.exposeInMainWorld("bridge", bridge);