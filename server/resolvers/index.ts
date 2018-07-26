//
// You don't need to change this file, if you want to add
// a query|mutation|subscription just create the relative "atom"
// and add it to the "index.ts" file inside the hosting folder.
//

// Queries atoms
import queries from './queries';
// Mutations atoms
import mutations from './mutations';
// Subscriptions atoms
import subscriptions from './subscriptions';

export default {
  Query: queries,
  Mutation: mutations,
  Subscription: subscriptions,
};
