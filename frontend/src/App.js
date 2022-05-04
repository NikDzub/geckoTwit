import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home.js';
import { About } from './pages/About.js';
import { Header } from './pages/components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/about" element={<About></About>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
