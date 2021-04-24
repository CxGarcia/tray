import React from 'react';
import styles from './FormStep.module.scss';

function FormStep({ value }) {
  function renderSteps() {
    const steps = ['user', 'privacy'];
    const idxOfActiveStep = steps.indexOf(value);

    return steps.map((step, idx) => {
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

export default FormStep;
