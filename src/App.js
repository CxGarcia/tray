import React from 'react';
import { useMachine } from '@xstate/react';

import UserForm from 'components/UserForm/UserForm';
import PrivacyForm from 'components/PrivacyForm/PrivacyForm';
import Loading from 'components/Loading/Loading';
import Success from 'components/Success/Success';
import Failure from 'components/Failure/Failure';

import { formStepMachine } from 'state-machines/formStepMachine';
import styles from './App.module.scss';

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
      initialState: state.context[value],
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.step}>{value}</div>
      <div className={styles.form}>{stepFactory()}</div>
    </div>
  );
}

export default App;
