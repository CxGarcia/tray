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
  //Next we define all the states of the machine
  //it is important to note that the machine can only be in one state at a time
  //this is very convenient since it prevents us from falling into impossible/undesireable states
  states: {
    user: {
      //the on is the event that allows us to transition between states
      //for example, once the form is submitted, the state machine transitions into the privacy state and so on
      on: {
        SUBMIT: {
          target: 'privacy',
          //when the form is submitted, it has already been validated
          actions: assign({ user: (_, event) => event.payload }),
        },
      },
    },
    privacy: {
      on: {
        SUBMIT: {
          target: 'loading',
          actions: assign({ privacy: (_, event) => event.payload }),
        },
        //another possible event, is if we go back to previous step which is handled by the BACK event
        BACK: {
          target: 'user',
          actions: assign({ privacy: (_, event) => event.payload }),
        },
      },
    },
    loading: {
      //here I have mocked a submission of the form via an api
      //the service randomizes if the promise resolves or rejects
      invoke: {
        id: 'submit-form',
        src: (ctx) => submit(ctx),
        //if the promise resolves, we go into the success state
        //at this point we can dispatch a redux action and update our global store
        onDone: {
          target: 'success',
          //whatever is returned by the server, is saved into the success object
          actions: assign({ success: (_, event) => event.data }),
        },
        //if the promise rejects, we go into the failure state
        //from this state the only option is to retry submitting the form
        onError: 'failure',
      },
    },
    failure: {
      on: {
        RETRY: 'loading',
      },
    },
    success: {
      //on success, dispatch redux action so we can update our global store
      type: 'final',
    },
  },
});
