import { useState } from 'react';

import styles from './UserForm.module.scss';

function UserForm({ send }) {
  const [userInfo, setUserInfo] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    send('SUBMIT', { payload: userInfo });
  }

  function handleError(event) {
    console.log(event);
  }

  return (
    <form onChange={handleChange} onSubmit={handleSubmit} onError={handleError}>
      <input type="text" name="name" required />
      <input type="text" name="role" />
      <input type="email" name="email" required />
      <input required type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
