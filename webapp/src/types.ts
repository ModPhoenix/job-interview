import { ApolloError } from "@apollo/client";

export interface AccessToken {
  exp: number;
  iat: number;
  role: string;
  sub: string;
}

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
  questions: Questions[];
}
