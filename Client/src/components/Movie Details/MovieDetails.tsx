import './moviedetails.css'
import imdb from '../../assets/imdb.logo.svg'

const MovieDetailsComponent = () => {
  return (
    <main className='details-component'>
      <section className='details-cover-container'>
        <img className='details-cover' src='https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png' />
        <article className='details-manager'>
          <div className="details-seen">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-manager icon-tabler icon-tabler-eye-closed" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4"></path>
              <path d="M3 15l2.5 -3.8"></path>
              <path d="M21 14.976l-2.492 -3.776"></path>
              <path d="M9 17l.5 -4"></path>
              <path d="M15 17l-.5 -4"></path>
            </svg>
            <p className='text-manager'>Seen</p>
          </div>
          <div className="details-watchlist">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-manager icon-tabler icon-tabler-bookmark" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z"></path>
            </svg>
            <p className='text-manager'>Watchlist</p>
          </div>
        </article>
      </section>
      <section className='details-container'>
        <article className='details-title-wrapper'>
          <h1 className='details-movie-title'>Title</h1>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-x" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7h16"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
            <path d="M10 12l4 4m0 -4l-4 4"></path>
          </svg>
        </article>
        <article className='details-movie-info'>
          <div className='details-movie-info-rating-wrapper'>
            <h2 className='details-movie-info-title'>RATING</h2>
            <div className="rating-container">
              <img src={imdb} className='imdb'/>
              <p className='details-movie-info-paragraph'>10</p>
            </div>
          </div>
          <div className='details-movie-info-genres-wrapper'>
            <h2 className='details-movie-info-title'>GENRES</h2>
            <div className="genres-container">
              <p className='details-movie-info-paragraph'>Fantasy, Thriller, Comedy</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default MovieDetailsComponent;