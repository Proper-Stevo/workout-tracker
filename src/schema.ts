// src/schema.ts
export const typeDefs = `#graphql
  type WorkoutSet {
    reps: Int
    weight: Float
    duration: Int
    distance: Float
  }

  type Exercise {
    id: ID!
    name: String!
    sets: [WorkoutSet!]!
  }

  type Workout {
    id: ID!
    date: String!
    duration: Int!
    notes: String
    exercises: [Exercise!]!
  }

  input WorkoutSetInput {
    reps: Int
    weight: Float
    duration: Int
    distance: Float
  }

  input ExerciseInput {
    name: String!
    sets: [WorkoutSetInput!]!
  }

  input WorkoutInput {
    date: String!
    duration: Int!
    notes: String
    exercises: [ExerciseInput!]!
  }

  type Query {
    workouts: [Workout!]!
    workout(id: ID!): Workout
  }

  type Mutation {
    createWorkout(input: WorkoutInput!): Workout!
    updateWorkout(id: ID!, input: WorkoutInput!): Workout!
    deleteWorkout(id: ID!): Boolean!
  }
`; 