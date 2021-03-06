import _ from 'lodash';
import { EventEmitter } from 'events';
import Hyperid from 'hyperid';

type InternalMessage = {
  id: string;
  payload: any;
  waitForReply?: boolean;
  _isInternalMessage: boolean;
  isError?: boolean;
};

function isInternalMessage(message: any | InternalMessage): message is InternalMessage {
  return message._isInternalMessage;
}

export default class Messager extends EventEmitter {
  private hyperid = Hyperid();
  private messagePort: MessagePort;

  constructor(messagePort: MessagePort) {
    super();

    this.messagePort = messagePort;

    this.messagePort.onmessage = this.onMessage.bind(this);
  }

  public async invoke(name: string, payload: any = {}): Promise<any> {
    const internalMessage = this.makeInternalMessage(name, payload);

    return new Promise((resolve, reject) => {
      this.once(internalMessage.id, ({ payload, isError }: InternalMessage) => {
        if (isError) {
          return reject(payload);
        }

        return resolve(payload);
      });

      this.sendInternalMessage(internalMessage);
    });
  }

  public handle(name: string, handlerFn: (message: any) => Promise<any>) {
    this.on(name, async (internalMessage: InternalMessage) => {
      let replyData;
      let errorData;

      try {
        replyData = await handlerFn(internalMessage.payload);
      } catch (error) {
        errorData = error;
      }

      const replyMessage = this.makeReplyMessage(internalMessage, replyData, errorData);

      this.sendInternalMessage(replyMessage);
    });
  }

  private onMessage({ data }: MessageEvent) {
    if (!isInternalMessage(data)) return;

    const { name } = this.deserializeMessageId(data);

    this.emit(data.id, data);
    this.emit(name, data);
    this.emit('message', { name, data });
  }

  private sendInternalMessage(message: InternalMessage) {
    return this.messagePort.postMessage(message);
  }

  private makeReplyMessage(internalMessage: InternalMessage, payload?: any, error?: any): InternalMessage {
    return {
      ...internalMessage,
      payload: payload || error,
      waitForReply: false,
      isError: !!error,
    };
  }

  private makeInternalMessage(name: string, payload: any): InternalMessage {
    const id = this.serializeMessageId(name);

    return {
      id,
      payload,
      _isInternalMessage: true,
    };
  }

  private serializeMessageId(name: string) {
    return `${name}-${this.hyperid()}`;
  }

  private deserializeMessageId({ id }: InternalMessage) {
    const [name] = _.split(id, '-');

    return {
      name,
    };
  }
}
