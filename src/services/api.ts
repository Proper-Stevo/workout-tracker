// src/services/api.ts
import { gql } from '@apollo/client';

// Workout Queries
export const GET_WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      id
      date
      duration
      notes
      exercises {
        id
        name
        sets {
          reps
          weight
          duration
          distance
        }
      }
    }
  }
`;

export const GET_WORKOUT = gql`
  query GetWorkout($id: ID!) {
    workout(id: $id) {
      id
      date
      duration
      notes
      exercises {
        id
        name
        sets {
          reps
          weight
          duration
          distance
        }
      }
    }
  }
`;

// Workout Mutations
export const CREATE_WORKOUT = gql`
  mutation CreateWorkout($input: WorkoutInput!) {
    createWorkout(input: $input) {
      id
      date
      duration
      notes
      exercises {
        id
        name
        sets {
          reps
          weight
          duration
          distance
        }
      }
    }
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation UpdateWorkout($id: ID!, $input: WorkoutInput!) {
    updateWorkout(id: $id, input: $input) {
      id
      date
      duration
      notes
      exercises {
        id
        name
        sets {
          reps
          weight
          duration
          distance
        }
      }
    }
  }
`;

export const DELETE_WORKOUT = gql`
  mutation DeleteWorkout($id: ID!) {
    deleteWorkout(id: $id)
  }
`;

// Progress Queries
export const GET_PROGRESS = gql`
  query GetProgress {
    progressEntries {
      id
      date
      weight
      measurements {
        chest
        waist
        hips
        biceps
        thighs
      }
      notes
    }
  }
`;

// Progress Mutations
export const CREATE_PROGRESS = gql`
  mutation CreateProgress($input: ProgressInput!) {
    createProgress(input: $input) {
      id
      date
      weight
      measurements {
        chest
        waist
        hips
        biceps
        thighs
      }
      notes
    }
  }
`;

export const UPDATE_PROGRESS = gql`
  mutation UpdateProgress($id: ID!, $input: ProgressInput!) {
    updateProgress(id: $id, input: $input) {
      id
      date
      weight
      measurements {
        chest
        waist
        hips
        biceps
        thighs
      }
      notes
    }
  }
`;

export const DELETE_PROGRESS = gql`
  mutation DeleteProgress($id: ID!) {
    deleteProgress(id: $id)
  }
`;

// Types for TypeScript
export interface WorkoutSet {
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;
  date: string;
  duration: number;
  notes?: string;
  exercises: Exercise[];
}

export interface Measurements {
  chest?: number;
  waist?: number;
  hips?: number;
  biceps?: number;
  thighs?: number;
}

export interface Progress {
  id: string;
  date: string;
  weight?: number;
  measurements?: Measurements;
  notes?: string;
}

// Input types for mutations
export interface WorkoutInput {
  date: string;
  duration: number;
  notes?: string;
  exercises: Omit<Exercise, 'id'>[];
}

export interface ProgressInput {
  date: string;
  weight?: number;
  measurements?: Measurements;
  notes?: string;
}