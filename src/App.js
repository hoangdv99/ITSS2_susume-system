import {
  BrowserRouter as Router,
  Routes,
  Route 
} from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          {/* Routes go here */}
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
