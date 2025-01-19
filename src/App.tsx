
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import Progress from './pages/Progress';
import WorkoutSession from './pages/WorkoutSession';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

const queryClient = new QueryClient();

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
