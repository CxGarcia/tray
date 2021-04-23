import React, { useState } from 'react';
import styles from './PrivacyForm.module.scss';

function PrivacyForm({ send, initialState }) {
  const [userPreferences, setUserPreferences] = useState(initialState);

  const { trayUpdates, otherUpdates } = userPreferences;

  function handleSubmit(event) {
    event.preventDefault();
    send('SUBMIT', { payload: userPreferences });
  }

  function handleChange(event) {
    const { name } = event.target;
    setUserPreferences({ ...userPreferences, [name]: !userPreferences[name] });
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <label htmlFor="trayUpdates">
        Receive updates about Tray.io product by email
      </label>
      <input
        type="checkbox"
        id="trayUpdates"
        name="trayUpdates"
        defaultChecked={trayUpdates}
      />
      <label htmlFor="otherUpdates">
        Receive emails for other products created by the Tray.io team
      </label>
      <input
        type="checkbox"
        id="otherUpdates"
        name="otherUpdates"
        defaultChecked={otherUpdates}
      />
      <button onClick={() => send('BACK')}>Go Back</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PrivacyForm;
