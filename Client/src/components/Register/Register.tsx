import { useNavigate } from 'react-router-dom';
import './register.css';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const RegisterComponent = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({ mode: "onChange" });
  
  const navigate = useNavigate();

  const onRegister: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('http://localhost:4001/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
      });

      if (response.ok) {
        navigate('/', {
          replace: true
        });
      } else {
          console.error('registration failed')
      }
    } catch (error) {
      console.error('an error ocurred')
    }
  };

  return (
    <main className='register-component'>
      <h2 className='register-title'>Register</h2>
      <form className="form" onSubmit={handleSubmit(onRegister)}>
        <input required className="input" type="email" placeholder="Email..." autoComplete="off" 
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
          {...register('name', { 
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
        {errors.name && <span className='error-message'>{errors.name.message}</span>}
        
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
