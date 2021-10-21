import React from 'react';
import { UserProvider } from './context/userState/userContext';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRoute from './routes';
import { AuthProvider } from './context/auth/AuthContext';
import store from './redux/store';
import {Provider} from 'react-redux'
function App() {
  return (
      <Provider store={store}>
    <Router>  
          <BaseRoute />
    </Router>
      </Provider>
  );
}

export default App;
