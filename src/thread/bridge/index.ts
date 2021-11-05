import { ipcRenderer, contextBridge, IpcRendererEvent } from "electron";
import { MongoClient } from "mongodb";

import { VM } from 'vm2';
import Messager from '../../shared-bridge/Messager';
import { waitForEvent } from '../../shared-bridge/events';

const bridge = {
  initialize: async () => {
    const { ports } = await waitForEvent<IpcRendererEvent>('new-client', ipcRenderer);

    const [port] = ports;

    const messager = new Messager(port);

    return {
      messager: {
        handle: (name: string, handlerFn: (message: any) => Promise<any>) => messager.handle(name, handlerFn),
        invoke: (name: string, payload?: any)=> messager.invoke(name, payload),
      },
      connect: async ({ connectionString }: { connectionString: string }) => {
        const client = new MongoClient(connectionString);

        await client.connect();

        const adminDb = client.db('local').admin();

        return {
          listDatabases: async () => {
            const { databases } = await adminDb.listDatabases();

            return databases;
          },  
        };
      },
    };
  },
};

export default bridge;

contextBridge.exposeInMainWorld("bridge", bridge);