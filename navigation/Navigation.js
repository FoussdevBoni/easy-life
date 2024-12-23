import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Client from './layouts/Client/Client';
import Visitor from './layouts/Visitor/Visitor';

function Navigation() {
    const user = useSelector((state) => state.user.userData);
    const [connected, setConnected] = useState(false);
    const [layout, setLayout] = useState('');
    useEffect(() => {
        if (user) {
            setConnected(true);
            setLayout(user.layout ? 'admin' : 'client');
        } else {
            setConnected(false);
        }
    }, [user]);

    return connected ? (layout === 'client' ? <Client /> : <Visitor />) : <Visitor />;
}

export default Navigation;
