export interface Workout {
    id: string;
    date: string;
    duration: number;
    exercises: Exercise[];
    notes?: string;
  }
  
  export interface Exercise {
    id: string;
    name: string;
    sets: Set[];
  }
  
  export interface Set {
    reps?: number;
    weight?: number;
    duration?: number;
    distance?: number;
  }
  
  export interface Progress {
    id: string;
    date: string;
    weight?: number;
    measurements?: {
      chest?: number;
      waist?: number;
      hips?: number;
      biceps?: number;
      thighs?: number;
    };
    notes?: string;
  }