import ReactDOM from 'react-dom';
import App from './App';
import ContextsProviders from './context/ContextsProviders';
import { BrowserRouter as Router } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextsProviders>
      <Router>
        <App />
      </Router>
    </ContextsProviders>
);
