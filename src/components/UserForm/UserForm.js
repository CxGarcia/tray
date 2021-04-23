import { useState } from 'react';

import styles from './UserForm.module.scss';

//TODO - change how this is displayed
const invalidText = {
  name: 'Your name is required',
  email: 'Please enter a valid email',
  password:
    'Your password has to be 9 chars long and include at least one uppercase letter, one lowercase letter, and one number',
};

function UserForm({ send, initialState }) {
  const [userInfo, setUserInfo] = useState(initialState);
  const [invalid, setInvalid] = useState([]);

  const { name, role, email, password } = userInfo;

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

    if (invalid.includes(name)) return;

    setInvalid(() => [...invalid, name]);
  }

  function renderInvalid() {
    return invalid.map((el) => {
      return <p key={el}>{invalidText[el]}</p>;
    });
  }

  return (
    <>
      <h1>Create your account</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onInvalid={handleInvalid}
      >
        <label htmlFor="name">
          Name
          <input required id="name" type="text" name="name" value={name} />
        </label>

        <label htmlFor="role">
          Role
          <input id="role" type="text" name="role" value={role} />
        </label>

        <label htmlFor="email">
          Email
          <input required id="email" type="email" name="email" value={email} />
        </label>

        <label htmlFor="password">Password</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          value={password}
          pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{9,}"
        />
        <button type="submit">Submit</button>
      </form>
      {renderInvalid()}
    </>
  );
}

export default UserForm;
