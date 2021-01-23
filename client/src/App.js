import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavbar';
import { Provider } from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import './App.css';
import ShoppingList from './components/ShoppingList/ShoppingList';
import {loadUser} from './actions/authActions';
class App extends Component {

  componentDidMount(){
store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
