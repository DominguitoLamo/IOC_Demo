import 'reflect-metadata';
import { Person } from './Person';

type beanType = Record<string, Function>;

const beans:beanType = {};

saveBean(Person);


export function getMetaValue(target: Object, propertyKey: string) {
  const metaValue = Reflect.getMetadata("injectValue", target, propertyKey);
  return metaValue;
}

export function saveBean(target: Function) {
  const name = target.name;
  beans[name] = target;
}

export function createBean(beanName: string) {
  // 获取saveBean存放的类
  const Bean = beans[beanName];

  if (!Bean) {
    throw new Error("没有对应的类, 无法创建");
  }

  // 判断是否可以注入属性
  const isInjectable = Reflect.getMetadata("injectable", Bean) as boolean;

  if (!isInjectable) {
    return Bean;
  }

  // 利用反射, 创建实例
  const result = Reflect.construct(Bean, []);

  Object.keys(result).forEach(key => {
    // 获取装饰器InjectValue赋的值
    const propertyValue = getMetaValue(result, key);

    if (propertyValue !== undefined || propertyValue !== null) {
      Reflect.defineProperty(result, key, {
        value: propertyValue
      });
    } else {
      const value = Reflect.get(Bean, key);
      Reflect.defineProperty(result, key, {
        value
      });
    }
  })

  return result;
}