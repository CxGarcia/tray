import React, { useState } from 'react';
import styles from './PrivacyForm.module.scss';

function PrivacyForm({ send }) {
  const [userPreferences, setUserPreferences] = useState({
    trayUpdates: false,
    otherUpdates: false,
  });

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
      <input
        type="checkbox"
        name="trayUpdates"
        defaultChecked={userPreferences.trayUpdates}
      />
      <input
        type="checkbox"
        name="otherUpdates"
        defaultChecked={userPreferences.otherUpdates}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PrivacyForm;
