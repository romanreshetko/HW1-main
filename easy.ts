export type MyPick<T, K extends keyof T> = {
    [Key in K]: T[Key]
};

export type NOfArray<ArrayObj extends {[n:number]:any}, N extends number> = 
    ArrayObj[N] extends boolean ? boolean : 
    ArrayObj[N] extends number ? number :
    ArrayObj[N] extends string ? string :
    ArrayObj[N];

export type Unshift<ArrayType extends any[], Element> = [Element, ...ArrayType];

export type MyExclude<T, U> = T extends U ? never : T

//tests
type User = {id: number; name: string, age: number};
type MyUser = MyPick<User, 'id' | 'name'>

type A = NOfArray<["hello", 1, true], 2>
let a: A = false

type UnshiftArray = Unshift<string[], number>
let array: UnshiftArray = [5, 'a', 'b', 'c']

type Excluded1 = MyExclude<number | string, string>
type Excluded2 = MyExclude<'type' | true | 1, 1 | 2>