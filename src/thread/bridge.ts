import { ipcRenderer, contextBridge, IpcRendererEvent } from "electron";
import { MongoClient } from 'mongodb';

import Messager from '../shared/Messager';
import { waitForEvent } from '../shared/events';

const client = new MongoClient('mongodb://localhost:27017');

const bridge = {
  initialize: async () => {
    const { ports } = await waitForEvent<IpcRendererEvent>('new-client', ipcRenderer);

    const [port] = ports;

    await client.connect();

    const db = client.db('georges-local');
    const collection = db.collection('users');

    console.log(await collection.findOne())

    return new Messager(port);
  },
};

export default bridge;

contextBridge.exposeInMainWorld("bridge", bridge);