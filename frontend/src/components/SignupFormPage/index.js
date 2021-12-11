import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return (
    <Redirect to='/' />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ username, email, password }))
        .then(() => history.push('/'))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <ul>
          {errors.map((err, i) =>
            <li key={i}>{err}</li>
          )}
        </ul>
      )}
      <div>
        <label>
          Username
          <input
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email
          <input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Confirm Password
          <input
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </label>
      </div>
      <button type='submit'>Sign In</button>
    </form>
  )
}

export default SignupFormPage;