
import React from 'react';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Exercises = () => {
  const categories = ['All', 'Strength', 'Cardio', 'Flexibility'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Exercise Library</h1>
        <Button>Add Exercise</Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search exercises..."
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'primary' : 'outline'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Example Exercise Card */}
        <Card className="flex flex-col">
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">Bench Press</h3>
            <p className="mt-1 text-sm text-gray-500">Chest, Shoulders, Triceps</p>
          </div>
          <div className="flex justify-between border-t p-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              Strength
            </span>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Exercises;