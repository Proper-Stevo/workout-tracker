
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import Progress from './pages/Progress';
import WorkoutSession from './pages/WorkoutSession';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<Exercises />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/workout/:id" element={<WorkoutSession />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
