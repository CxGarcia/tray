import React from 'react';
import styles from './Success.module.scss';

function Success({ context }) {
  return (
    <>
      <h1 className={styles.formTitle}>Success</h1>
      <pre className={styles.json}>{JSON.stringify(context, null, 4)}</pre>
    </>
  );
}

export default Success;
