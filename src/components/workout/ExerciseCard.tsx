import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ExerciseCardProps {
  name: string;
  muscleGroups: string[];
  type: string;
  equipment?: string[];
  onViewDetails?: () => void;
  onSelect?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  muscleGroups,
  type,
  equipment,
  onViewDetails,
  onSelect
}) => {
  return (
    <Card className="flex flex-col">
      <div className="flex-1 p-4">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {muscleGroups.join(', ')}
        </p>
        {equipment && (
          <p className="mt-2 text-xs text-gray-500">
            Equipment: {equipment.join(', ')}
          </p>
        )}
      </div>
      <div className="flex justify-between border-t p-4">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          {type}
        </span>
        <div className="space-x-2">
          {onSelect && (
            <Button onClick={onSelect} variant="outline" size="sm">
              Select
            </Button>
          )}
          {onViewDetails && (
            <Button onClick={onViewDetails} variant="outline" size="sm">
              View Details
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
