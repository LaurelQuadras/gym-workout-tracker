import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './features/dashboard/Dashboard';
import CategoryView from './features/workout_categories/CategoryView';
import ExerciseDetail from './features/exercise_detail/ExerciseDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category/:categoryId" element={<CategoryView />} />
        <Route path="/exercise/:categoryId/:exerciseId" element={<ExerciseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
