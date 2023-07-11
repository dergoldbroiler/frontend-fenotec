'use client';

import { useEffect } from "react";

export const WindowcloseEvent = () => {
    useEffect(() => {
        const handleTabClose = (e) => {
          e.preventDefault();
    
          console.log('beforeunload event triggered');
          fetch('https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/jobs/unlock/all/').then(res => res.json()).then(data => {
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