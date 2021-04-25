import React, { useState } from 'react';
import styles from './PrivacyForm.module.scss';

function PrivacyForm({ send, context }) {
  const [userPreferences, setUserPreferences] = useState(context);

  const { trayUpdates, otherUpdates } = userPreferences;

  function handleSubmit(event) {
    event.preventDefault();
    send('SUBMIT', { payload: userPreferences });
  }

  function handleBack(event) {
    event.preventDefault();
    send('BACK', { payload: userPreferences });
  }

  function handleChange(event) {
    const { name } = event.target;
    setUserPreferences({ ...userPreferences, [name]: !userPreferences[name] });
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <h1 className={styles.formTitle}>Hear from us</h1>

      <div>
        <input
          type="checkbox"
          id="trayUpdates"
          name="trayUpdates"
          defaultChecked={trayUpdates}
        />
        <label htmlFor="trayUpdates">
          Receive updates about Tray.io product by email
        </label>
      </div>

      <div>
        <input
          type="checkbox"
          id="otherUpdates"
          name="otherUpdates"
          defaultChecked={otherUpdates}
        />
        <label htmlFor="otherUpdates">
          Receive emails for other products created by the Tray.io team
        </label>
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={handleBack}>Go Back</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default PrivacyForm;
