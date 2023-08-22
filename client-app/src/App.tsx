//2., 3. : se usiamo l'autocomplete con TAB mentre scriviamo "useEffect" ed "useState", quei due import li fa automaticamente; altrimenti vanno scritti a mano.
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
//3.
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

//1. quando questo componente inizializza l'app, vogliamo che succedano 2 cose:
//  la 1°: voglio che succeda un "side effect": il componente deve andare dall'API a prendere le attività
//  la 2°: voglio che, mentre è in vita, questo componente si ricordi le attività che è andato a prendere
//Per fare queste due cose, ci sono 2 "Hook" di React: (2°) useState e (1°) useEffect
function App() {
  //2. 
  //"useState()" ritorna: a) una variabile stateful, b) una funzione per aggiornarla
  // a) "activities" è una variabile in cui mettere le attività
  // b) "setActivities" è la funzione per *impostare* le attività (quando ci verranno ritornate dalla API) 
  //4.B
  // aggiungiamo un parametro array vuoto "[]" a useState()
  //    dandogli un valore iniziale
  //    in modo che activities non possa essere "undefined",
  //    il che ci risparmia degli error
  //    dentro a <ul> {activities.map(activity =>(
  //      in cui altrimenti avrebbe sottolineato activities e activity
  //      perché sarebbero potuti essere undefined
  const [activities, setActivities] = useState([]);

  //3.
  //"useEffect"
  //  la funzione che passiamo specifica cosa si vuole che succeda quando l'applicazione (o il componente) viene caricato.
  //    in questo caso: prendere dati da nostra API
  //      per far ciò, useremo Axios
  //        dentro al quale abbiamo tutti gli HTTP methods: axios.get(), axios.put(), axios.post(), axios.delete()...
  useEffect( () => {
    //dobbiamo dargli l'address del nostro endpoint API da cui gettare i dati
    //  axios.get('APIaddress') ritorna una Promise
    //    possiamo dirgli cosa vogliamo che faccia, una volta che ottiene il response o risultato di quella Promise
    //    lo facciamo col metodo .then()
    //      il quale chiede un'altra callback function
    //        nb: quando facciamo setActivities(response. -> l'intellisense ci offre .data perché sa che axios.get ritorna un axiosResponse)
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        //6.x Rimuoviamo sto console.log(response); perché abbiamo già confermato che funziona
        setActivities(response.data)
      })
      //3.B: per far sì che non applichi lo useEffect in un loop infinito ogni volta che useEffect va ad aggiornare la variabile "activities" vista in "const [activities, setActivities] = useState();"
      //          dobbiamo aggiungere qua allo useEffect un parametro ", []" dopo la funzione passata
  }, [])

  return (
    //6.x Togliamo className="App" da questo <div>, perché altrimenti userebbe lo styling di App.css - e ci farebbe apparire il contenuto centrato
    <div>
      {/*6.A Ora che abbiamo installato Semantic UI, TOGLIAMO l'header di className="App-header" che c'era qua sotto
        Iniziamo a scrivere "Header" e scegliamo con autocomplete quello che viene da Semantic UI
            se autocomplete (e quindi import automatico) sembra non funzionare:
                ctrl+P >Developer: Reload Window */}
        {/* Con as='h2'
                  specifichiamo le dimensioni dell'header che vogliamo (h2)
            Con icon='users'
                  specifichiamo l'icona, in questo caso precaricata da Semantic UI, che vogliamo (users)
            Con content='Reactivities'
                  specifichiamo il contenuto dell'header. In questo caso mettiamo 'Reactivities', che è il nome dell'app             */}
        <Header as='h2' icon='users' content='Reactivities' />
        {/*6.x Togliamo il logo di React <img src={logo} className="App-logo" alt="logo" />*/}
        {/* 4. togliamo un po' di boilerplate
        e aggiungiamo questo <ul> */}
        {/* [!!!] 6.B Ora che abbiamo installato Semantic UI, usiamo:
                   - <List></List> al posto di <ul></ul> 
                   - <List.Item></List.Item> al posto di <li></li>*/}
        <List>
          {/* 4. useremo la funzione ".map" di JavaScript 
                  per loopare sulle activity
                    che GET-iamo dalla API
                  con una <li> per ognuna
                    e ne visualizzeremo certe propr
                 la funzione
                 "vettore.map(elemento => funzione"
                 esegue:
                    - la funzione passata
                    - su ogni elemento del vettore su cui è chiamata
                    */}
          {/* 4.C per evitare che ci sottolinei degli error 
                    su ".id" 
                    e su ".title"
                  potremmo usare una interface
                    ma noi siamo dei cani
                  allora andiammo ad aggiungere
                    ": any"
                    in "{activities.map((activity: ANY) =>"
                  però, in questo modo non siamo protetti da type safety
                    perché siamo dei cani   
              */}
          {activities.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
