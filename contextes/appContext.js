import React, { createContext } from 'react';
import { categories } from '../data/categories';

const MyContext = createContext();

export default MyContext;



export const MyProvider = (props) => {
    const [globalState, setGlobalState] = React.useState({
      classSelected: null, 
      userType: 'visitor', 
      connected: false , 
      formData: null, 
      product: null,
      shop: null,
      currentUser: null,
      category: null , 
      selectedArticles: []
     });

    return (
      <MyContext.Provider value={{ globalState, setGlobalState }}>
        {props.children}
      </MyContext.Provider>
    );
  };