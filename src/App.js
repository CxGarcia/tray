import { useMachine } from '@xstate/react';
import { formStepMachine } from 'state-machines/formStepMachine';
import UserForm from 'components/UserForm/UserForm';

import './App.module.scss';

function App() {
  const [step, send] = useMachine(formStepMachine);

  return (
    <div>
      <UserForm send={send} />
    </div>
  );
}

export default App;
