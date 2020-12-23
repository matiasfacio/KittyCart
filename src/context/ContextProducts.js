import React, { createContext, useState } from "react";
import ListOfProducts from '../data/ListOfProducts';

export const ContextProducts = createContext();


const ContextProductsProvider = (props) => {
    const [List, setList] = useState(ListOfProducts)
    return ( 
        <ContextProducts.Provider value = {{List, setList}}>
            {props.children}
        </ContextProducts.Provider>
     );
}
 
export default ContextProductsProvider;
