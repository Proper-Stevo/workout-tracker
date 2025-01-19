// src/utils/helpers.ts

// Date formatting
export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Time formatting
  export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) return `${remainingMinutes}min`;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}min`;
  };
  
  // Weight formatting
  export const formatWeight = (weight: number): string => {
    return `${weight} lbs`;
  };
  
  // Calculate BMI
  export const calculateBMI = (weight: number, height: number): number => {
    // weight in lbs, height in inches
    return +(((weight * 703) / (height * height))).toFixed(1);
  };
  
  // Calculate one rep max
  export const calculateOneRepMax = (weight: number, reps: number): number => {
    // Brzycki Formula
    return Math.round(weight * (36 / (37 - reps)));
  };
  
  // Calculate total volume for a workout
  export const calculateWorkoutVolume = (exercises: Array<{
    sets: Array<{
      weight?: number;
      reps?: number;
    }>;
  }>): number => {
    return exercises.reduce((total, exercise) => {
      const exerciseVolume = exercise.sets.reduce((setTotal, set) => {
        return setTotal + ((set.weight || 0) * (set.reps || 0));
      }, 0);
      return total + exerciseVolume;
    }, 0);
  };
  
  // Format large numbers
  export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  // Calculate percentage change
  export const calculatePercentageChange = (current: number, previous: number): number => {
    return +((((current - previous) / previous) * 100)).toFixed(1);
  };
  
  // Group workouts by month
  export const groupByMonth = (workouts: Array<{ date: string }>) => {
    return workouts.reduce((groups, workout) => {
      const month = new Date(workout.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      return {
        ...groups,
        [month]: [...(groups[month] || []), workout]
      };
    }, {} as Record<string, typeof workouts>);
  };
  
  // Generate workout streaks
  export const calculateWorkoutStreak = (workouts: Array<{ date: string }>): number => {
    if (!workouts.length) return 0;
  
    const sortedDates = workouts
      .map(w => new Date(w.date).toISOString().split('T')[0])
      .sort()
      .reverse();
  
    let streak = 1;
    const today = new Date().toISOString().split('T')[0];
    let lastWorkout = sortedDates[0];
  
    // If last workout wasn't today or yesterday, streak is broken
    if (lastWorkout !== today && lastWorkout !== getYesterday()) return 0;
  
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i]);
      const previous = new Date(sortedDates[i + 1]);
      const diffDays = getDaysDifference(current, previous);
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
  
    return streak;
  };
  
  // Helper functions for date calculations
  const getYesterday = (): string => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };
  
  const getDaysDifference = (date1: Date, date2: Date): number => {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };
  
  // Validate email format
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Generate a random color (for charts)
  export const generateRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // Sort exercises by muscle group
  export const sortExercisesByMuscleGroup = (exercises: Array<{
    name: string;
    muscleGroup: string;
  }>) => {
    return exercises.sort((a, b) => a.muscleGroup.localeCompare(b.muscleGroup));
  };
  
  // Calculate estimated calories burned
  export const calculateCaloriesBurned = (
    weightInLbs: number,
    durationInMinutes: number,
    intensity: 'low' | 'medium' | 'high'
  ): number => {
    const mets = {
      low: 3,
      medium: 5,
      high: 7
    };
    
    const weightInKg = weightInLbs * 0.453592;
    return Math.round((mets[intensity] * 3.5 * weightInKg * durationInMinutes) / 200);
  };