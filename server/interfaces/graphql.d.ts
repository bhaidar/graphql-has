// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation | ISubscription;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
getFortuneCookie: FortuneString | null;
}

type FortuneString = IStringA | IStringB;



interface IStringA {
__typename: "StringA";
msg: string | null;
}

interface IStringB {
__typename: "StringB";
msg: string | null;
}

interface IMutation {
__typename: "Mutation";
uploadDocumentBin: IFile;
}

interface IUploadDocumentBinOnMutationArguments {
file: any;
}

interface IFile {
__typename: "File";
filename: string;
mimetype: string;
encoding: string;
}

interface ISubscription {
__typename: "Subscription";
onData: ISubscriptionResult | null;
}

interface ISubscriptionResult {
__typename: "SubscriptionResult";
id: string | null;
data: string | null;
}

const enum CacheControlScope {
PUBLIC = 'PUBLIC',
PRIVATE = 'PRIVATE'
}
}

// tslint:enable
