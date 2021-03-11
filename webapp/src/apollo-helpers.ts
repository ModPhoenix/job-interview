import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type InterviewKeySpecifier = ('id' | 'title' | 'description' | 'status' | 'questions' | InterviewKeySpecifier)[];
export type InterviewFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	questions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationRootKeySpecifier = ('createInterview' | 'createQuestion' | 'deleteQuestion' | 'createUser' | 'signIn' | MutationRootKeySpecifier)[];
export type MutationRootFieldPolicy = {
	createInterview?: FieldPolicy<any> | FieldReadFunction<any>,
	createQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	signIn?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryRootKeySpecifier = ('interviews' | 'questions' | 'users' | QueryRootKeySpecifier)[];
export type QueryRootFieldPolicy = {
	interviews?: FieldPolicy<any> | FieldReadFunction<any>,
	questions?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QuestionKeySpecifier = ('id' | 'title' | 'body' | QuestionKeySpecifier)[];
export type QuestionFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	body?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'hash' | 'salt' | 'email' | 'role' | 'name' | 'createdAt' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	hash?: FieldPolicy<any> | FieldReadFunction<any>,
	salt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Interview?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InterviewKeySpecifier | (() => undefined | InterviewKeySpecifier),
		fields?: InterviewFieldPolicy,
	},
	MutationRoot?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationRootKeySpecifier | (() => undefined | MutationRootKeySpecifier),
		fields?: MutationRootFieldPolicy,
	},
	QueryRoot?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryRootKeySpecifier | (() => undefined | QueryRootKeySpecifier),
		fields?: QueryRootFieldPolicy,
	},
	Question?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QuestionKeySpecifier | (() => undefined | QuestionKeySpecifier),
		fields?: QuestionFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};