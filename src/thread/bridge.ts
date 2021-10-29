import { ipcRenderer, contextBridge, IpcRendererEvent } from "electron";
import mongodb from 'mongodb';

import Messager from '../shared/Messager';
import { waitForEvent } from '../shared/events';

const client = new mongodb.MongoClient('mongodb://localhost:27017');

const bridge = {
  initialize: async () => {
    const { ports } = await waitForEvent<IpcRendererEvent>('new-client', ipcRenderer);

    const [port] = ports;

    return new Messager(port);
  },
};

export default bridge;

contextBridge.exposeInMainWorld("bridge", bridge);