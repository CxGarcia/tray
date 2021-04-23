import { Machine, assign } from 'xstate';
import { submit } from 'api/mock-api';

export const formStepMachine = Machine({
  //we give out machine a unique identifier so we can reference it when dealing with many machines
  id: 'formStepMachine',
  //initial context (extended state) of the machine
  //this are the values received when the form is submitted
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
  //the initial state (step) of our form
  initial: 'user',
  //this part lays out all the states our machine can be in
  //it is important to note that the machine can only be in one state at a time
  //this is very convenient since it prevents us from falling into impossible/undesireable states
  states: {
    user: {
      //here we can also specify how our machine will transition between states
      //for example, once the form is submitted, the state machine transitions into the privacy state and so on
      //when it transitions, it also updates the extended state
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
      //here I have mocked a submission of the form via the api service
      //the service randomizes the promise resolve and reject

      invoke: {
        id: 'submit-form',
        src: (ctx) => submit(ctx),
        //if the promise resolves, we go into the success state
        //at this point we can dispatch a redux action and update our global state
        onDone: 'success',
        //if the promise rejects, we go into the failure state
        //from this state the only viable option is to retry submitting the form
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
