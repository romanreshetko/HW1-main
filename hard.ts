type ToCamel<S extends string> = 
    S extends `${infer First}_${infer Letter}${infer Rest}` ? 
    `${First}${Uppercase<Letter>}${ToCamel<Rest>}` :
    S;

export type Camelize<ObjectType> = {
    [K in keyof ObjectType as ToCamel<K & string>]: ObjectType[K] extends object ?
    Camelize<ObjectType[K]> : ObjectType[K]
};

type Intersect<U> = 
    (U extends any ? (x: U) => void : never) extends (x: infer R) => void ? 
        R : never;

export type DeepPick<T, Paths extends string> = 
    Intersect<
    Paths extends `${infer Key}.${infer Rest}` ?
        Key extends keyof T ?
            {[K in Key]: DeepPick<T[K], Rest>} : never
    : Paths extends keyof T ?
        {[K in Paths]: T[K]} : never>;


//tests
type UserData = {
    user_name: string;
    user_age: number
}
type User = {
    user_id: number;
    user_data: UserData;
}
type camelUser = Camelize<User>

type User2 = {
    id: number;
    name: string;
    address: {
      street: string;
      city: string;
      zip: string;
    };
};
type MyUser = DeepPick<User2, 'id' | 'address.street' | 'address.city'>