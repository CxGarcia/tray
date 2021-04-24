import React from 'react';
import { ReactComponent as Spinner } from 'assets/icons/spinner.svg';

import styles from './Loading.module.scss';

function Loading() {
  return (
    <>
      <Spinner className={styles.spinner} />
    </>
  );
}

export default Loading;
