import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type SignInMutationVariables = Types.Exact<{
  input: Types.SignInInput;
}>;


export type SignInMutation = (
  { __typename?: 'MutationRoot' }
  & Pick<Types.MutationRoot, 'signIn'>
);

export type QuestionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type QuestionsQuery = (
  { __typename?: 'QueryRoot' }
  & { questions: Array<(
    { __typename?: 'Question' }
    & Pick<Types.Question, 'id' | 'title' | 'body'>
  )> }
);

export type CreateQuestionMutationVariables = Types.Exact<{
  title: Types.Scalars['String'];
  body: Types.Scalars['String'];
}>;


export type CreateQuestionMutation = (
  { __typename?: 'MutationRoot' }
  & { createQuestion: (
    { __typename?: 'Question' }
    & Pick<Types.Question, 'id' | 'title' | 'body'>
  ) }
);

export type NewQuestionFragment = (
  { __typename?: 'Question' }
  & Pick<Types.Question, 'id' | 'title' | 'body'>
);

export type DeleteQuestionMutationVariables = Types.Exact<{
  questionId: Types.Scalars['Int'];
}>;


export type DeleteQuestionMutation = (
  { __typename?: 'MutationRoot' }
  & Pick<Types.MutationRoot, 'deleteQuestion'>
);

export const NewQuestionFragmentDoc = gql`
    fragment NewQuestion on Question {
  id
  title
  body
}
    `;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input)
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const QuestionsDocument = gql`
    query Questions {
  questions {
    id
    title
    body
  }
}
    `;

/**
 * __useQuestionsQuery__
 *
 * To run a query within a React component, call `useQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
        return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, baseOptions);
      }
export function useQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
          return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, baseOptions);
        }
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsLazyQueryHookResult = ReturnType<typeof useQuestionsLazyQuery>;
export type QuestionsQueryResult = Apollo.QueryResult<QuestionsQuery, QuestionsQueryVariables>;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($title: String!, $body: String!) {
  createQuestion(title: $title, body: $body) {
    id
    title
    body
  }
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, baseOptions);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($questionId: Int!) {
  deleteQuestion(questionId: $questionId)
}
    `;
export type DeleteQuestionMutationFn = Apollo.MutationFunction<DeleteQuestionMutation, DeleteQuestionMutationVariables>;

/**
 * __useDeleteQuestionMutation__
 *
 * To run a mutation, you first call `useDeleteQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestionMutation, { data, loading, error }] = useDeleteQuestionMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useDeleteQuestionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>) {
        return Apollo.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument, baseOptions);
      }
export type DeleteQuestionMutationHookResult = ReturnType<typeof useDeleteQuestionMutation>;
export type DeleteQuestionMutationResult = Apollo.MutationResult<DeleteQuestionMutation>;
export type DeleteQuestionMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>;