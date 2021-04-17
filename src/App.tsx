import React from 'react';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

import Globalstyle from './styles/global';

import {AuthProvider} from './hooks/AuthContext';


const App: React.FC = () => (
  <>
    <AuthProvider >
      <SignIn />
      {/* <SignUp /> */}
    </AuthProvider>
    <Globalstyle/>

  </>
)

export default App;
