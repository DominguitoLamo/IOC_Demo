import { Person } from './Person';
import { Injectable, InjectValue } from './decorator';

@Injectable()
export class Father implements Person {

  @InjectValue("${father.name}")
  name: string;

  @InjectValue("${father.age}")
  age: number;


  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `My name is ${this.name}. I am ${this.age} years old`;
  }
}