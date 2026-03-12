import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom"
import { fetchMovieDetails, getImageUrl } from "../../services/api";
import { useEffect, useState } from "react";
import s from "./MovieDetailsPage.module.css"

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null)
  const location = useLocation()
  useEffect(()=>{
    const getData = async() => {
      const data = await fetchMovieDetails(movieId);
      setDetails(data)
    }
    getData()
  },[movieId])

  if (!details) return <p>Loading...</p>;
  return (
  <div className={s.container}>
    <div 
      className={s.backdrop} 
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})` }}
    ></div>

    <Link to={location.state?.from ?? '/'} className={s.backBtn}>
      ← Go back
    </Link>

    <div className={s.contentWrapper}>
      <img 
        src={details.poster_path ? getImageUrl(details.poster_path) : ""} 
        alt={details.title} 
        className={s.mainPoster}
      />
      
      <div className={s.info}>
        <h1 className={s.title}>{details.title}</h1>
        <p className={s.status}>Status: <span>{details.status}</span></p>
        <p className={s.popularity}>Popularity: {details.popularity.toFixed(0)}</p>
        
        <div className={s.overview}>
          <h3>Overview</h3>
          <p>{details.overview || "No description available."}</p>
        </div>

        <nav className={s.detailsNav}>
          <NavLink to="cast" state={{ from: location.state?.from }} className={({ isActive }) => isActive ? s.active : s.link}>Cast</NavLink>
          <NavLink to="reviews" state={{ from: location.state?.from }} className={({ isActive }) => isActive ? s.active : s.link}>Reviews</NavLink>
        </nav>
      </div>
    </div>

    <div className={s.subContent}>
      <Outlet context={{ from: location.state?.from }} />
    </div>
  </div>
);
}

export default MovieDetailsPage