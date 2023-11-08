import { NavLink } from 'react-router-dom';
import './header.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Auth/authContext';
import ModalComponent from '../Add Modal/Modal';

const HeaderComponent = () => {
  const { isLogged } = useContext(AuthContext);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : {};
  const { name } = user;
  const [imgSrc, setImgSrc] = useState(localStorage.getItem('userImg') || '');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleButtonRef = useRef(null);
  
  useEffect(() => {
    const handleUserImageUpdate = () => {
      setImgSrc(localStorage.getItem('userImg') || '');
    };
    window.addEventListener('userImageUpdated', handleUserImageUpdate);
    return () => {
      window.removeEventListener('userImageUpdated', handleUserImageUpdate);
    };
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <header className="header">
        <section className="header-container">
          <NavLink to={"/"}>
            <p className='logo'>Picky</p>
          </NavLink>
          {isLogged ? (
            <article className="logged-wrapper">
            <p className='logged-text'>Welcome back, {name}!</p>
            <NavLink to={'/user'} className={"user-link-container"}>
              {imgSrc ? (
                <div style={{ backgroundImage: `url(${imgSrc})` }} className="user-avatar" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-hexagon" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z"></path>
                  <path d="M6.201 18.744a4 4 0 0 1 3.799 -2.744h4a4 4 0 0 1 3.798 2.741"></path>
                  <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
                </svg>
              )}
            </NavLink>
            <svg ref={toggleButtonRef} onClick={toggleModal} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-hexagon-plus" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
                <path d="M9 12h6"></path>
                <path d="M12 9v6"></path>
            </svg>
          </article>
          ) : (
            <NavLink to={'/log-in'}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-key" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z"></path>
                <path d="M15 9h.01"></path>
              </svg>
            </NavLink>
          )}
          <ModalComponent isVisible={isModalVisible} toggleModal={toggleModal} toggleButtonRef={toggleButtonRef}/>
        </section>
    </header>
  );
}

export default HeaderComponent;