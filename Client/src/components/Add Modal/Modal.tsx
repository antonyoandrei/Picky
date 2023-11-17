import './modal.css';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieContext, MovieType } from '../../context/MovieContext';
import toast, { Toaster } from 'react-hot-toast';
import { createMovie } from '../../services/movies.service';
import { useAuth0 } from '@auth0/auth0-react';

export type FormData = {
  title: string;
  rating: string;
  genres: string;
  imgSrc: string;
};

type UserModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
  toggleButtonRef: React.RefObject<SVGSVGElement>;
};

const ModalComponent = ({ isVisible, toggleModal, toggleButtonRef }: UserModalProps & { toggleButtonRef: React.RefObject<SVGSVGElement> }) => {
  const modalClassName = isVisible ? 'modal-component shown' : 'modal-component hidden';
  const [movie, setMovie] = useState<FormData>({ title: '', rating: '', genres: '', imgSrc: localStorage.getItem('movieImg') || '' });
  const modalRef = useRef<HTMLDivElement>(null);
  const { addMovieToAll } = useContext(MovieContext);
  const {getAccessTokenSilently}= useAuth0()
  const navigate = useNavigate();

  const onUpdate = async () => {
    const parsedRating = parseFloat(movie.rating);
    try {
      if (movie.title && !isNaN(parsedRating) && movie.genres && movie.imgSrc) {
        const newMovie: MovieType = {
          title: movie.title,
          rating: parsedRating,
          genres: movie.genres,
          imgSrc: movie.imgSrc,
        };
        addMovieToAll(newMovie);
        navigate('/', { replace: true });
        toggleModal();
        setMovie({ title: '', rating: '', genres: '', imgSrc: '' }); 
        const token = await getAccessTokenSilently();
        await createMovie(movie, token);
        toast.success('Movie added successfully!');
        console.log(token);
      } else {
        toast.error('All fields are required, and rating must be a number.');
      }
    } catch (error) {
      console.error('Error creating movie:', error);
      toast.error('An error occurred while adding the movie.');
    }
  };

  const handleChange =  (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setMovie({ ...movie, imgSrc: url });
      window.dispatchEvent(new Event('movieImageUpdated'));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isVisible && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (!toggleButtonRef.current || !toggleButtonRef.current.contains(event.target as Node)) {
          toggleModal();
        }
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isVisible && event.key === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isVisible, toggleModal, modalRef, toggleButtonRef]); 

  return (
    <>
    <Toaster
        position="top-right"
        toastOptions={{
          error: {
            iconTheme: {
              primary: 'var(--secondary)',
              secondary: 'var(--primary)',
            },
            style: {
              background: 'var(--primary)',
              color: 'var(--secondary)',
            },
          },
          success: {
            iconTheme: {
              primary: 'var(--secondary)',
              secondary: 'var(--primary)',
            },
            style: {
              background: 'var(--primary)',
              color: 'var(--secondary)',
            },
          },
        }}
      />
    <section ref={modalRef} className={modalClassName}>
      <h3 className='modal-title'>Add a movie</h3>
      <div className="movie-info">
        <section className='cover-wrapper'>
          <article className='cover-img' style={movie.imgSrc ? { backgroundImage: `url(${movie.imgSrc})` } : {}}>
            {!movie.imgSrc && 
              <img className='cover' src='https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'/>
            }
          </article>
          <article className="cover-container">
              <input className="modal-img-input" type="file" onChange={handleChange}/>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 9l5 -5l5 5"></path>
                  <path d="M12 4l0 12"></path>
              </svg>
          </article>
        </section>
        <form className="modal-form">
          <input className="modal-input" type="text" placeholder="Title" autoComplete="off" 
            name="title"
            value={movie.title}
            onChange={handleInputChange}
          />
          
          <input className="modal-input" type="text" placeholder="Rating" autoComplete="off" 
            name="rating"
            value={movie.rating}
            onChange={handleInputChange}
          />
          
          <input className="modal-input" type="text" placeholder="Genres" autoComplete="off" 
            name="genres"
            value={movie.genres}
            onChange={handleInputChange}
          />
        </form>
      </div>  
      <button type="button" className="modal-btn" onClick={onUpdate}>
        <p className="modal-btn-text">Add movie</p>
      </button>
    </section>
    </>
  );
}

export default ModalComponent;