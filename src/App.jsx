// import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { Auth } from "./pages/auth/index";
import { Expense_tracker } from "./pages/expense_tracker/Expense_tracker";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense_tracker" exact element={<Expense_tracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;