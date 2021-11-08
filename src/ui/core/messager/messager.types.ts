export type Messager = {
  handle: (name: string, handlerFn: (message: any) => Promise<any>) => void;
  invoke: (name: string, payload?: any) => Promise<any>;
};

export type ConnectResponse = {
  databases: {
    name: string;
  }[];
  collections: { name: string; database: string }[];
};
