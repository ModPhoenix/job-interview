export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  NaiveDateTime: any;
};


export type Interview = {
  __typename?: 'Interview';
  id: Scalars['Int'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  questions: Array<Question>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  createInterview: Interview;
  createQuestion: Question;
  /** Mutation returns 1 if deleted question by id or 0 if question not found */
  deleteQuestion: Scalars['Int'];
  createUser: User;
  signIn: Scalars['String'];
};


export type MutationRootCreateInterviewArgs = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  questions: Array<Scalars['Int']>;
};


export type MutationRootCreateQuestionArgs = {
  title: Scalars['String'];
  body: Scalars['String'];
};


export type MutationRootDeleteQuestionArgs = {
  questionId: Scalars['Int'];
};


export type MutationRootCreateUserArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRootSignInArgs = {
  input: SignInInput;
};


export type QueryRoot = {
  __typename?: 'QueryRoot';
  interviews: Array<Interview>;
  questions: Array<Question>;
  users: Array<User>;
};


export type QueryRootInterviewsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryRootQuestionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryRootUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['Int'];
  title: Scalars['String'];
  body: Scalars['String'];
};

export type SignInInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  hash: Array<Scalars['Int']>;
  salt: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['NaiveDateTime'];
};
