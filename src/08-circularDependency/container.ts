import * as beanConfig from './beanConfig.json';
import { beanFactoryConfig } from './BeanFactory';
import { Father } from './Father';
import { Student } from './Student';

const beanFactory = beanFactoryConfig(beanConfig);
beanFactory.add(Student);
beanFactory.add(Father, "father");

export const getBean = beanFactory.build();
