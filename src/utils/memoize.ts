
// Простая функция мемоизации для кэширования результатов тяжелых вычислений
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<string, R>();
  
  return (arg: T) => {
    const key = JSON.stringify(arg);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(arg);
    cache.set(key, result);
    return result;
  };
}
