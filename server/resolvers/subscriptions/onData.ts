import { PubSubManager } from '../../connectors/pubsub';

export default {
  onData: {
    subscribe: () => PubSubManager.getInstance().pubsub.asyncIterator(PubSubManager.ON_DATA_MSG),
  }
};
