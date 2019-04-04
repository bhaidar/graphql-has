import { PubSubManager } from '../../connectors/pubsub';

export default {
  resolver: {
    subscription: {
      onData: {
        subscribe: () => PubSubManager.getInstance().pubsub.asyncIterator(PubSubManager.ON_DATA_MSG),
      }
    },
  },
  subscription: `
    onData: SubscriptionResult
  `,
  common: `
    type SubscriptionResult {
      id: String,
      data: String
    }
  `,
};
