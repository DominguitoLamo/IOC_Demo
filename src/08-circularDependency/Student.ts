import { Person } from './Person';
import { Injectable, InjectValue, Inject } from './decorator';

@Injectable()
export class Student implements Person {

  @InjectValue("${student.name}")
  name: string;

  @InjectValue("${student.age}")
  age: number;

  @Inject("father")
  father: Person;

  constructor(name: string, age: number, father: Person) {
    this.name = name;
    this.age = age;
    this.father = father;
  }

  introduce() {
    return `My name is ${this.name}. I am ${this.age} years old. My father's name is ${this.father.name}.`;
  }
}