import { PubSub } from 'apollo-server';

class PubSubManager {
  public static ON_DATA_MSG = 'onData';

  private static _instance: PubSubManager = new PubSubManager();
  private _pubsub;

  public static getInstance(): PubSubManager {
    return PubSubManager._instance;
  }

  constructor() {
    if (PubSubManager._instance) {
      throw new Error('Error: Instantiation failed: Use PubSubManager.getInstance() instead of new.');
    }
    PubSubManager._instance = this;
    this._pubsub = new PubSub();
  }

  public get pubsub(): any {
    return this._pubsub;
  }

  public publish() { /* TODO: tbd */ }
  public subscribe() { /* TODO: tbd */ }
  public unsubscribe() { /* TODO: tbd */ }

}

export { PubSubManager };
