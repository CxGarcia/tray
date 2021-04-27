# Running the App
1. Clone the repo via HTTPS: `git clone https://github.com/CxGarcia/tray.git` or SSH: `git clone git@github.com:CxGarcia/tray.git`
2. If using npm version below 7, run `npm install` in the local workspace. For npm version 7 run `npm install --legacy-peer-deps`.
3. Once the dependencies are installed, run `npm start`. The app should now be running on port 3000.
# Tech Stack
To build the project I used: React, XState (state management), Cypress (testing), and Sass.
# Tests
I implemented E2E testing for the form with Cypress. To start the Cypress testing environment, run `npm run test:cypress`. This command will launch a browser window where you can run the integration.spec.js test suite and let Cypress do its magic. For convenience purposes, I have attached the following GIF that shows the tests running:
![cypress-tests](https://github.com/CxGarcia/tray/blob/main/readme-resources/cypress-tests.gif)

## Adding Another Step
I have implemented another step in the form in the `add-step` branch to show how minimal is the code required to add another step using this implementation. To see the implementation of the additional step, run `git checkout add-step`.

# Why XState
I am a big fan of Redux. However, I have wanted to use XState for a long time, and after some thought, I decided this test was a perfect use case for it, so I used it to implemented state management for the form. 
## XState vs. Redux
XState is a library that allows us to declaratively use finite state machines (FSM) in JavaScript apps (more info [here](https://xstate.js.org/docs/)). The library plays very well with Redux since you can dispatch actions from it. The main difference between Redux and XState is that Redux does not dictate how reducers are defined. In Redux, reducers just return the new state given the current state and an event. This gives the developer the task of managing possible and impossible states themselves. On the other hand, XState forces you to define the allowed states, how to transition between them, and what actions should be executed for each transition. By using an FSM, we gain the assurance that there are no impossible states. With this assurance in place, we don't have to handle as much logic through our app. 
## What is a Finite State Machine?
An FSM is not a new concept by any means, and XState didn't invent it. An FSM is a mathematical model representing a finite set of states that can transition between each other deterministically in response to events. Arguably the most known implementation of an FSM in the JS ecosystem are promises. Promises can be either on a pending state and then transition into either fulfill or reject. Once it transitions into either of these states, it reaches its final state.
## State Machine Example
A good example of the benefits of a state machine is a checkout form. Let's say our user is in the review/payment step of the form. When the user clicks on the payment button, the payment will be processed, but this may take time. And there are always people (like myself) who are impatient and will click the button again just in case. So whenever building a form like this, we would have to anticipate all these cases and write code to handle them. In the case of the payment button, we can set a flag to check if the payment has been made and disable the button. But then someone who knows their way around the console can overwrite the flag and reenable the button, and we would also have to consider this somehow. And the story goes on and on. We would have to always be one step ahead of users to protect from all these scenarios. At some point, the sheer amount of logic we would have to handle would be massive. These cases are where FSMs excel. Going back to the checkout form, we would have some code that looks like this in XState syntax:

```js
const paymentMachine = Machine({
  id: 'payment-machine',
  //first we define our states
  //for this particular example, our initial state is payment
  initial: 'payment',
  states: {
    payment: {
      //the event that will cause to transition to processing is PAYMENT, which will be triggered by the button click
      //once this transition happens, there is no going back to the payment state and we have the guarantee that a payment
      //cannot be submitted twice
      on: {
        PAYMENT: {
          target: 'processing',
        },
      },
    },
    //now the only possible transitions from the processing state are a succcessful payment or an error
    processing: {
      invoke: {
        id: 'process-payment',
        onDone: 'success',
        onError: 'failure',
      },
    },
    failure: {
      on: {
        RETRY: 'processing',
      },
    },
    success: {
      type: 'final',
    },
  },
});
```

# Documentation for the Form Step Machine
Now that I have explained what an FSM is, we can move on and document how they are implemented in the assignment. In the case of the signup form, we have a couple of steps represented as the current state of the machine. Our initial state is the first step of the form, the user form. In XState, we conveniently write out our FSM in object syntax. Here we define The initial state of the machine, all of the possible states, how to transition between states using events, the order in which the states happen, and others such as extended state (also known as context). The code below is the actual machine that I used to build the form. I have added comments in every step to give a clear picture of what is going on.

```js
const formStepMachine = Machine({
  //we give our machine a unique identifier so we can reference it when dealing with many machines
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
      //for example, once the form is submitted (triggered by the SUBMIT event),
      //the state machine transitions into the privacy state and so on
      on: {
        SUBMIT: {
          target: 'privacy',
          //when this event happens, we can trigger an action
          //in this case, we are assigning the event payload to the context, specifically the user
          //it is worth noting that when the form is submitted, it has already been validated
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
```
## State Chart
Another cool feature of XState is the visualizer where we can see our state chart, which is a visual representation of our machine. This is great for debugging purposes since the state chart is also interactive and shows how transitions are happening. The state chart for the formStepMachine looks like so:

![form-state-chart](https://github.com/CxGarcia/tray/blob/main/readme-resources/form-state-chart.png)

