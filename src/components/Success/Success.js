import React from 'react';
import styles from './Success.module.scss';

function Success({ initialState }) {
  return (
    <>
      <h1 className={styles.formTitle}>Success</h1>
      <pre className={styles.json}>{JSON.stringify(initialState, null, 4)}</pre>
    </>
  );
}

export default Success;
