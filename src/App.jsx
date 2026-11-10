import { useEffect,useState,useContext,useRef } from "react";
import CardMove from "./components/cardMove";
import { ThemeProvider } from "./context.jsx/theme.jsx";
import "./Styles/App.css"
import "./Styles/General.css"
import { GrNext } from "react-icons/gr";
import NavBar from "./components/navBar";
import MovieDetails from "./components/MovieDetails";
import { GrPrevious } from "react-icons/gr";

function App() {
  const topRatedRef = useRef(null);
  const [theme,setTheme]=useState(true)
  // هذا يحفظ االاعلان الذي وقع عليه شروط 
  //console.log("Parent:", theme);
    const [trailer, setTrailer] = useState(null);
  const [movies, setMovies] = useState([]);
  //0.le.log("movies length:", movies.length);
  // ه0ذه الستيت تحرك اليوز افكت لشغيل الافلام القادمه من السيرتش
  const [config, setConfig] = useState(null);
  //هذه تحتوي على نتائج البحث
  const [resSearch,setResSearch]=useState([]);
  //console.log("im from App resSearch ",resSearch)
  // تحتوي على رقم الصفحه  التي تخص البحث وتحدث برمجيا
  const [searchPage, setSearchPage] = useState(1);
  const [search, setSearch]=useState("")
  //console.log("i'm from search",search)
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  //هذه رقم الفحة وتحدث يدوي 
  const [page, setPage] = useState(1);
  // العدد الصفحات الكلي 
  const [totalPages, setTotalPages] = useState(0);
  //هذه تحفظ افضل الافلام
//هذا خاص بطلب الافلام 
const [loading,setLoading] = useState(false);
const [error,setError] = useState(null);
//هذا خاص بطلب الفديوهات
const [videoLoading, setVideoLoading] = useState(false);
const [videoError, setVideoError] = useState(null);
const [topRatedPage, setTopRatedPage] = useState(1); 
//const [pageTotalRated, setPageTotalRat] = useState(0);
const [topRated, setTopRated] = useState([]);
const scrollRight = () => {
  topRatedRef.current.scrollBy({
    left: 300,
    behavior: "smooth"
  });
};

const scrollLeft = () => {
  topRatedRef.current.scrollBy({
    left: -300,
    behavior: "smooth"
  });
};
//console.log("im from App resSearch",resSearch)
//console.log("im from App search",search)
//console.log("im from App config",config)
  let moviesContent ;
 // console.log("config:", config);
////هذا خاص بطلب الافلام الشعبية حسب الصفحة 

useEffect(() => {
const url =`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
const configUrl = "https://api.themoviedb.org/3/configuration";

const options = {
      method: "GET",
      headers: {
        accept: "application/json",
           Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
          },
    };
  fetch ( configUrl, options)
  .then((res) => res.json())
  .then((json) => {  setConfig(json);
    
    
  })
  .catch ( (err) => console.error(err));
  setLoading(true);
  setError(null)
  fetch(url, options)
.then((res) => {
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
})
.then((json) => {
  setMovies(json.results);
  setTotalPages(json.total_pages);
  setLoading(false);
})
.catch((err) => {
  setLoading(false);
  setError(err);



  
});}, [page]);


//هذا يجلب  الافلام الاعلى تقيم
//هذا لمعالجة مشكلة الستيت

useEffect(() => {
  console.log("Top Rated:", topRated);
}, [topRated]);
//هذا  لجب الافلام الاعلى تقيم
const urlTopRated = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${topRatedPage}`;
const optionsTopRated = {
  method: 'GET',
  headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDk2MTIxZDg0NGYyMWQ2ZmYyZDUyYzQ0YjRmNTY3OCIsIm5iZiI6MTc4OTE3NjM4Ny4wNTIsInN1YiI6IjZhYTRhYTQzYzQ1MGNhZTg0MWY0MTZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NgM8tkrAaaqlpZ4MxXBi9_V9AT5hzu6OOIrFnzF6T4w'}
};
useEffect(() => {
  fetch(urlTopRated, optionsTopRated)
    .then((res) => {
      console.log("Top Rated Response:", res);
      if (!res.ok) {
        throw new Error("Something went wrong");
      } else {
        return res.json();
      }
    }
  )
 .then((data) => {
  setTopRated((prev) => [...prev, ...data.results]);
 // setPageTotalRat(data.total_pages);
//  console.log("Total movies:", [...topRated, ...data.results].length);
    return data;
})
  /*   .then((data) => {
      
    
if (topRatedPage < data.total_pages) {
  setTopRatedPage((prev) => prev + 1);
      }
    })*/
    .catch((error) => {
      console.log(error.message);
    });
}, [topRatedPage]);

  //هذا يطلب التايلور

  const urlTrailer = `https://api.themoviedb.org/3/movie/${selectedMovieId}/videos?language=en-US`;
  const optionsTrailer = {
  method: 'GET',
  headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDk2MTIxZDg0NGYyMWQ2ZmYyZDUyYzQ0YjRmNTY3OCIsIm5iZiI6MTc4OTE3NjM4Ny4wNTIsInN1YiI6IjZhYTRhYTQzYzQ1MGNhZTg0MWY0MTZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NgM8tkrAaaqlpZ4MxXBi9_V9AT5hzu6OOIrFnzF6T4w'}
};
useEffect(() => {
    if (!selectedMovieId) {
    return;
  }
  setVideoLoading(true)
  setVideoError(null)
  fetch(urlTrailer, optionsTrailer)  
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.message);
      }

      return res.json();
    })
    .then((json) => {
      const foundTrailer = json.results.find((video)=>
        video.type === "Trailer" && video.site === "YouTube" && video.official === true

  )

  return setTrailer(foundTrailer ?? null);
})

    .catch((err) => {
      setVideoError(err);
    }
  
  )
  .finally(() => {
  setVideoLoading(false);
});
}, [ selectedMovieId]);


