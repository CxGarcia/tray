import { Machine, assign } from 'xstate';

export const formStepMachine = Machine({
  id: 'formStepMachine',
  //initial context (extended state) of the machine
  context: {
    user: {
      name: '',
      organization: '',
      email: '',
      password: '',
    },
    privacy: {
      trayUpdates: false,
      otherUpdates: false,
    },
  },
  initial: 'user',
  states: {
    user: {
      on: {
        SUBMIT: {
          target: 'privacy',
          actions: assign({
            user: (ctx, event) => {
              //when the form is submitted, it has already been validated
              //thus we can overwrite whatever we have in our initial ctx
              return { ...ctx.privacy, ...event.payload };
            },
          }),
        },
      },
    },
    privacy: {
      on: {
        SUBMIT: {
          target: 'loading',
          actions: assign({
            privacy: (ctx, event) => {
              return { ...ctx.privacy, ...event.payload };
            },
          }),
        },
      },
    },
    loading: {
      invoke: {
        id: 'submitting',
        onDone: 'success',
        onError: 'failure',
      },
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
    success: {
      type: 'final',
    },
  },
});
