import { UserImpl } from './UserImpl';
import * as config from './beanConfig.json';


type BeanFactoryType = Record<string, Object>;

const beanFactory: BeanFactoryType = {
  'userImpl': new UserImpl(config.user.name, config.user.age)
}

type beanTypes = keyof BeanFactoryType;


export function getBean<T>(key: beanTypes): T {
  const result = beanFactory[key] as T;

  return result;
}