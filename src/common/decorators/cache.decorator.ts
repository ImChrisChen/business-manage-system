export function CacheDecorator(): MethodDecorator {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      return original.apply(this, args)
    }
    return descriptor
  }
}
