import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../../Auth/authContext';
import './login.css';

type FormData = {
  username: string;
  password: string;
  email: string;
};

const LogInComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ mode: "onChange" });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin: SubmitHandler<FormData> = (data) => {
    login(data.username, data.password, data.email);
    navigate('/', {
      replace: true
    });
  };
    
  return (
    <main className='login-component'>
      <h2 className='welcome-text'>Welcome to <p className='welcome-logo'>Picky</p></h2>
      <form className="form" onSubmit={handleSubmit(onLogin)}>
        <input required className="input" type="text" placeholder="Username..." autoComplete="off" {...register('username', { required: true, minLength:3, maxLength:15 })} />
          {errors.username && (
            <span className='error-message'>
            {errors.username.type === 'required' && 'Username is required'}
            {errors.username.type === 'minLength' && 'Username must have at least 3 characters'}
            {errors.username.type === 'maxLength' && 'Username cannot be longer than 15 characters'}
            </span> 
            )}
        <input className="input" type="password" id="password" placeholder="Password..." autoComplete="off" {...register('password', { required: true, minLength: 6 })} />
            {errors.password && ( 
              <span className='error-message'>
              {errors.password.type === 'required' && 'Password is required'}
              {errors.password.type === 'minLength' && 'Password must have at least 6 characters'}
              </span> 
            )}
        <button type="submit" className="login-btn">
            <p className="login-text">Log In</p>
        </button>
        <span className='register-text'>Don't have an account?<NavLink to={"/register"}><p className='register-link'>Register</p></NavLink></span>
      </form>
    </main>
  );
}

export default LogInComponent;