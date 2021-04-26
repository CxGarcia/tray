import React from 'react';
import styles from './FormSteps.module.scss';

function FormSteps({ value }) {
  function renderSteps() {
    const steps = ['user', 'address', 'privacy'];
    const idxOfActiveStep = steps.indexOf(value);

    return steps.map((step, idx) => {
      //to check if the step is or was active, we can check if the curr idx of the map is less than or equal
      //to idxOfActiveStep OR if the value isn't contained within the array of steps since this means that our form
      //is already in the done state
      const active = idx <= idxOfActiveStep || idxOfActiveStep === -1;

      return (
        <h3
          key={step}
          className={`
          ${styles.step}
          ${active && styles.activeStep}
          `}
        >
          {step}
        </h3>
      );
    });
  }

  function renderDone() {
    const success = value === 'success';
    const failure = value === 'failure';

    return (
      <h3
        key="done"
        className={`
          ${styles.step}
          ${success && styles.success}
          ${failure && styles.failure}
          `}
      >
        {failure ? 'error' : success ? 'success' : 'done'}
      </h3>
    );
  }

  return (
    <>
      {renderSteps()}
      {renderDone()}
    </>
  );
}

export default FormSteps;
