import { UserImpl } from './UserImpl';

type BeanFactoryType = Record<string, Object>;

const beanFactory: BeanFactoryType = {
  'userImpl': new UserImpl("Tom", 45)
}

type beanTypes = keyof BeanFactoryType;


export function getBean<T>(key: beanTypes): T {
  const result = beanFactory[key] as T;

  return result;
}