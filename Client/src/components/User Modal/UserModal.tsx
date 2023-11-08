import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/authContext';
import './usermodal.css';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type UserModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
};

const UserModalComponent = ({ isVisible }: UserModalProps) => {
  const currentUser = { email: '', username: '', password: '' };
  const modalClassName = isVisible ? 'user-modal-component shown' : 'user-modal-component hidden'

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
    defaultValues: currentUser,
    mode: "onChange"
  });
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onUpdate: SubmitHandler<FormData> = (data) => {
    if (data.username !== currentUser.username) {
      login(data.username, data.password, data.email);
    }
    navigate('/', {
      replace: true
    });
  };
  
  return (
    <section className={modalClassName}>
      <form className="user-modal-form" onSubmit={handleSubmit(onUpdate)}>
        <input className="modal-input" type="text" placeholder="Update Email..." autoComplete="off" 
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Must be a valid email'
            }
          })}
        />
        {errors.email && <span className='modal-error-message'>{errors.email.message}</span>}
        
        <input className="modal-input" type="text" placeholder="Update Username..." autoComplete="off" 
          {...register('username', { 
            required: 'Username is required',
            minLength: {
              value: 4,
              message: 'Username must have at least 4 characters'
            }, 
            maxLength: {
              value: 20,
              message: 'Username cannot be longer than 20 characters'
            }
          })}
        />
        {errors.username && <span className='modal-error-message'>{errors.username.message}</span>}
        
        <input className="modal-input" type="password" placeholder="New Password..." autoComplete="off" 
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters'
            }
          })}
        />
        {errors.password && <span className='modal-error-message'>{errors.password.message}</span>}
        
        <input className="modal-input" type="password" placeholder="Confirm New Password..." autoComplete="off" 
          {...register('confirmPassword', { 
            required: 'Password confirmation is required',
            validate: value => value === getValues('password') || 'The passwords do not match'
          })}
        />
        {errors.confirmPassword && <span className='modal-error-message'>{errors.confirmPassword.message}</span>}
        
        <button type="submit" className="user-modal-btn">
          <p className="user-modal-btn-text">Save Changes</p>
        </button>
      </form>
    </section>
  );
}

export default UserModalComponent;
