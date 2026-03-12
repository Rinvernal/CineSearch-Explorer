import { Link, useLocation } from "react-router-dom"
import s from "./MovieList.module.css"

const MovieList = ({ movies }) => {
  const location = useLocation() || '/';
  const defaultImg = 'https://dl-preview.csdnimg.cn/71102357/0004-80332309d69107936630f9a235889791_preview-wide.jpg';

  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.item}>
          <Link to={`/movies/${movie.id}`} state={{ location }} className={s.link}>
            <div className={s.thumb}>
              <img 
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                  : defaultImg} 
                alt={movie.title} 
                className={s.poster}
              />
              <div className={s.overlay}>
                <span className={s.rating}>{movie.vote_average?.toFixed(1)}</span>
              </div>
            </div>
            <p className={s.movieTitle}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default MovieList