import { Injectable, InjectValue } from './decorator';

@Injectable()
export class Person {

  @InjectValue("Tom")
  name: string

  @InjectValue(12)
  age: number

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
