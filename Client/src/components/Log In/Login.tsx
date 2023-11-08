import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Auth/authContext';
import './login.css';

const LogInComponent = () => {
  const { register, handleSubmit, formState: { errors, isValid }, getValues} = useForm({mode: "onChange"});
  const onSubmit = (data: any) => console.log(data);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

    const onLogin = () => {
      if (isValid) {
      const username = getValues("username");
      login(username)
        navigate('/', {
            replace: true
        });
      }
    }
    
  return (
    <main className='login-component'>
      <h2 className='welcome-text'>Welcome to <p className='welcome-logo'>Picky</p></h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input required className="input" type="text" placeholder="Username..." autoComplete="off" {...register('username', { required: true, minLength:4, maxLength:20 })} />
          {errors.username && (
            <span className='error-message'>
            {errors.username.type === 'required' && 'Username is required'}
            {errors.username.type === 'minLength' && 'Username must have at least 4 characters'}
            {errors.username.type === 'maxLength' && 'Username cannot be longer than 20 characters'}
            </span> 
            )}
        <input className="input" type="password" id="password" placeholder="Password..." autoComplete="off" {...register('password', { required: true, minLength: 6 })} />
            {errors.password && ( 
              <span className='error-message'>
              {errors.password.type === 'required' && 'Password is required'}
              {errors.password.type === 'minLength' && 'Password must have at least 6 characters'}
              </span> 
            )}
        <button type="submit" className="login-btn" onClick={onLogin}>
            <p className="login-text">Log In</p>
        </button>
        <span className='register-text'>Don't have an account?<NavLink to={"/register"}><p className='register-link'>Register</p></NavLink></span>
      </form>
    </main>
  );
}

export default LogInComponent;