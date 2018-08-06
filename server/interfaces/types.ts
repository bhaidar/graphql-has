/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type QueryResolver<Result, Parent = any, Context = any, Args = any> = (
  parent?: Parent,
  args?: Args,
  context?: Context,
  info?: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent?: P,
    args?: Args,
    context?: Context,
    info?: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent?: P,
    args?: Args,
    context?: Context,
    info?: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

export type Resolver<Result, Parent = any, Context = any, Args = any> =
  | QueryResolver<Result, Parent, Context, Args>
  | SubscriptionResolver<Result, Parent, Context, Args>;

/** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any;

export interface Query {
  getFortuneCookie?: string | null;
}

export interface Mutation {
  uploadDocumentBin: File;
}

export interface File {
  filename: string;
  mimetype: string;
  encoding: string;
}

export interface Subscription {
  onData?: SubscriptionResult | null;
}

export interface SubscriptionResult {
  id?: string | null;
  data?: string | null;
}
export interface UploadDocumentBinMutationArgs {
  file: Upload;
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any, Parent = Query> {
    getFortuneCookie?: GetFortuneCookieResolver<string | null, Parent, Context>;
  }

  export type GetFortuneCookieResolver<
    R = string | null,
    Parent = Query,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any, Parent = Mutation> {
    uploadDocumentBin?: UploadDocumentBinResolver<File, Parent, Context>;
  }

  export type UploadDocumentBinResolver<
    R = File,
    Parent = Mutation,
    Context = any
  > = Resolver<R, Parent, Context, UploadDocumentBinArgs>;
  export interface UploadDocumentBinArgs {
    file: Upload;
  }
}

export namespace FileResolvers {
  export interface Resolvers<Context = any, Parent = File> {
    filename?: FilenameResolver<string, Parent, Context>;
    mimetype?: MimetypeResolver<string, Parent, Context>;
    encoding?: EncodingResolver<string, Parent, Context>;
  }

  export type FilenameResolver<
    R = string,
    Parent = File,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type MimetypeResolver<
    R = string,
    Parent = File,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EncodingResolver<
    R = string,
    Parent = File,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = any, Parent = Subscription> {
    onData?: OnDataResolver<SubscriptionResult | null, Parent, Context>;
  }

  export type OnDataResolver<
    R = SubscriptionResult | null,
    Parent = Subscription,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace SubscriptionResultResolvers {
  export interface Resolvers<Context = any, Parent = SubscriptionResult> {
    id?: IdResolver<string | null, Parent, Context>;
    data?: DataResolver<string | null, Parent, Context>;
  }

  export type IdResolver<
    R = string | null,
    Parent = SubscriptionResult,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type DataResolver<
    R = string | null,
    Parent = SubscriptionResult,
    Context = any
  > = Resolver<R, Parent, Context>;
}
