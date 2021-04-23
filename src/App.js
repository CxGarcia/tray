import React from 'react';
import { useMachine } from '@xstate/react';

import Success from 'components/Success/Success';
import Loading from 'components/Loading/Loading';
import Failure from 'components/Failure/Failure';
import UserForm from 'components/UserForm/UserForm';
import PrivacyForm from 'components/PrivacyForm/PrivacyForm';

import { formStepMachine } from 'state-machines/formStepMachine';
import './App.module.scss';

const steps = {
  user: UserForm,
  privacy: PrivacyForm,
  loading: Loading,
  success: Success,
  failure: Failure,
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
