import { Machine, assign } from 'xstate';
import { submit } from 'api/mock-api';

export const formStepMachine = Machine({
  id: 'formStepMachine',
  //initial context (extended state) of the machine
  context: {
    user: {
      name: '',
      role: '',
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
              return { ...ctx.user, ...event.payload };
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
      //submit the form via the api service
      invoke: {
        id: 'submit-form',
        src: (ctx) => submit(ctx),
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
      //TODO - on success, dispatch redux action
      type: 'final',
    },
  },
});
