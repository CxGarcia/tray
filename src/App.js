import React from 'react';
import { useMachine } from '@xstate/react';

import FormSteps from 'components/FormSteps/FormSteps';
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

  //the value is the current state of the machine
  //in this case, the value is the current step of the form
  const { value, context } = state;

  //we can dynamically set the form that will be rendered depending on the current state of the state machine
  const CurrentStep = steps[value];

  return (
    <div className={styles.container}>
      <div className={styles.step}>
        <FormSteps value={value} />
      </div>
      <div className={styles.form}>
        <CurrentStep send={send} context={context[value]} />
      </div>
    </div>
  );
}

export default App;
