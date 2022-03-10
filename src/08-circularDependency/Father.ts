import { Person } from './Person';
import { Inject, Injectable, InjectValue } from './decorator';

@Injectable()
export class Father implements Person {

  @InjectValue("${father.name}")
  name: string;

  @InjectValue("${father.age}")
  age: number;

  @Inject("Student")
  student: Person;


  constructor(name: string, age: number, student: Person) {
    this.name = name;
    this.age = age;
    this.student = student;
  }

  introduce() {
    return `My name is ${this.name}. I am ${this.age} years old`;
  }
}