
import Monitor from './components/Monitor'

import {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { getAllJobs } from './services/datahandler';

export default function Home() {



  return (
    <main className="main">
          <div className="text-center">
        <img 
          className="logo"
          src="/ft.png"
          alt="Fenotec Logo"
        />
      
      </div>
  
        <div className='w-100'>
          <h2>Monitor</h2>
          <Monitor />
        </div>
    
  
    </main>
  )
}
