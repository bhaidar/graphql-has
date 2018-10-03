export default {
  resolver: {
    type: {
      FortuneString: (obj: any) => {
        // An example of how to return the proper type
        // based on the object params.
        // return obj.paramA ? 'StringA' : 'StringB';
        return 'StringA';
      },
    },
  },
  common: `
    union FortuneString = StringA | StringB

    type StringA {
      msg: String
    }

    type StringB {
      msg: String
    }
  `,
};
