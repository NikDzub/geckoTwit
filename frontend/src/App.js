import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home.js';
import { Single } from './pages/Single.js';

import { Header } from './pages/components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/search" element={<Single></Single>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
