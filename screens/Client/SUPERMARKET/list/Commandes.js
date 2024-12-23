import React from 'react';
import CommandesList from '../../../../components/COMMON/list/CommandesList';

function Commandes({user , type}) {
    return (
        <>
            <CommandesList type={type} user={user}/>
        </>
    );
}

export default Commandes;