import React from 'react';
import ReactDOM from 'react-dom/client';

//import seguente aggiunto manualmente, come indicato su https://react.semantic-ui.com/usage
import 'semantic-ui-css/semantic.min.css'

//questo c'era già; il file index.css si può usare per overridare i cambiamenti al CSS fatti da Semantic UI
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //6.C togliamo la StrictMode (i.e. "<React.StrictMode> </React.StrictMode>" che avvolgeva "<App />") 
  //                  perché non farebbe funzionare certi componenti di Semantic UI, come ad esempio i Buttons
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
