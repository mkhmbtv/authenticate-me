import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './LoginForm.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return (
    <Redirect to='/' />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return ( 
    <form className='login-form' onSubmit={handleSubmit}>
      <h1>Log In</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((err, i) => 
            <li key={i} className='error'>{err}</li>
          )}
        </ul>
      )}
      <div>
        <label>
          Username or Email
          <input
            type='text'
            onChange={(e) => setCredential(e.target.value)}
            value={credential}
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
      <button className='btn' type='submit'>Log In</button>
    </form>
  );
};

export default LoginFormPage;