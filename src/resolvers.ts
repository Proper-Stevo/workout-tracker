// src/resolvers.ts
import { Workout } from './models/workout';

export const resolvers = {
  Query: {
    workouts: async () => {
      return await Workout.find().sort({ date: -1 });
    },
    workout: async (_: any, { id }: { id: string }) => {
      return await Workout.findById(id);
    }
  },

  Mutation: {
    createWorkout: async (_: any, { input }: { input: any }) => {
      const workout = new Workout(input);
      return await workout.save();
    },

    updateWorkout: async (_: any, { id, input }: { id: string, input: any }) => {
      return await Workout.findByIdAndUpdate(
        id,
        input,
        { new: true }
      );
    },

    deleteWorkout: async (_: any, { id }: { id: string }) => {
      await Workout.findByIdAndDelete(id);
      return true;
    }
  }
};