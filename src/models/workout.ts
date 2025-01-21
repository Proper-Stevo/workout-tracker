// src/models/workout.ts
import mongoose from 'mongoose';

const WorkoutSetSchema = new mongoose.Schema({
  reps: Number,
  weight: Number,
  duration: Number,
  distance: Number
});

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: [WorkoutSetSchema]
});

const WorkoutSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  notes: String,
  exercises: [ExerciseSchema]
});

export const Workout = mongoose.model('Workout', WorkoutSchema);