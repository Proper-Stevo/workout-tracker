import { useQuery, useMutation } from '@apollo/client';
import { 
  GET_WORKOUTS, 
  CREATE_WORKOUT, 
  UPDATE_WORKOUT, 
  DELETE_WORKOUT 
} from '../services/api';

interface WorkoutSet {
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

interface Workout {
  id: string;
  date: string;
  duration: number;
  notes?: string;
  exercises: Exercise[];
}

interface WorkoutsData {
  workouts: Workout[];
}

interface WorkoutStats {
  totalWorkouts: number;
  thisWeekWorkouts: number;
  totalDuration: number;
  averageDuration: number;
}

export const useWorkouts = () => {
  const { data, loading: isLoading, error } = useQuery<WorkoutsData>(GET_WORKOUTS);

  const [createWorkoutMutation] = useMutation(CREATE_WORKOUT, {
    refetchQueries: [{ query: GET_WORKOUTS }],
  });

  const [updateWorkoutMutation] = useMutation(UPDATE_WORKOUT, {
    refetchQueries: [{ query: GET_WORKOUTS }],
  });

  const [deleteWorkoutMutation] = useMutation(DELETE_WORKOUT, {
    refetchQueries: [{ query: GET_WORKOUTS }],
  });

  const createWorkout = async (workoutData: Omit<Workout, 'id'>) => {
    const { data } = await createWorkoutMutation({
      variables: { input: workoutData },
    });
    return data.createWorkout;
  };

  const updateWorkout = async (id: string, workoutData: Omit<Workout, 'id'>) => {
    const { data } = await updateWorkoutMutation({
      variables: { id, input: workoutData },
    });
    return data.updateWorkout;
  };

  const deleteWorkout = async (id: string) => {
    const { data } = await deleteWorkoutMutation({
      variables: { id },
    });
    return data.deleteWorkout;
  };

  const getRecentWorkouts = (limit: number = 5): Workout[] => {
    if (!data?.workouts) return [];
    return [...data.workouts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  const getWorkoutStats = (): WorkoutStats | null => {
    if (!data?.workouts?.length) return null;

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const thisWeeksWorkouts = data.workouts.filter(
      workout => new Date(workout.date) >= oneWeekAgo
    );

    const totalDuration = data.workouts.reduce((sum: number, workout) => sum + (workout.duration || 0), 0);

    return {
      totalWorkouts: data.workouts.length,
      thisWeekWorkouts: thisWeeksWorkouts.length,
      totalDuration,
      averageDuration: totalDuration / data.workouts.length
    };
  };

  return {
    workouts: data?.workouts || [],
    isLoading,
    error,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    getRecentWorkouts,
    getWorkoutStats
  };
};