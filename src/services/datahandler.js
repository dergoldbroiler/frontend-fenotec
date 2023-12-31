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


export const buildFilter = (current, key, value) => {
  const filter = current;
  const new_filter = filter.map( element => {
    element.key === key ? element.value = value : element.value = element.value;
    return element;
  });

  if(!new_filter.find(element => element.key === key)){
    new_filter.push({key: key, value: value});
  }

  return new_filter;
}

const filterSingleElement = (element, filter) => {
  let result = true;
  filter.forEach( filterelement => {
    if(element[filterelement.key] != filterelement.value){
      result = false;
    }
  });
  return result;
}

export const filterData = (data, filter) => {


  let new_data = data.filter( element => {
    return filterSingleElement(element, filter);
  });
  return new_data;
}


const labelSearch = (key, value) => {
  let labels = getLocalLabels();
  let results;
  if(key === 'kunde'){
      results = labels.kunde.find( element => {
        return element.id === value[0];
      }
  );
 
 }

 return results;
}

export const filterByKey = (data, keyword) => {

  let labels = getLocalLabels();
  let filterObject = [];
  let new_data = data.filter( element => {
    

     filterObject = labelSearch('kunde', element.kunde);
    
      if(filterObject.label.toLowerCase().includes(keyword.toLowerCase() ) ){
      
        return true;
      }
    });

   // if(element.objects.kunde.label.toLowerCase().includes(keyword.toLowerCase()) || element.tankform.toLowerCase().includes(keyword.toLowerCase())){

    //return filterSingleElement(element, filter);
 console.log(new_data);
  return new_data;
}






export const getEntry = (id) => {
      
  const result = data.filter( element => {
    return element.id === id;
  }); 
    
  return result;

}


export const getLabels = () => {
  return new Promise((resolve, reject) => {

    let labels = [];

    fetch('https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/labels?acf_format=standard').then(res => res.json()).then(data => {
      localStorage.setItem('labels',JSON.stringify(data));
      resolve(data);
    })
  })
};


export const getLocalLabels = () => {
  return JSON.parse(localStorage.getItem('labels'));
};


export const getAllJobs = () => {
  return new Promise((resolve, reject) => {

    let jobmeta = [];

    fetch('https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/jobs?acf_format=standard').then(res => res.json()).then(data => {
      

      data.forEach( element => {

        let postmeta = element.acf;
       
    //    let acf_object = element.acf_object;
        postmeta.id = element.ID;
        postmeta.objects = element.acf_object;
       // console.log(postmeta);
        jobmeta.push(postmeta);
     //   jobmeta.push(acf_object);
      })

      resolve(jobmeta);
    })
  })
};


/*
awaits an filter object {kunde:xxx, versand:xxx}
*/
export const getFilteredJobs = (filter) => {
  return new Promise((resolve, reject) => {

    let jobmeta = [];
    let fetchurl = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/jobs?acf_format=standard';

    if(filter.kunde){
      var filterkey = 'kunde';
      var filtervalue = filter.kunde;
      fetchurl = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/jobs?acf_format=standard&'+filterkey+'='+filtervalue;
    }

    if(filter.tankform){
      var filterkey = 'tankform';
      var filtervalue = filter.tankform;
      fetchurl = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/jobs?acf_format=standard&'+filterkey+'='+filtervalue;
    }



    fetch(fetchurl).then(res => res.json()).then(data => {
      

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


export const getJobFull = (datasetID) => {
  return new Promise((resolve, reject) => {

    let jobmeta = [];
    let fetch_url = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/job/'+datasetID;
    fetch(fetch_url).then(res => res.json()).then(data => {
      
      let postmeta = data.acf_object;
    
      postmeta.id = data[0].ID;

      jobmeta.push(postmeta);
     
      resolve(jobmeta);
    })
  })
};


export const getCustomer = (datasetID) => {
  return new Promise((resolve, reject) => {
    if(!datasetID){
      resolve('Kunde im Backend nicht angelegt');
     } else {
    let fetch_url = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/kunde/'+datasetID;
    fetch(fetch_url).then(res => res.json()).then(data => {
       resolve(data.title.rendered);
    })
  }
  })
};

export const getShipping = (datasetID) => {
  return new Promise((resolve, reject) => {
    if(!datasetID){
      resolve('Versandart nicht im Backend angelegt');
     } else {
    let fetch_url = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/versand/'+datasetID;
    fetch(fetch_url).then(res => res.json()).then(data => {
       resolve(data.title.rendered);
    })
  }
  })
};


export const getOptions = (endpoint) => {
  return new Promise((resolve, reject) => {
   
    let fetch_url = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/'+endpoint;
    fetch(fetch_url).then(res => res.json()).then(data => {
       let options = [];
        data.forEach( element => {
          options.push({value: element.id, label: element.title.rendered});
        });
        resolve(options);
    })
  
  })
};

export const updateJob = (datasetID, key, value) => {
  return new Promise((resolve, reject) => {
  
    let fetch_url = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/jobs/update/'+datasetID+'/?key='+key+'&value='+value;
    

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
  

  