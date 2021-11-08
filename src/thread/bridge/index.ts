import { ipcRenderer, contextBridge, IpcRendererEvent } from "electron";
import { Db, MongoClient } from "mongodb";
import _ from 'lodash';

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

            const databasesWithCollections = await Promise.all(_.map(databases, async ({ name }) => {
              const dbCollections = await client.db(name).listCollections().toArray();

              return { dbName: name, collections: dbCollections };
            }))

            return {
              databases: _.map(databases, ({ name }) => ({ name })),
              collections: _.flatMap(databasesWithCollections, ({ collections }) => collections),
            };
          },  
        };
      },
    };
  },
};

export default bridge;

contextBridge.exposeInMainWorld("bridge", bridge);