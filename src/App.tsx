import React from 'react';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';


import Globalstyle from './styles/global';

import AppProvider from './hooks';



const App: React.FC = () => (
  <>
    <AppProvider>
    <SignIn />
      {/* <SignUp /> */}
    </AppProvider>
     
    <Globalstyle/>

  </>
)

export default App;
