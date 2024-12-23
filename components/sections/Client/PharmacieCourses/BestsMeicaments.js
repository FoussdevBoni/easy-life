import React from 'react';
import ArticlesList from '../../../COMMON/list/ArticlesList';
import MedicamentsList from '../../../COMMON/list/MedicamentsList';

function BestsMedicaments({user}) {
    return (
        <>
           <MedicamentsList note={3.5}/>   
        </>
    );
}

export default BestsMedicaments;