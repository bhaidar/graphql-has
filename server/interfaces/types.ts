/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

type Resolver<Result, Args = any> = (
  parent: any,
  args: Args,
  context: any,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

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
  export interface Resolvers {
    getFortuneCookie?: GetFortuneCookieResolver;
  }

  export type GetFortuneCookieResolver = Resolver<string | null>;
}
export namespace MutationResolvers {
  export interface Resolvers {
    uploadDocumentBin?: UploadDocumentBinResolver;
  }

  export type UploadDocumentBinResolver = Resolver<File, UploadDocumentBinArgs>;
  export interface UploadDocumentBinArgs {
    file: Upload;
  }
}
export namespace FileResolvers {
  export interface Resolvers {
    filename?: FilenameResolver;
    mimetype?: MimetypeResolver;
    encoding?: EncodingResolver;
  }

  export type FilenameResolver = Resolver<string>;
  export type MimetypeResolver = Resolver<string>;
  export type EncodingResolver = Resolver<string>;
}
export namespace SubscriptionResolvers {
  export interface Resolvers {
    onData?: OnDataResolver;
  }

  export type OnDataResolver = Resolver<SubscriptionResult | null>;
}
export namespace SubscriptionResultResolvers {
  export interface Resolvers {
    id?: IdResolver;
    data?: DataResolver;
  }

  export type IdResolver = Resolver<string | null>;
  export type DataResolver = Resolver<string | null>;
}
