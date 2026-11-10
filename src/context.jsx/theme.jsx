import { createContext } from "react";
export const themeA = createContext({
  backgroundColor: "red",
});


export function ThemeProvider({children,theme}){
    console.log("i'm drom theme",theme)
  
 const themes = {
    dark: { backgroundColor: "red" },
    light: { backgroundColor: "white" },
  };

    return(
        
        <themeA.Provider value={themes[theme]} >

             {children}

         </themeA.Provider>
    )

}