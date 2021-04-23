import { useState } from 'react';

import { debounce } from 'utils';
import styles from './UserForm.module.scss';

function UserForm({ send }) {
  const [userInfo, setUserInfo] = useState({});

  //debounced handleChange as to not trigger constant rerenders from state changes when user is inputting values
  const handleChange = debounce(function handleChange(event) {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  }, 500);

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
