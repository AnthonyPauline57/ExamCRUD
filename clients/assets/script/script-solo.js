// Je récupère le #id
// window.location.hash => va me donner #id
// split ça va me permettre de diviser ma chaine de caractère
// en sous élément qui sont séparé par le caractère en paramètre
let myId = window.location.hash.split('#')[1];

let myHeaders = new Headers();
let url = '/details/' + myId;
let options = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

fetch(url, options)
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
  })
  .then((response) => {
    console.log(response);
    let containerListe = document.querySelector('#details');

    let myDeatils = document.createElement('div');
    let DmyTitle = document.createElement('h2');
    let DmyP = document.createElement('p');
    let DmyDispo = document.createElement('p');


    containerListe.appendChild(myDeatils);
    myDeatils.appendChild(DmyTitle);
    myDeatils.appendChild(DmyP);
    myDeatils.appendChild(DmyDispo);

    DmyTitle.innerHTML = `<strong>Titre :</strong> ${response.name} `;
    DmyP.innerHTML = `<strong>Prix :</strong> ${response.prix} `;
    if(response.dispo) {
        DmyDispo.style.backgroundColor = 'lightgreen';
        DmyDispo.innerHTML = "<strong>Disponible</strong";
      } else {
        DmyDispo.style.backgroundColor = 'tomato';
        DmyDispo.innerHTML = "<strong>Rupture de stocks</strong";
      }
    
    
  });

   
// l'ajout
let titreD = document.querySelector('#titreD');
let priceD = document.querySelector('#priceD');
let dispD = document.querySelector('#dispD');


document.querySelector('#testPostD').addEventListener('click', () => {
    let tmp = {
        
        name: titreD.value,
        prix: priceD.value+`€`,
        dispo: dispD.checked
    };
  
    let options2 = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(tmp)
    }
  
    fetch(url, options2)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        
      })
  });
