import { parseInjectValue, getInjectObj } from './reflectUtils'

class BeanFactory {
  private container: Record<string | symbol, Function>

  private jsonConfig: object

  constructor(config: unknown) {
    this.jsonConfig = config as object;
    this.container = {};
  }

  add(target: Function, name?: string | symbol) {
    const containerName = name ? name : target.name;
    this.container[containerName] = target;
  }

  build() {
    const getBean = (beanName: string | symbol) => {
      const bean = this.container[beanName];
      if (!bean) {
        throw new Error("没有对应的类, 无法创建");
      }

      if (!this.isInjectable(bean)) {
        return bean;
      }

      // 利用反射, 创建实例
      const result = Reflect.construct(bean, []);
      Object.keys(result).forEach(key => {
        // 获取装饰器InjectValue赋的值
        const injectValue = parseInjectValue(result, key, this.jsonConfig);
        if (injectValue) {
          Reflect.defineProperty(result, key, {
            value: injectValue
          });
        }

        // 获取Inject的值
        const injectName = getInjectObj(result, key);
        if (injectName) {
          const injectedBean = getBean(injectName);
          Reflect.defineProperty(result, key, {
            value: injectedBean
          });
        }

        // 如果沒有裝飾器情況
        if (!injectValue && !injectName) {
          const value = Reflect.get(bean, key);
          Reflect.defineProperty(result, key, {
            value
          });
        }
      })

      return result as object;
    };

    return getBean;
  }

  private isInjectable(bean: object) {
    const isInjectable = Reflect.getMetadata("injectable", bean) as boolean;
    return isInjectable;
  }
}

export function beanFactoryConfig(jsonConfig: unknown) {
  return new BeanFactory(jsonConfig as object);
}