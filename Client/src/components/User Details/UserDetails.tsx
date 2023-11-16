import { useState } from 'react';
import './userdetails.css';
import UserModalComponent from '../User Modal/UserModal';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';

const UserDetailsComponent = () => {
  const { user } = useAuth0();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { logout } = useAuth0();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }
 
  return (
    <main className='user-component'>
      <article className='logout'>
        <svg onClick={() => logout({ returnTo: window.location.origin } as LogoutOptions)} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
          <path d="M9 12h12l-3 -3"></path>
          <path d="M18 15l3 -3"></path>
        </svg>
      </article>
      <section className='user'>
        <article className='user-img' style={user.picture ? { backgroundImage: `url(${user.picture})` } : {}}>
          {!user.picture && 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-details-hexagon" width="400" height="400" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z"></path>
              <path d="M6.201 18.744a4 4 0 0 1 3.799 -2.744h4a4 4 0 0 1 3.798 2.741"></path>
              <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
            </svg>
          }
        </article>
        <article className="user-details">
            <p className="username">{user.name}</p>
            <button type="submit" className="profile-btn" onClick={toggleModal}>
              <p className="profile-btn-text">Edit profile</p>
            </button>
            <UserModalComponent isVisible={isModalVisible} toggleModal={toggleModal} />
        </article>
      </section> 
    </main>
  );
}

export default UserDetailsComponent;

