'use client';

import { useEffect } from "react";

export const WindowcloseEvent = () => {
    useEffect(() => {
        const handleTabClose = (e) => {
          e.preventDefault();
    
          console.log('beforeunload event triggered');
          fetch('http://localhost:3001/api/orders/unlock').then(res => res.json()).then(data => {
           console.log('unlocking all datasets');
        });
        };
    
        window.addEventListener('beforeunload', handleTabClose);
    
        return () => {
          window.removeEventListener('beforeunload', handleTabClose);
        };
      }, []);

      return null;
};