if (selectedMovieId) { 
  moviesContent =<MovieDetails 
  theme={theme}
  setTheme={setTheme}
  
trailer={trailer}
setTrailer={setTrailer}
videoLoading={videoLoading}
videoError={videoError}
setSelectedMovieId={setSelectedMovieId}
config={config}
selectedMovieId={selectedMovieId}/> ;
} else {
  moviesContent = search
    ? resSearch.length > 0
      ?resSearch.map((mov) => (

          config && (
            <CardMove  onClick={ ()=>setSelectedMovieId(mov.id)}
              setSelectedMovieId={setSelectedMovieId}
              key={mov.id}
              movie={mov}
              config={config}
              theme={theme}
              />
            )
          )
        )
        : <p>the movies not found</p>
        : movies.map( (movie) => (
          config && (
            <CardMove
            setSelectedMovieId={setSelectedMovieId}
            key={movie.id}
            movie={movie}
            config={config}
            theme={theme}

          />
        )
      )
    )
    

 } 
 


  return (
     <ThemeProvider theme={theme}>
      
<div className={`app ${theme ? "dark" : "light"}`}>< div className="nav-bar">
      <NavBar  
      theme={theme}
      setTheme={setTheme}
      search={search}
      setSearch={setSearch}
      resSearch={resSearch}
      setResSearch={setResSearch} 
      searchPage ={searchPage}
      setSearchPage={setSearchPage}
      
      />
     </div>
     <div className={`app-content ${theme ? "appContentDark" : "appContentLight"}`}>
    
  <h1 className= {`app ${theme ? "darkh1" : "lighth1"}`} >Movie Explorer</h1>

  {!search && !selectedMovieId && <div className="top-rated-section">

  <h2 className={`${theme ? "topDark": "topLight"}`}>⭐ Top Rated</h2>

  <div className="top-rated-wrapper">

    <button onClick={scrollLeft}>
      <GrPrevious />
    </button>

    <div className="top-rated-list" ref={topRatedRef}>
     {config && topRated.map((movie) => (
  <CardMove onClick={() => setSelectedMovieId(movie.id)}
    key={movie.id}
    movie={movie}
    config={config}
    theme={theme}
    setSelectedMovieId={setSelectedMovieId}
  />
))}
    </div>

    <button onClick={scrollRight}>
      <GrNext />
    </button>

  </div>
</div>}
  
  {
    error ? <p>{error.message}</p>:
    loading ?   <p>⏳ Loading movies...</p> :(<ul className="movies-list">


{moviesContent}

</ul> )

}
  



 
<div className="div-buttom">
  <button onClick={() =>{
    if(page > 1){
      setPage(page - 1)
    }
    
    
  }
}>
  <GrPrevious /> Previous   


</button>
<p>   Page  {page}</p>
<button onClick={() =>
  {if(page< totalPages){
    setPage(page + 1)}
    
  }}>
  Next <GrNext />
  

</button>

</div>
</div>
</div>
    </ThemeProvider>
  );

}

export default App;