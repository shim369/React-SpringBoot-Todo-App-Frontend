import './App.css';
import AppBarNav from "./components/AppBarNav"
import MyRouter from './router/index'

function App() {
  return (
    <div className="App">
      <AppBarNav />
      <MyRouter />
    </div>
  );
}

export default App;
