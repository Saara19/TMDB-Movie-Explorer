import "../Styles/cardMoves.css"
import "../Styles/General.css"


export default function CardMove({ movie,config,setSelectedMovieId,theme}) {
  const size = "w342";
const posterPath = movie.poster_path;
const baseUrl = config.images.secure_base_url;
const imageUrl = baseUrl + size + posterPath;
console.log("Child:", theme);
return (
<div className="card" onClick={()=>setSelectedMovieId(movie.id)} >
        

<li className={`movie-card ${theme ? "darkCard" :"lightCard"}`}>
<img src={imageUrl} alt={movie.title} />
  <p className={`movie-title  ${theme ? "darkCard" :"lightCard"}`}>{movie.title}</p>
  <p className={`movie-rating  ${theme ? "darkCard" :"lightCard"}`}>{movie.vote_average}</p>
  <p className={`movie-release-date  ${theme ? "darkCard" :"lightCard"}`}>{movie.release_date}</p>
  <p className={`movie-overview  ${theme ? "darkCard" :"lightCard"} ${theme ? "movie-overview-dark" : "movie-overview-light"}`}>{movie.overview}</p>
</li> 
        
         
         
        
    
</div>
)

}
