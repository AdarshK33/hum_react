import React, { createContext,useReducer,useEffect } from 'react';
 import axios from 'axios';
import RosterReducer from '../reducers/RosterReducer';
export const RosterContext = createContext();
export const RosterProvider = ({ children }) => {
const [state,dispatch] = useReducer(RosterReducer);
// function addShift(newShift)
// {
//     alert(JSON.stringify(newShift));
  
//         axios.post( "http://humine.theretailinsights.co/shift/create", {
//             headers: {
//                 Accept: 'application/json','Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//                 Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3NzcyNDc2LCJpYXQiOjE1OTc3MzY0NzZ9.P1L1vd0_aa3AfE3wdKGCkIbmJqEoYG1BuVGvX7z2mSk'   
//               },
//         }        
//         )
//         .then( response => {
//             // dispatch(storeToken(response.headers.token));    
//             console.log("in roster state "+response);
//            return response;
//         } )
//         .catch( err => {
//             console.log('Fetch Error', err);     
//         } );
// }

  function addShift(newShift)
  {
      console.log(JSON.stringify(newShift));
    const headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3Nzg4Njk2LCJpYXQiOjE1OTc3NTI2OTZ9.drYvc0vOPLQJkzKvYXJZHyGZYJFukyiYITEYItn15_A'   
      }
      
      axios.post("http://humine.theretailinsights.co/shift/view", {
          headers: headers
        })
        .then((response) => {
         alert("success "+response)
        })
        .catch((error) => {
          alert(" In error catch "+error);
        })
  }

//  useEffect()
//   {
//      // alert(JSON.stringify(newShift));
   
//     const headers = {
//         'Access-Control-Allow-Origin' : '*',
//         'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTk3NzcyNDc2LCJpYXQiOjE1OTc3MzY0NzZ9.P1L1vd0_aa3AfE3wdKGCkIbmJqEoYG1BuVGvX7z2mSk'   
//       }
     
//       axios.get("http://humine.theretailinsights.co/shift/view", {

       
//           headers: headers
//         })
//         .then((response) => {
//          alert("success==== "+JSON.stringify(response))
//         })
//         .catch((error) => {
//           alert(" In error catch "+error);
//         })
//   }





    
    return (<RosterContext.Provider value={{
        addShift
    }}>
        {children}
    </RosterContext.Provider>);
}
