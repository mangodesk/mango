import { ConnectResponse, Messager } from "./messager.types";

export interface MessagerService {
  connect(connectionString: string): Promise<ConnectResponse>
}

export const createMessagerService = (messager: Messager): MessagerService => ({
  async connect(connectionString: string) {
    const { databases, collections } = await messager?.invoke('connect', {
      connectionString,
    });

    return { databases, collections } as ConnectResponse;
  }
})