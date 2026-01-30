import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ExerciseNav from './components/ExerciseNav';
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';
import Exercise3 from './components/Exercise3';
import Exercise4 from './components/Exercise4';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <ExerciseNav />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/exercise-1" replace />} />
            <Route path="/exercise-1" element={<Exercise1 />} />
            <Route path="/exercise-2" element={<Exercise2 />} />
            <Route path="/exercise-3" element={<Exercise3 />} />
            <Route path="/exercise-4" element={<Exercise4 />} />
            <Route path="*" element={<Navigate to="/exercise-1" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
