import { connect } from 'mqtt';
import { MQTTPubSub } from 'graphql-mqtt-subscriptions';

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
    this.connect();
  }

  public get pubsub(): MQTTPubSub {
    return this._pubsub;
  }

  public subscribe() { /* TBD */ }
  public unsubscribe() { /* TBD */ }
  public publish() { /* TBD */ }

  private connect() {
    const client = connect('mqtt://test.mosquitto.org', {
      reconnectPeriod: 1000,
    });

    this._pubsub = new MQTTPubSub({
      client,
    });
  }

}

export { PubSubManager };
