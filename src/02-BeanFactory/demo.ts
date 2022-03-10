import { User } from "./interface_demo";
import { getBean } from "./BeanFactory";

const user: User = getBean<User>('userImpl');

console.log("年龄为 ", user.getAge());
console.log("姓名为 ", user.getName());