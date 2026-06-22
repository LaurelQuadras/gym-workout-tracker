import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/exercises';
import { Activity, Dumbbell, Armchair as Arm } from 'lucide-react';

const iconMap = {
  Activity: <Activity className="card-icon" />,
  Dumbbell: <Dumbbell className="card-icon" />,
  Arm: <Arm className="card-icon" />,
};

export default function Dashboard() {
  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">Gym Tracker</h1>
        <p style={{ color: 'var(--text-muted)' }}>Select a category to begin your workout.</p>
      </header>
      <div className="grid-container">
        {categories.map((category) => (
          <Link to={`/category/${category.id}`} key={category.id} className="card">
            {iconMap[category.icon]}
            <h2 className="card-title">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
