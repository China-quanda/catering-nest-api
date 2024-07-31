/**
 * 生成一个范围在[min, max]之间的随机整数
 * @param min 
 * @param max 
 * @returns 
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * js生成随机字符串
 * @param length 长度
 * @returns 
 * @example generateRandomString(8); // 输出类似 "Bd9f2AeW"
 */
export function generateRandomString(length:number):string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}
 
