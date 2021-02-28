import { ApolloError } from "@apollo/client";

export type QueryError = ApolloError | undefined;

export interface QueryStateData<T> {
  loading: boolean;
  error: QueryError;
  data: T | undefined;
}

export interface Questions {
  id: number;
  title: string;
  body: string;
}

export interface QuestionsData {
  getQuestions: Questions[];
}
