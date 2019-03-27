import GraphQLJSON from 'graphql-type-json';

export default {
  resolver: {
    type: {
      JSON: GraphQLJSON
    },
  },
  common: `scalar JSON`,
};
