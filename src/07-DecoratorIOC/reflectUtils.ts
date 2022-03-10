import 'reflect-metadata';

export interface jsonType {

} 

/**
 * 获取InjectValue的值
 * @param target 
 * @param valueName 
 * @param config 
 */
export function parseInjectValue(target: Object, property: string, jsonConfig?: object) {
  const injectValue = Reflect.getMetadata("injectValue", target, property);

  if (!injectValue) {
    return undefined;
  }

  const regPattern = /\$\{(.*)\}/;
  let result;

  if (regPattern.test(injectValue)) {
    if (!jsonConfig) {
      throw new Error("没有传入配置文件")
    }

    // 遍历时, 保存遍历对象
    let iterConfig = jsonConfig;

    const jsonProperty = RegExp.$1.trim();

    const propertyArr = jsonProperty.split(".");

    propertyArr.forEach(item => {
      result = Reflect.get(iterConfig, item);

      if (!result) {
        throw new Error("无法获取配置中的值, 请检查属性名是否正确")
      }
      iterConfig = result;
    })
  } else {
    result = injectValue;
  }

  return result as unknown;
}

/**
 * 
 * @param target 获取Inject装饰器的值
 * @param property 
 */
export function getInjectObj(target: Object, property: string) {
  const result = Reflect.getMetadata("inject", target, property);
  return result;
}