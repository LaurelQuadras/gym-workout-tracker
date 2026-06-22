import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { exercises, categories } from '../../data/exercises';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function CategoryView() {
  const { categoryId } = useParams();
  const categoryExercises = exercises[categoryId];
  const categoryInfo = categories.find((c) => c.id === categoryId);

  if (!categoryExercises || !categoryInfo) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <Link to="/" className="back-link">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      
      <header className="app-header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <h2 className="app-title" style={{ fontSize: '2rem' }}>{categoryInfo.name} Exercises</h2>
      </header>

      <div className="list-container">
        {categoryExercises.map((exercise) => (
          <Link to={`/exercise/${categoryId}/${exercise.id}`} key={exercise.id} className="list-item">
            <div>
              <h3>{exercise.name}</h3>
              <p>Tap to view details</p>
            </div>
            <ChevronRight size={24} color="var(--accent-amber)" />
          </Link>
        ))}
      </div>
    </div>
  );
}
