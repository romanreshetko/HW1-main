export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export type MyCapitalize<T extends string> = T extends `${infer First}${infer Rest}`
? `${Uppercase<First>}${Rest}`
: T;

export type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K]
}

export type ParseURLParams<StringElem extends string> = 
    StringElem extends `${string}:${infer Param}/${infer Rest}` ? 
    Param | ParseURLParams<`/${Rest}`> :
    StringElem extends `${string}:${infer Param}` ?
    Param : never;

//tests
type UserData = {
    name: string;
    age: number
}
type User = {
    id: number;
    data: UserData;
}
type DP = DeepPartial<User>
let dp: DP = {data: {name: 'A'}}

type hello = 'hello'
type Hello = MyCapitalize<hello>
let h: Hello = 'Hello'

type ReadolyUser = {
    readonly id: number;
    readonly name: string;
}
type MutableUser = DeepMutable<ReadolyUser>

type Params = ParseURLParams<'posts/:id/:user'>