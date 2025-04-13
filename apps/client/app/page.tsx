"use client"
import Home from '@/components/landing/home';
import  { RoomForm } from '@/components/landing/room-generator';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Page() {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
    }, []);
    return (
        <div>
            <Home/>
            {/* <RoomForm/> */}
        </div>
    );
}
