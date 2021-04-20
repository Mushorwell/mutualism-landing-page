import './App.css';
import Content from './Components/Content';
import Thanks from "./Components/Thanks";
import { HashRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router basename={'/mailinglist'}>
            <Switch>
                <Route exact path = "/" component={Content}/>
                <Route exact path = "/thank_you" component={Thanks}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
