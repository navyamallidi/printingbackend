import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Adddata from "./components/Adddata";
import MaterialsList from './components/materiallist';
import ViewMaterial from './components/viewcomponent';
import EditMaterial from './components/editmaterial';


function App() {
  return (
    <Router>
      <MainContent />
      <Routes>
        <Route path="/adddata" element={<Adddata />} />
        <Route path="/view/:id" element={<ViewMaterial />} />
        <Route path="/edit/:id" element={<EditMaterial />} />
      </Routes>
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <>
      <div>
        {location.pathname !== '/adddata' && (
          <div>
          <Link to="/adddata">
            <div className='flex justify-end mx-10'>
              <button className="mt-5 p-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md">
                Add Data
              </button>
            </div>
          </Link>
          <MaterialsList />
          </div>
         
        )}
      </div>
    </>
  );
}

export default App;
