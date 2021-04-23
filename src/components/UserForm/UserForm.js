import { useState } from 'react';

import styles from './UserForm.module.scss';

//TODO - change how this is displayed
const invalidText = {
  name: 'Your name is required',
  email: 'Please enter a valid email',
  password:
    'Your password has to be 9 chars long and include at least one uppercase letter, one lowercase letter, and one number',
};

function UserForm({ send }) {
  const [userInfo, setUserInfo] = useState({});
  const [invalid, setInvalid] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    send('SUBMIT', { payload: userInfo });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setUserInfo(() => {
      return { ...userInfo, [name]: value };
    });

    if (invalid.length > 0) setInvalid([]);
  }

  function handleInvalid(event) {
    const { name } = event.target;

    setInvalid(() => [...invalid, name]);
  }

  function renderInvalid() {
    return invalid.map((el) => {
      return <p key={el}>{invalidText[el]}</p>;
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        onInvalid={handleInvalid}
      >
        <input type="text" name="name" required />
        <input type="text" name="role" />
        <input type="email" name="email" required />
        <input
          required
          type="password"
          name="password"
          pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{9,})"
        />
        <button type="submit">Submit</button>
      </form>
      {renderInvalid()}
    </>
  );
}

export default UserForm;
