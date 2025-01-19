import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ExerciseSet {
  weight?: number;
  reps?: number;
  duration?: number;
  distance?: number;
}

interface WorkoutExercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
}

interface WorkoutFormData {
  date: string;
  startTime: string;
  exercises: WorkoutExercise[];
  notes?: string;
}

interface WorkoutFormProps {
  initialData?: WorkoutFormData;
  onSubmit: (data: WorkoutFormData) => void;
  onCancel: () => void;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<WorkoutFormData>(
    initialData || {
      date: new Date().toISOString().split('T')[0],
      startTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
      exercises: [],
      notes: ''
    }
  );

  const addExercise = (exercise: WorkoutExercise) => {
    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, exercise]
    }));
  };

  const removeExercise = (exerciseId: string) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(e => e.id !== exerciseId)
    }));
  };

  const addSet = (exerciseId: string, set: ExerciseSet) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map(e =>
        e.id === exerciseId
          ? { ...e, sets: [...e.sets, set] }
          : e
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <div className="space-y-4">
          {/* Workout Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              type="date"
              label="Date"
              value={formData.date}
              onChange={e =>
                setFormData(prev => ({ ...prev, date: e.target.value }))
              }
            />
            <Input
              type="time"
              label="Start Time"
              value={formData.startTime}
              onChange={e =>
                setFormData(prev => ({ ...prev, startTime: e.target.value }))
              }
            />
          </div>

          {/* Exercise List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Exercises</h2>
              <Button
                type="button"
                onClick={() =>
                  addExercise({
                    id: Math.random().toString(),
                    name: '',
                    sets: []
                  })
                }
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Exercise
              </Button>
            </div>

            {formData.exercises.map(exercise => (
              <div key={exercise.id} className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <Input
                    value={exercise.name}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        exercises: prev.exercises.map(ex =>
                          ex.id === exercise.id
                            ? { ...ex, name: e.target.value }
                            : ex
                        )
                      }))
                    }
                    placeholder="Exercise name"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeExercise(exercise.id)}
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </Button>
                </div>

                {/* Sets */}
                <div className="space-y-2">
                  {exercise.sets.map((set, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2">
                      <Input
                        type="number"
                        value={set.weight}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            exercises: prev.exercises.map(ex =>
                              ex.id === exercise.id
                                ? {
                                    ...ex,
                                    sets: ex.sets.map((s, i) =>
                                      i === index
                                        ? { ...s, weight: Number(e.target.value) }
                                        : s
                                    )
                                  }
                                : ex
                            )
                          }))
                        }
                        placeholder="Weight (lbs)"
                      />
                      <Input
                        type="number"
                        value={set.reps}
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            exercises: prev.exercises.map(ex =>
                              ex.id === exercise.id
                                ? {
                                    ...ex,
                                    sets: ex.sets.map((s, i) =>
                                      i === index
                                        ? { ...s, reps: Number(e.target.value) }
                                        : s
                                    )
                                  }
                                : ex
                            )
                          }))
                        }
                        placeholder="Reps"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addSet(exercise.id, { weight: 0, reps: 0 })
                    }
                  >
                    Add Set
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={e =>
                setFormData(prev => ({ ...prev, notes: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows={3}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Workout</Button>
          </div>
        </div>
      </Card>
    </form>
  );
};