import { useEffect, useState } from "react"
import { fetchMovies } from "../../services/api"
import MovieList from "../../components/MovieList/MovieList"
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([])

  useEffect(()=>{
    const getData = async() => {
      const data = await fetchMovies();
      setMovies(data)
    }
    getData()
  },[])
  return (
    <div>
      <h2 className={s.mainTitle}>Trending today</h2>
      <MovieList movies={movies}/>
    </div>
  )
}

export default HomePage