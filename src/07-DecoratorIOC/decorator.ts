import 'reflect-metadata'

/**
 * 标记该类可注入属性
 * @returns
 */
export function Injectable(): ClassDecorator {
  return target => {
    Reflect.defineMetadata("injectable", true, target);
  }
}

/**
 * 为属性赋值
 * @param value 
 * @returns 
 */
export function InjectValue(value: unknown) {
  return Reflect.metadata("injectValue", value);
}

/**
 * 
 * @param value 属性注入实例
 * @returns 
 */
export function Inject(value: unknown) {
  return Reflect.metadata("inject", value);
}