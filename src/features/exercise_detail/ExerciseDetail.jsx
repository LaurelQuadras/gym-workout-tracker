import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveRecord } from '../../core/store/trackingSlice';
import { exercises } from '../../data/exercises';
import { ArrowLeft, Save } from 'lucide-react';

export default function ExerciseDetail() {
  const { categoryId, exerciseId } = useParams();
  const dispatch = useDispatch();
  
  // Get existing record from Redux (if any)
  const existingRecord = useSelector((state) => state.tracking.records[exerciseId]);

  const [minWeight, setMinWeight] = useState('');
  const [setsDone, setSetsDone] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Find exercise details
  const exercise = exercises[categoryId]?.find((e) => e.id === exerciseId);

  // Populate local state on mount or when existingRecord changes
  useEffect(() => {
    if (existingRecord) {
      setMinWeight(existingRecord.minWeight || '');
      setSetsDone(existingRecord.setsDone || '');
    }
  }, [existingRecord]);

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  const handleSave = () => {
    dispatch(saveRecord({
      exerciseId,
      minWeight,
      setsDone,
    }));
    
    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div>
      <Link to={`/category/${categoryId}`} className="back-link">
        <ArrowLeft size={20} /> Back to Exercises
      </Link>

      <header className="app-header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <h2 className="app-title" style={{ fontSize: '1.8rem', color: '#fff' }}>{exercise.name}</h2>
      </header>

      {/* Video Container */}
      <div className="video-container">
        <iframe
          src={exercise.videoUrl}
          title={exercise.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="detail-card">
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
          {exercise.description}
        </p>

        <div className="form-group">
          <label htmlFor="minWeight">Minimum Weight (kgs/lbs)</label>
          <input
            id="minWeight"
            type="number"
            value={minWeight}
            onChange={(e) => setMinWeight(e.target.value)}
            placeholder="e.g. 50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="setsDone">Number of Sets Done</label>
          <input
            id="setsDone"
            type="number"
            value={setsDone}
            onChange={(e) => setSetsDone(e.target.value)}
            placeholder="e.g. 3"
          />
        </div>

        <button className="btn-save" onClick={handleSave}>
          <Save size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Save Progress
        </button>
      </div>

      {showToast && <div className="toast">Progress Saved!</div>}
    </div>
  );
}
