
import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { ChartBarIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/workout/new">
          <Button>Start New Workout</Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center space-x-4">
          <div className="rounded-lg bg-blue-100 p-3">
            <FireIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">This Week's Workouts</p>
            <p className="text-2xl font-semibold text-gray-900">4</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="rounded-lg bg-green-100 p-3">
            <ClockIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Time</p>
            <p className="text-2xl font-semibold text-gray-900">3h 45m</p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="rounded-lg bg-purple-100 p-3">
            <ChartBarIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Progress Status</p>
            <p className="text-2xl font-semibold text-green-600">On Track</p>
          </div>
        </Card>
      </div>

      {/* Recent Workouts */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Workouts
        </h2>
        <div className="space-y-4">
          {/* We'll map through recent workouts here */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h3 className="font-medium text-gray-900">Upper Body Strength</h3>
              <p className="text-sm text-gray-500">Jan 18, 2025 • 45 min</p>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;