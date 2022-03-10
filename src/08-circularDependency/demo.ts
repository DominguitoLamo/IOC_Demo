import { getBean } from "./container";
import { Person } from "./Person";

const student = getBean("Student") as Person;

// My name is Tom. I am 45 years old. My father's name is Thomas.
console.log(student.introduce());
