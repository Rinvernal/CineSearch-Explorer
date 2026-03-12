import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import s from "./MovieReviews.module.css"
const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([])
  useEffect(()=>{
    const getData = async() => {
      const data = await fetchMovieReviews(movieId);
      setReviews(data.results || []);
    }
    getData()
  },[movieId])

  if (reviews.length === 0) {
    return <p>We don`t have any reviews for this movie.</p>
  };
  return (
    <div className={s.reviewsContainer}>
      <ul className={s.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={s.reviewItem}>
            <div className={s.authorBadge}>
              <div className={s.avatar}>{review.author[0].toUpperCase()}</div>
                <p className={s.authorName}>
                  Review by <span>{review.author}</span>
                </p>
              </div>
              <div className={s.contentWrapper}>
                <p className={s.content}>{review.content}</p>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews