import { Switch, Route, BrowserRouter } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin">SignIn</Route>
        <Route path="/">Home</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
