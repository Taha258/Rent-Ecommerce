"use client"
import { CountContext } from "./context";


export default function countProvider({children}) {
  return (
    <div>
        <CountContext.Provider value={{}}>
           {children}
       </CountContext.Provider>
    </div>
  )
}
