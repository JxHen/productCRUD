import logo from './logo.svg';
import './App.css';
import { Dashboard } from './components/Dashboad'
import { ProductForm } from './components/ProductForm'
import { MyNavbar } from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<ProductForm />} />
        <Route path="/view/:productId" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default App;
