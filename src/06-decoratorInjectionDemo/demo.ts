import { Person } from "./Person";
import { createBean } from "./reflectUtils";

const person: Person = createBean('Person') as Person;

console.log("名字是",person.name); // 名字是Tom
console.log("年龄是",person.age);  // 年龄是12