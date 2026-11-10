import { useState,useEffect } from "react"
import "../Styles/General.css"
import "../Styles/MovieDetails.css"
import { GrPrevious } from "react-icons/gr";
export default function MovieDetails({config,selectedMovieId,setSelectedMovieId,videoLoading,videoError,trailer,theme}){

    const [movieDetails ,setMovieDetail]=useState(null)

    
    console.log(movieDetails)
    const videoUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}?origin=${window.location.origin}`
  : null;
    const size = "w342";
const posterPath = movieDetails?.poster_path;
const baseUrl = config?.images?.secure_base_url;
const imageUrl = baseUrl + size + posterPath;
    const url = `https://api.themoviedb.org/3/movie/${selectedMovieId}?language=en-US`;
    const options = {
  method: 'GET',
  headers: {accept: 'application/json',
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDk2MTIxZDg0NGYyMWQ2ZmYyZDUyYzQ0YjRmNTY3OCIsIm5iZiI6MTc4OTE3NjM4Ny4wNTIsInN1YiI6IjZhYTRhYTQzYzQ1MGNhZTg0MWY0MTZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NgM8tkrAaaqlpZ4MxXBi9_V9AT5hzu6OOIrFnzF6T4w'}

};

useEffect(()=>{

    fetch(url,options)
    .then(res=>res.json ())
    .then(json  => setMovieDetail(json ))
    .catch(err=>console.log(err));
},[selectedMovieId])



    const urlVideo = `https://api.themoviedb.org/3/movie/${selectedMovieId}/videos?language=en-US`;
    const optionVidio={
    method: 'GET',
      headers: {accept: ' lication/json',
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDk2MTIxZDg0NGYyMWQ2ZmYyZDUyYzQ0YjRmNTY3OCIsIm5iZiI6MTc4OTE3NjM4Ny4wNTIsInN1YiI6IjZhYTRhYTQzYzQ1MGNhZTg0MWY0MTZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NgM8tkrAaaqlpZ4MxXBi9_V9AT5hzu6OOIrFnzF6T4w'}
    }


   
console.log("TRAILER:", trailer);
console.log("KEY:", trailer?.key);
return (
    movieDetails && (
      <div className={`movie-details ${ theme ? "darkDetails":"lightDetails"}`}>
   <div className="details-header">
  <button
    className="back-button"
    onClick={() => setSelectedMovieId(null)}
  >
    <GrPrevious />
    Back to Movies
  </button>
</div>

    <div className="movie-details-main">

      <div className="movie-details-poster">
        <img
          src={imageUrl}     alt={movieDetails.title}  /> 
      </div>

      <div className="movie-details-info">

        <h2 className="movie-details-title">           
              {movieDetails.title}   </h2>

        <p className={`movie-details-tagline ${theme ? "darkTagline":"lightTagline"}`}>
          {movieDetails.tagline}
        </p>

        <div className="movie-details-meta">

          <div className={`movie-detail-item ${theme ? "darkItem" :"lightItem"}`}>
            <span className={`detail-label  ${theme ? "darkLabel" : "lightLabel"}`} >Status</span>
            <span className={`detail-value ${theme? "darkValue": "lightValue"}`}>
              {movieDetails.status}
            </span>
          </div>

          <div className={`movie-detail-item ${theme ? "darkItem" :"lightItem"}`}>
            <span className={`detail-label  ${theme ? "darkLabel" : "lightLabel"}`} >Rating</span>
            <span className={`detail-value ${theme? "darkValue": "lightValue"}`}>
              ⭐ {movieDetails.vote_average}/10
            </span>
          </div>

          <div className={`movie-detail-item ${theme ? "darkItem" :"lightItem"}`}>
            <span className={`detail-label  ${theme ? "darkLabel" : "lightLabel"}`} >Release Date</span>
            <span className={`detail-value ${theme? "darkValue": "lightValue"}`}>
              {movieDetails.release_date}
            </span>
          </div>

          <div className={`movie-detail-item ${theme ? "darkItem" :"lightItem"}`}>
            <span className={`detail-label  ${theme ? "darkLabel" : "lightLabel"}`}>Runtime</span>
            <span className={`detail-value ${theme? "darkValue": "lightValue"}`}>
              {movieDetails.runtime} min
            </span>
          </div>
<div className="div-buttom"></div>

        </div>

      </div>

    </div>
<div className="iframe">     {videoLoading ? <p>⏳ Loading video...</p> : videoError ? <p>{videoError.message}</p> : trailer && (
<div className="trailer-section">

  <h3 className="trailer-title">
    <span className="trailer-icon">▶</span>
    Official Trailer
  </h3>

  <div className="iframe">
    {videoLoading ? (
      <p>⏳ Loading video...</p>
    ) : videoError ? (
      <p>{videoError.message}</p>
    ) : trailer ? (
      <iframe
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    ) : (
      <p>No trailer available</p>
    )}
  </div>

</div>
    )}</div>
    <div className="movie-details-description">

      <h3 className="section-title">Overview</h3>

      <p className="movie-overview">
        {movieDetails.overview}
      </p>

    </div>

    <div className="movie-details-genres">

      <h3 className="section-title">Genres</h3>

      <ul className="genres-list">
        {movieDetails.genres.map((genre) => (
          <li
            className="genre-item"
            key={genre.id}
          >
            {genre.name}
          </li>
        ))}
      </ul>

    </div>
 

    
  </div>)
);
}