/**
 * 物件深度拷貝
 * @param obj 物件資料
 * @returns 深度拷貝後的物件資料
 */
export const safeDeepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

/**
 * 複製物件(可指定欄位)
 * @description 如有指定欄位就複製指定欄位；否則複製所有欄位(深層複製）
 *
 * @template T 來源物件的型別
 * @template K 欄位名稱的型別 (必須是 T 中的鍵)
 * @param sourceObj 來源物件
 * @param fieldList [fieldList=[]] 要複製的欄位名稱陣列
 * @returns 包含複製欄位的目標物件
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const copyObjectFieldList = <T extends StringMap<any>, K extends keyof T = keyof T>(
  sourceObj: T,
  fieldList: K[] = [],
): Partial<Pick<T, K>> => {
  const defaultObj = {} as Partial<Pick<T, K>>;
  if (!sourceObj || typeof sourceObj !== 'object') return defaultObj;

  if (fieldList.length === 0) return safeDeepClone(sourceObj);

  const sourceObjKeyList = Object.keys(sourceObj) as Array<K>;

  return sourceObjKeyList.reduce((acc, sourceObjKey) => {
    if (fieldList.includes(sourceObjKey)) acc[sourceObjKey] = sourceObj[sourceObjKey];
    return acc;
  }, defaultObj);
};
