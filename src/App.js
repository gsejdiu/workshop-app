import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import Index from "./components/index"
import Mode from "./pages/mode"
import News from "./pages/news"
import Liebe from "./pages/liebe"
import ModeDetail from './pages/item_details'
class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <Router>
        <Switch>
          <Route exact path='/mode' component={Mode} />
          <Route exact path='/item/:id' component={ModeDetail} />
          <Route exact path='/news' component={News} />
          <Route exact path='/liebe' component={Liebe} />
          <Route exact path='' component={Index} />
        </Switch>
      </Router>
    )
  }
}

export default App;
