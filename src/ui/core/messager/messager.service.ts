import { ConnectResponse, Messager } from "./messager.types";

export interface MessagerService {
  connect(connectionString: string): Promise<ConnectResponse>
}

export const createMessagerService = (messager: Messager): MessagerService => ({
  async connect(connectionString: string) {
    const result = await messager?.invoke('connect', {
      connectionString,
    });

    return result as ConnectResponse;
  }
})