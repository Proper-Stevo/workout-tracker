import { useQuery, useMutation } from '@apollo/client';
import { 
  GET_PROGRESS, 
  CREATE_PROGRESS, 
  UPDATE_PROGRESS, 
  DELETE_PROGRESS 
} from '../services/api';

interface ProgressEntry {
  id: string;
  date: string;
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
    [key: string]: number | undefined;  // Index signature for dynamic access
  };
}

interface ProgressData {
  progressEntries: ProgressEntry[];
}

interface ChartDataPoint {
  date: string;
  value: number | undefined;
}

export const useProgress = () => {
  const { data, loading: isLoading, error } = useQuery<ProgressData>(GET_PROGRESS);

  const [createProgressMutation] = useMutation(CREATE_PROGRESS, {
    refetchQueries: [{ query: GET_PROGRESS }],
  });

  const [updateProgressMutation] = useMutation(UPDATE_PROGRESS, {
    refetchQueries: [{ query: GET_PROGRESS }],
  });

  const [deleteProgressMutation] = useMutation(DELETE_PROGRESS, {
    refetchQueries: [{ query: GET_PROGRESS }],
  });

  const createProgress = async (progressData: any) => {
    const { data } = await createProgressMutation({
      variables: { input: progressData },
    });
    return data.createProgress;
  };

  const updateProgress = async (id: string, progressData: any) => {
    const { data } = await updateProgressMutation({
      variables: { id, input: progressData },
    });
    return data.updateProgress;
  };

  const deleteProgress = async (id: string) => {
    const { data } = await deleteProgressMutation({
      variables: { id },
    });
    return data.deleteProgress;
  };

  const getWeightProgressData = (): ChartDataPoint[] => {
    if (!data?.progressEntries) return [];
    
    return data.progressEntries
      .filter((entry): entry is ProgressEntry & { weight: number } => 
        entry.weight !== undefined
      )
      .map(entry => ({
        date: entry.date,
        value: entry.weight
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getMeasurementProgress = (measurement: keyof ProgressEntry['measurements']): ChartDataPoint[] => {
    if (!data?.progressEntries) return [];

    return data.progressEntries
      .filter(entry => entry.measurements?.[measurement] !== undefined)
      .map(entry => ({
        date: entry.date,
        value: entry.measurements?.[measurement]
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return {
    progressEntries: data?.progressEntries || [],
    isLoading,
    error,
    createProgress,
    updateProgress,
    deleteProgress,
    getWeightProgressData,
    getMeasurementProgress
  };
};