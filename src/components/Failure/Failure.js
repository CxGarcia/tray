import React from 'react';
import styles from './Failure.module.scss';

function Failure({ send }) {
  return (
    <>
      <h1 className={styles.formTitle}>Faaaaaail</h1>
      <div className={styles.container}>
        <p>
          The app is programmed to fail 40% of the time and you are one of the
          lucky ones. Just hit retry and try your luck once more.
        </p>
        <button className={styles.retryButton} onClick={() => send('RETRY')}>
          Retry
        </button>
      </div>
    </>
  );
}

export default Failure;
