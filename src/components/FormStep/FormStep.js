import React from 'react';
import styles from './FormStep.module.scss';

function FormStep({ steps, value }) {
  function renderSteps() {
    const steps = ['user', 'privacy', 'done'];
    const idxOfActiveStep = steps.indexOf(value);

    return steps.map((step, idx) => {
      const active = idx <= idxOfActiveStep;

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

  return <>{renderSteps()}</>;
}

export default FormStep;
