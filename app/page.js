'use client';

import { useState, useEffect } from 'react';

const WORKOUT = [
  {
    name: 'Warm-up: Arm Circles & Light Jog in Place',
    duration: 60,
    reps: null,
    rest: 0,
    targets: 'Warm-up',
    description: '30 seconds forward, 30 seconds backward arm circles while jogging'
  },
  {
    name: 'Goblet Squats',
    duration: 45,
    reps: '12-15 reps',
    rest: 15,
    targets: 'Legs, Glutes, Core',
    description: 'Hold both dumbbells at chest, squat deep'
  },
  {
    name: 'Dumbbell Push Press',
    duration: 45,
    reps: '10-12 reps',
    rest: 15,
    targets: 'Shoulders, Triceps, Core',
    description: 'Dumbbells at shoulders, slight knee dip, press overhead'
  },
  {
    name: 'Bent-Over Rows',
    duration: 45,
    reps: '12-15 reps',
    rest: 15,
    targets: 'Back, Biceps',
    description: 'Hinge forward, pull dumbbells to ribs, squeeze shoulder blades'
  },
  {
    name: 'Dumbbell Chest Press (Floor)',
    duration: 45,
    reps: '12-15 reps',
    rest: 15,
    targets: 'Chest, Triceps',
    description: 'Lie on floor, press dumbbells up from chest'
  },
  {
    name: 'Reverse Lunges',
    duration: 45,
    reps: '10 each leg',
    rest: 15,
    targets: 'Legs, Glutes',
    description: 'Hold dumbbells at sides, step back and lower knee'
  },
  {
    name: 'Dumbbell Curl to Press',
    duration: 45,
    reps: '10-12 reps',
    rest: 15,
    targets: 'Biceps, Shoulders',
    description: 'Curl dumbbells up, then press overhead in one motion'
  },
  {
    name: 'Romanian Deadlifts',
    duration: 45,
    reps: '12-15 reps',
    rest: 15,
    targets: 'Hamstrings, Glutes, Lower Back',
    description: 'Slight knee bend, hinge at hips, lower dumbbells down shins'
  },
  {
    name: 'Dumbbell Overhead Tricep Extension',
    duration: 40,
    reps: '12-15 reps',
    rest: 15,
    targets: 'Triceps',
    description: 'Hold one dumbbell overhead with both hands, lower behind head'
  },
  {
    name: 'Lateral Raises',
    duration: 40,
    reps: '12-15 reps',
    rest: 15,
    targets: 'Shoulders',
    description: 'Raise dumbbells out to sides to shoulder height'
  },
  {
    name: 'Plank Hold with Shoulder Taps',
    duration: 45,
    reps: 'Max reps',
    rest: 15,
    targets: 'Core, Shoulders',
    description: 'Plank position, alternate tapping shoulders'
  },
  {
    name: 'Dumbbell Russian Twists',
    duration: 45,
    reps: '20 total twists',
    rest: 15,
    targets: 'Core, Obliques',
    description: 'Seated, lean back, twist dumbbell side to side'
  },
  {
    name: 'Burpees with Dumbbells',
    duration: 45,
    reps: '8-10 reps',
    rest: 10,
    targets: 'Full Body, Cardio',
    description: 'Hold light dumbbells, burpee motion'
  },
  {
    name: 'Cool Down: Static Stretching',
    duration: 60,
    reps: null,
    rest: 0,
    targets: 'Recovery',
    description: 'Stretch all major muscle groups'
  }
];

