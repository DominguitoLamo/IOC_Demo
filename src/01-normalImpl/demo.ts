import { UserImpl } from "./UserImpl";
import { User } from './interface_demo';

const user: User = new UserImpl("Tom", 45);

console.log("年龄为 ", user.getAge());
console.log("姓名为 ", user.getName());