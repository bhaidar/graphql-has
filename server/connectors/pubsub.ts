import { connect } from 'mqtt';
import { MQTTPubSub } from 'graphql-mqtt-subscriptions';

class PubSubManager {
  private static _instance:PubSubManager = new PubSubManager();
  private _pubsub;

  static ON_DATA_MSG = 'onData';

  constructor() {
    if(PubSubManager._instance){
      throw new Error("Error: Instantiation failed: Use PubSubManager.getInstance() instead of new.");
    }
    PubSubManager._instance = this;
    this.connect();
  }

  private connect() {
    const client = connect('mqtt://test.mosquitto.org', {
      reconnectPeriod: 1000,
    });
    
    this._pubsub = new MQTTPubSub({
      client,
    });
  }

  public static getInstance():PubSubManager {
    return PubSubManager._instance;
  }
  
  get pubsub(): MQTTPubSub {
    return this._pubsub;
  }

  subscribe() {}
  unsubscribe() {}
  publish() {}
}

export { PubSubManager };