export default function WorkoutPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(WORKOUT[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);

  const totalTime = WORKOUT.reduce((sum, ex) => sum + ex.duration + ex.rest, 0);
  const elapsedTime = WORKOUT.slice(0, currentIndex).reduce((sum, ex) => sum + ex.duration + ex.rest, 0) +
                      (isRest ? WORKOUT[currentIndex].duration : WORKOUT[currentIndex].duration - timeLeft);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      if (isRest) {
        // Rest period ended, move to next exercise
        if (currentIndex < WORKOUT.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setTimeLeft(WORKOUT[currentIndex + 1].duration);
          setIsRest(false);
        } else {
          setIsRunning(false);
          setWorkoutComplete(true);
        }
      } else {
        // Exercise ended, start rest
        if (WORKOUT[currentIndex].rest > 0) {
          setTimeLeft(WORKOUT[currentIndex].rest);
          setIsRest(true);
        } else {
          // No rest, move to next
          if (currentIndex < WORKOUT.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setTimeLeft(WORKOUT[currentIndex + 1].duration);
          } else {
            setIsRunning(false);
            setWorkoutComplete(true);
          }
        }
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isRest, currentIndex]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetWorkout = () => {
    setCurrentIndex(0);
    setTimeLeft(WORKOUT[0].duration);
    setIsRunning(false);
    setIsRest(false);
    setWorkoutComplete(false);
  };

  const skipExercise = () => {
    if (currentIndex < WORKOUT.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(WORKOUT[currentIndex + 1].duration);
      setIsRest(false);
    } else {
      setIsRunning(false);
      setWorkoutComplete(true);
    }
  };

  const currentExercise = WORKOUT[currentIndex];
  const progress = (elapsedTime / totalTime) * 100;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>15-Min Full Body Workout</h1>
        <p style={styles.subtitle}>5kg Dumbbells • Muscle Growth • Strength • Aesthetics</p>
      </header>

      {!isRunning && currentIndex === 0 && !workoutComplete && (
        <div style={styles.infoBox}>
          <h2 style={styles.infoTitle}>Workout Overview</h2>
          <ul style={styles.infoList}>
            <li>✓ Full body compound movements</li>
            <li>✓ Targets all major muscle groups</li>
            <li>✓ Progressive overload friendly</li>
            <li>✓ Efficient 15-minute routine</li>
            <li>✓ Perfect for inconsistent schedules</li>
          </ul>
          <div style={styles.tips}>
            <strong>Tips:</strong>
            <ul style={styles.tipsList}>
              <li>Focus on form over speed</li>
              <li>Control the weight on the way down</li>
              <li>Breathe steadily throughout</li>
              <li>Do what you can - consistency beats perfection</li>
            </ul>
          </div>
        </div>
      )}

      <div style={styles.progressBar}>
        <div style={{...styles.progressFill, width: `${progress}%`}} />
      </div>

      <div style={styles.mainCard}>
        {workoutComplete ? (
          <div style={styles.completeScreen}>
            <div style={styles.completeIcon}>🎉</div>
            <h2 style={styles.completeTitle}>Workout Complete!</h2>
            <p style={styles.completeText}>Great job! You've finished your 15-minute session.</p>
            <button onClick={resetWorkout} style={styles.button}>Start New Workout</button>
          </div>
        ) : (
          <>
            <div style={styles.exerciseHeader}>
              <span style={styles.exerciseNumber}>Exercise {currentIndex + 1}/{WORKOUT.length}</span>
              {isRest && <span style={styles.restBadge}>REST</span>}
            </div>

            <h2 style={styles.exerciseName}>
              {isRest ? 'Rest Period' : currentExercise.name}
            </h2>

            {!isRest && (
              <>
                <div style={styles.targetBadge}>{currentExercise.targets}</div>
                <p style={styles.description}>{currentExercise.description}</p>
                {currentExercise.reps && (
                  <p style={styles.reps}>Target: {currentExercise.reps}</p>
                )}
              </>
            )}

            <div style={styles.timerSection}>
              <div style={styles.timer}>{timeLeft}s</div>
              <div style={styles.timerLabel}>
                {isRest ? 'Rest remaining' : 'Time remaining'}
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button
                onClick={toggleTimer}
                style={{...styles.button, ...styles.primaryButton}}
              >
                {isRunning ? '⏸ Pause' : '▶ Start'}
              </button>
              <button
                onClick={skipExercise}
                style={styles.button}
              >
                Skip →
              </button>
              <button
                onClick={resetWorkout}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>

      <div style={styles.exerciseList}>
        <h3 style={styles.listTitle}>Exercise List</h3>
        {WORKOUT.map((exercise, index) => (
          <div
            key={index}
            style={{
              ...styles.exerciseItem,
              ...(index === currentIndex && !workoutComplete ? styles.exerciseItemActive : {}),
              ...(index < currentIndex ? styles.exerciseItemComplete : {})
            }}
          >
            <div>
              <strong>{exercise.name}</strong>
              <div style={styles.exerciseItemDetails}>
                {exercise.reps || `${exercise.duration}s`} • {exercise.targets}
              </div>
            </div>
            {index < currentIndex && <span style={styles.checkmark}>✓</span>}
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          <strong>Remember:</strong> Even one workout per week is better than none.
          Focus on progressive overload by adding reps or sets over time.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f0f0f',
    color: '#ffffff',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    paddingTop: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    margin: 0,
  },
  infoBox: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    border: '1px solid #333',
  },
  infoTitle: {
    margin: '0 0 15px 0',
    fontSize: '20px',
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 15px 0',
    fontSize: '14px',
    lineHeight: '1.8',
  },
  tips: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#aaa',
  },
  tipsList: {
    margin: '5px 0 0 0',
    paddingLeft: '20px',
    lineHeight: '1.6',
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#222',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    transition: 'width 0.3s ease',
  },
  mainCard: {
    backgroundColor: '#1a1a1a',
    padding: '30px',
    borderRadius: '16px',
    marginBottom: '30px',
    border: '1px solid #333',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  exerciseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  exerciseNumber: {
    fontSize: '14px',
    color: '#888',
  },
  restBadge: {
    backgroundColor: '#ff6b6b',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  exerciseName: {
    fontSize: '28px',
    margin: '0 0 15px 0',
    fontWeight: 'bold',
  },
  targetBadge: {
    display: 'inline-block',
    backgroundColor: '#667eea',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    marginBottom: '15px',
  },
  description: {
    fontSize: '16px',
    color: '#aaa',
    lineHeight: '1.6',
    margin: '0 0 10px 0',
  },
  reps: {
    fontSize: '14px',
    color: '#888',
    fontStyle: 'italic',
  },
  timerSection: {
    textAlign: 'center',
    margin: '30px 0',
  },
  timer: {
    fontSize: '72px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1',
  },
  timerLabel: {
    fontSize: '14px',
    color: '#888',
    marginTop: '10px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    flex: 1,
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    transition: 'all 0.2s',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  secondaryButton: {
    backgroundColor: '#333',
  },
  completeScreen: {
    textAlign: 'center',
  },
  completeIcon: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  completeTitle: {
    fontSize: '32px',
    margin: '0 0 15px 0',
  },
  completeText: {
    fontSize: '16px',
    color: '#aaa',
    marginBottom: '30px',
  },
  exerciseList: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    border: '1px solid #333',
  },
  listTitle: {
    fontSize: '18px',
    margin: '0 0 15px 0',
  },
  exerciseItem: {
    padding: '12px',
    marginBottom: '8px',
    borderRadius: '8px',
    backgroundColor: '#0f0f0f',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseItemActive: {
    backgroundColor: '#2a2a4a',
    border: '1px solid #667eea',
  },
  exerciseItemComplete: {
    opacity: 0.5,
  },
  exerciseItemDetails: {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px',
  },
  checkmark: {
    color: '#4ade80',
    fontSize: '18px',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    border: '1px solid #333',
  },
  footerText: {
    margin: 0,
    fontSize: '14px',
    color: '#aaa',
    lineHeight: '1.6',
  },
};
