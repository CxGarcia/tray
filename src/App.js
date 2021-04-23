import React from 'react';
import { useMachine } from '@xstate/react';
import { formStepMachine } from 'state-machines/formStepMachine';
import UserForm from 'components/UserForm/UserForm';
import PrivacyForm from 'components/PrivacyForm/PrivacyForm';

import './App.module.scss';

const steps = {
  user: UserForm,
  privacy: PrivacyForm,
};

function App() {
  const [state, send] = useMachine(formStepMachine);

  //the value is the state where the machine is
  //in this case, the value is the current step of the form
  const { value } = state;

  //we can dynamically set the current step of the form with a factory component pattern
  //this pattern also allows us to pass props to our components which is very convenient
  function stepFactory() {
    return React.createElement(steps[value], {
      send,
    });
  }

  return <div>{stepFactory()}</div>;
}

export default App;
