import './App.css';
import Weather from './components/Weather';
import HomePage from './components/HomePage';
import LoadingSpinner from './UI/LoadingSpinner';
function App() {
  return (
    <div className="App">
     {/* <Weather /> */}
     <HomePage />
     {/* <LoadingSpinner /> */}
    </div>
  );
}

export default App;
