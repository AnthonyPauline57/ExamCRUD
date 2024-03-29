let myHeaders = new Headers();
let url = '/liste';
let options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

let containerListe = document.querySelector('#liste');
let rowListe = document.querySelector('#row');

// l'affichage de base
fetch(url, options)
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    response.forEach(elt => {
      let colListe =document.createElement('div');
      colListe.classList.add('col-lg-4');
      let myAnime = document.createElement('div');
      let myTitle = document.createElement('h2');
      let myP = document.createElement('p');
      let myDispo = document.createElement('p');

      myTitle.innerText = elt.name;
      myP.innerHTML = `<strong>Prix :</strong> ${elt.prix} `;

myAnime.style.border = '3px solid cyan';
myAnime.style.borderRadius = '15px';
      if(elt.dispo) {
        myDispo.style.backgroundColor = 'lightgreen';
        myDispo.innerHTML = "<strong>Disponible</strong";
      } else {
        myDispo.style.backgroundColor = 'tomato';
        myDispo.innerHTML = "<strong>Rupture de stocks</strong";
      }

      let myLink = document.createElement('a');
      myLink.href = './details.html#'+ elt.id;
      myLink.innerText = 'détails';
      myLink.classList.add("btn");
      myLink.classList.add("btn-info");
      myLink.style.margin = '0px 0px 5px 5px';

      let myLink3 = document.createElement('a');
      myLink3.href = './edit.html#'+ elt.id;
      myLink3.innerText = '  modifier';
      myLink3.classList.add("btn");
      myLink3.classList.add("btn-warning");
      myLink3.style.margin = '0px 0px 5px 5px';
      
      let myLink2 = document.createElement('button');
      myLink2.setAttribute(`id`, `supprimerBtn${elt.id}`)
      myLink2.innerText = 'supprimer';
      myLink2.classList.add("btn");
      myLink2.classList.add("btn-danger");
      myLink2.style.margin = '0px 0px 5px 5px';

     
      containerListe.appendChild(rowListe);
      rowListe.appendChild(colListe);
      colListe.appendChild(myAnime);
      myAnime.appendChild(myTitle);
      myAnime.appendChild(myP);
      myAnime.appendChild(myDispo);
      myAnime.appendChild(myLink);
      myAnime.appendChild(myLink3);
      myAnime.appendChild(myLink2);


      //la suppression (non fonctionnel mais retourne le bon array)
      myLink2.addEventListener('click', () => {
     
    
      let options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
        
      }

      let url = '/delete/' + elt.id;
      fetch(url, options)
        .then((res) => {
          if(res.ok) {
            return res.json();
          }
        })
        .then((response) => {
             response.splice(elt.id,1);
        console.log(response);
        })


      })
    });
  });


  
// l'ajout
let titre = document.querySelector('#titre');
let price = document.querySelector('#price');
let disp = document.querySelector('#disp');
let i = 2;


document.querySelector('#testPost').addEventListener('click', () => {
    let tmp = {
        id:++i,
        name: titre.value,
        prix: price.value+`€`,
        dispo:disp.checked
    };

    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(tmp)
    }
  
    fetch(url, options)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(response)
      })
  });

 