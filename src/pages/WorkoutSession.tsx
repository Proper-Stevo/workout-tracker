
import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const WorkoutSession = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">New Workout</h1>
        <Button variant="outline">Cancel</Button>
      </div>

      <Card>
        <div className="space-y-4">
          {/* Workout Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input type="date" label="Date" />
            <Input type="time" label="Start Time" />
          </div>

          {/* Exercise List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Exercises</h2>
              <Button size="sm">
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Exercise
              </Button>
            </div>

            {/* Example Exercise Set */}
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Bench Press</h3>
                <Button variant="outline" size="sm">
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <Input type="number" placeholder="Weight (lbs)" />
                  <Input type="number" placeholder="Reps" />
                  <Button variant="outline" size="sm">
                    Add Set
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button>Complete Workout</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkoutSession;