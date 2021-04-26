import React, { useState } from 'react';
import styles from './AddressForm.module.scss';

function AddressForm({ send, context }) {
  const [info, setInfo] = useState(context);
  const { address1, address2, city, country } = info;

  function handleSubmit(event) {
    event.preventDefault();

    send('SUBMIT', { payload: info });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setInfo(() => {
      return { ...info, [name]: value };
    });
  }

  function handleBack(event) {
    event.preventDefault();
    send('BACK', { payload: info });
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <h1 className={styles.formTitle}>Address Information</h1>
      <div>
        <label htmlFor="address1">Address 1</label>
        <input id="address1" type="text" name="address1" value={address1} />
      </div>

      <div>
        <label htmlFor="address2">Address 2</label>
        <input id="address2" type="text" name="address2" value={address2} />
      </div>

      <div>
        <label htmlFor="city">City</label>
        <input id="city" type="text" name="city" value={city} />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input id="country" type="text" name="country" value={country} />
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={handleBack}>Back</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default AddressForm;
