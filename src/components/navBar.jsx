import { useEffect,useState} from "react"
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import "../Styles/General.css"

import "../Styles/navBar.css"
export default function NavBar({setResSearch,resSearch,setSearch,search,searchPage,setSearchPage,theme,setTheme}){
  const[filmNew,setFilmNew  ]=useState(null)
  const url=`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${searchPage}`
  const options = {
  method: 'GET',
   headers: {
    accept: "application/json",
  
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDk2MTIxZDg0NGYyMWQ2ZmYyZDUyYzQ0YjRmNTY3OCIsIm5iZiI6MTc4OTE3NjM4Ny4wNTIsInN1YiI6IjZhYTRhYTQzYzQ1MGNhZTg0MWY0MTZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NgM8tkrAaaqlpZ4MxXBi9_V9AT5hzu6OOIrFnzF6T4w'
  }


  };
useEffect(() => {
  if (search) {
    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error("error");
        }

        return res;
      })
      .then(res => res.json())
      
      
      .then ( json => {
        const allId= new Set (resSearch.map(mov => mov.id))
        const fillms= json.results
         const filterRes = fillms.filter(j => {
    if (allId.has(j.id)) {
      return false;
    }

    allId.add(j.id);
    return true;
  });
        const mergedFilms=   [
            ...resSearch,
            ...filterRes
            
          ]
        setResSearch(
       mergedFilms
        )

       if (json.page < json.total_pages) {
          setSearchPage(searchPage + 1);
        }
      })
      .catch(err => console.error(err));
  }
}, [search, searchPage]);
    return(
      
       <nav className={`navbar ${theme ? "navbar-dark" : "navbar-light"}`}>
         <div className="navbar-logo">
        <div className="logo-icon">
<svg
  viewBox="0 0 48 48"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
>
  {/* خلفية الأيقونة */}
  <rect
    x="2"
    y="2"
    width="44"
    height="44"
    rx="11"
    fill="#8B79AD"
  />

  {/* جسم الكلاكيت */}
  <rect
    x="12"
    y="19"
    width="25"
    height="19"
    rx="3"
    stroke="white"
    strokeWidth="2.8"
  />

  {/* الجزء العلوي */}
  <path
    d="M10 17L13 10L39 10L42 17H10Z"
    fill="white"
  />

  {/* تقسيمات الجزء العلوي */}
  <path
    d="M19 10L16 17M29 10L26 17M38 10L35 17"
    stroke="#8B79AD"
    strokeWidth="2"
  />
</svg>
        </div>

        <div className="logo-text">
          <h2 className={`logo-title ${theme ? "darkLogo" : "lightLogo"}`}>
            Movie <span>Explorer</span>
          </h2>
          <small>DISCOVER YOUR NEXT MOVIE</small>
        </div>
      </div>
      <div  className={`search-container ${theme ? 'searchDark' : 'searchLight'}`}>
         <input 
          className= {`search-input ${theme ? 'inputDark' : 'inputLight'}`}
         type="search"
         placeholder="Search movies..."
           value={search}
          onChange={e => {
  setSearch(e.target.value);
  setResSearch([])
  setSearchPage(1)
}}/>
      </div>
      <div className={`theme-toggle ${theme ? ' themeToggleDark' : 'themeToggleLight'}`}>
        <CiLight className="theme-icon light-icon"
          onClick={() => setTheme(false)} />  
        <CiDark
          className="theme-icon dark-icon"      
          onClick={() => setTheme(true)} />
      </div>
       </nav>
    )
  }




 

