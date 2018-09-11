import { PubSubManager } from '../../connectors/pubsub';

export default {
  resolver: {
    query: {},
    mutation: {},
    subscription: {
      onData: {
        subscribe: () => PubSubManager.getInstance().pubsub.asyncIterator(PubSubManager.ON_DATA_MSG),
      }
    },
  },
  query: ``,
  mutation: ``,
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
