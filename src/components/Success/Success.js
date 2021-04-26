import React from 'react';
import { deepClone } from 'utils';
import styles from './Success.module.scss';

function Success({ context }) {
  const _context = deepClone(context);
  _context.user['password'] = _context?.user?.password.replace(/./gi, '*');

  return (
    <>
      <h1 className={styles.formTitle}>Success</h1>
      <pre className={styles.json}>{JSON.stringify(_context, null, 4)}</pre>
    </>
  );
}

export default Success;
