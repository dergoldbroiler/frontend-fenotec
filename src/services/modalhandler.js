
export const toggleModal = (modalName, action, datasetId) => {
    const modal = document.getElementById(modalName);
    
   if(action === 'hide'){

    fetch('https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/jobs/unlock/'+datasetId).then(res => res.json()).then(data => {
        modal.classList.remove('d-block','show');
    });
    
   } else {
   // let fetch_url = 'https://app.fenotec.dergoldbroiler.de/wp-json/wp/v2/job/'+datasetId;
   // fetch(fetch_url).then(
        modal.classList.add('d-block','show')
    //);
   }

    //.show d-block
}


