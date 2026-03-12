import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast, getImageUrl } from "../../services/api";
import s from "./MovieCast.module.css"

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([])
  useEffect(()=>{
    const getData = async() => {
      const data = await fetchMovieCast(movieId);
      setActors(data)
    }
    getData()
  },[movieId])

  if (actors.length === 0) return <p>No cast information available.</p>;

  return (
  <div className={s.castContainer}>
    <h2 className={s.sectionTitle}>Full Cast</h2>
    <ul className={s.castList}>
      {actors.map((actor) => (
        <li key={actor.id} className={s.castItem}>
          <div className={s.photoWrapper}>
            <img
              src={actor.profile_path ? getImageUrl(actor.profile_path) : "https://via.placeholder.com/200x300?text=No+Photo"}
              alt={actor.name}
              className={s.actorPhoto}
            />
          </div>
          <div className={s.meta}>
            <p className={s.name}>{actor.name}</p>
            <p className={s.character}>{actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default MovieCast