/*

1. Variables, Cookies

*/

let loadedcookie = "loaded";


let data = [
  {
    id: 1,
    customer: 'Horst Schlämmer',
    street: 'Hauptstraße 1',
  },  
  {
    id: 2,
    customer: 'Peter Lustig',
    street: 'Hauptstraße 2',
  },
];

const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
}

export const getEntry = (id) => {
      
  const result = data.filter( element => {
    return element.id === id;
  }); 
    
  return result;

}

export const getAllJobs = () => {
  return new Promise((resolve, reject) => {

    let jobmeta = [];

    fetch('https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/jobs?acf_format=standard').then(res => res.json()).then(data => {
      

      data.forEach( element => {

        let postmeta = element.acf;
        postmeta.id = element.ID;

        jobmeta.push(postmeta);
      })

      resolve(jobmeta);
    })
  })
};


export const getJob = (datasetID) => {
  return new Promise((resolve, reject) => {

    let jobmeta = [];
    let fetch_url = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/job/'+datasetID;
    fetch(fetch_url).then(res => res.json()).then(data => {
      
      let postmeta = data.acf;
      postmeta.id = data[0].ID;
    
      jobmeta.push(postmeta);
     
      resolve(jobmeta);
    })
  })
};

export const updateJob = (datasetID, key, value) => {
  return new Promise((resolve, reject) => {
  
    let fetch_url = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/jobs/update/'+datasetID+'/?key='+key+'&value='+value;
    console.log(fetch_url);

    fetch(fetch_url, {
      method: 'POST',
      credentials: 'same-origin', // <-- make sure to include credentials
      headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          //'Authorization': 'Bearer ' + token  <-- not needed, WP does not check for it
      },
      body: JSON.stringify({key: value})
    }).then(res => res.json()).then(data => {
      console.log(data);
    });

   
  })
};

export const updateEntry = (entry) => {

  const result = data.map( element => {
   return element.id === entry.id && entry
  }); 
  data = result;
  return result;

}

//wenn der Cookie loadedcookie gesetzt ist, gib die lokalen Daten zurück, ansonsten die Daten aus der API
export const getData = () => {
   

return data
}

const dbName = 'fenotecDB';
const storeName = 'fenotecStore';



/*

2. Function zum Speichern und Lesen von indexedDB

*/

const handleIndexedDB = (action="get", id=0) => {
  
    // indexedDB
    if (!('indexedDB' in window)) {
        alert('IndexedDB wird von diesem Browser nicht unterstützt.');
        return;
    }
    const request = indexedDB.open(dbName, 2);
  
    request.onerror = function(event) {
        alert('Fehler beim Öffnen der Datenbank:', event.target.errorCode);
    };
  
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      const store = db.createObjectStore(storeName, { keyPath: 'id' });
    };
  
    request.onsuccess = function(event) {
        
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
  
        // save items
        if(action === 'save') {
  
            data.forEach(item => {
                store.put(item); 
            });
  
          } else {

        //return requested item    
            let result = store.get(1);
  
            result.onsuccess = function(e) {
              return(e.target.result);
            }
        }
  
         
          console.info(store.get(1))
          transaction.oncomplete = function() {
            console.log('Daten erfolgreich in IndexedDB gespeichert.');
          };
  
          transaction.onerror = function(event) {
            console.error('Fehler beim Speichern der Daten in IndexedDB:', event.target.error);
          };
  
  
      }
  }
  

  