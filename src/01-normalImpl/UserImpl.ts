import { User } from './interface_demo'

export class UserImpl implements User {

   private name:string;

   private age:number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public getName():string {
    return this.name;
  }

  public getAge():number {
    return this.age;
  }
}