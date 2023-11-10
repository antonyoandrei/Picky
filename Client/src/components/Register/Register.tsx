import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/authContext';
import './register.css';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterComponent = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({ mode: "onChange" });
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onRegister: SubmitHandler<FormData> = (data) => {
    login(data.username, data.password, data.email);
    navigate('/', {
      replace: true
    });
  };

  return (
    <main className='register-component'>
      <h2 className='register-title'>Register</h2>
      <form className="form" onSubmit={handleSubmit(onRegister)}>
        <input required className="input" type="text" placeholder="Email..." autoComplete="off" 
          {...register('email', { 
            required: 'Email is required', 
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Must be a valid email'
            }
          })}
        />
        {errors.email && <span className='error-message'>{errors.email.message}</span>}
        
        <input required className="input" type="text" placeholder="Username..." autoComplete="off" 
          {...register('username', { 
            required: 'Username is required', 
            minLength: {
              value: 3,
              message: 'Username must have at least 3 characters'
            }, 
            maxLength: {
              value: 15,
              message: 'Username cannot be longer than 15 characters'
            }
          })}
        />
        {errors.username && <span className='error-message'>{errors.username.message}</span>}
        
        <input required className="input" type="password" id="password" placeholder="Password..." autoComplete="off" 
          {...register('password', { 
            required: 'Password is required', 
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters'
            }
          })}
        />
        {errors.password && <span className='error-message'>{errors.password.message}</span>}
        
        <input required className="input" type="password" id="confirmPassword" placeholder="Repeat password..." autoComplete="off" 
          {...register('confirmPassword', { 
            validate: value => value === getValues('password') || 'The passwords do not match'
          })}
        />
        {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword.message}</span>}
        
        <button type="submit" className="register-btn">
            <p className="register-btn-text">Register</p>
        </button>
      </form>
    </main>
  );
}

export default RegisterComponent;
