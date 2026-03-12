import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css"
const NotFoundPage = () => {
    return (
    <div className={s.errorContainer}>
      <div className={s.contentWrapper}>
        <div className={s.glitchWrapper}>
          <h1 className={s.errorCode}>404</h1>
        </div>
        <h2 className={s.errorTitle}>Oops! The frame broke.</h2>
        <p className={s.errorText}>
          We couldn`t find the movie you were looking for. Perhaps it was a lost premiere or a corrupted file.
        </p>
        <Link to="/" className={s.homeBtn}>
          Back to Main Stage
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage
