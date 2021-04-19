import './App.css';
import Content from './Components/Content';
import Thanks from "./Components/Thanks";
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
            <Route exact path = "/" component={Content}/>
            <Route exact path = "/thank_you" component={Thanks}/>
        </Router>
    </div>
  );
}

export default App;
