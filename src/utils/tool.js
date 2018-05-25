const tagReg = /<\/?([^<|^>]*)>/g
/**
 * string cut
 *
 * @export
 * @param {any} value
 * @param {any} limit
 * @returns
 */
export function cutStr (value, limit) {
  if (!value) {
    return ''
  }
  value = '' + value
  // remove html tag
  value = value.replace(tagReg, '')
  let strLength = 0
  const strLen = value.length
  let strCut = ''
  for (let i = 0; i < strLen; i++) {
    const a = value.charAt(i)
    strLength++
    if (encodeURI(a).length > 4) {
      // 中文字符的长度经编码之后大于4
      strLength += 1
    }
    strCut = strCut.concat(a)
    if (strLength > limit) {
      strCut = strCut.concat('...')
      return strCut
    }
    if (strLength === limit) {
      return strCut
    }
  }

  // 如果给定字符串小于指定长度，则返回源字符串；
  if (strLength < limit) {
    return value
  }
}

/**
 * simple version deep copy
 * @param {Object} obj
 */
export function deepClone(obj) {
  // obj not contain special type like：undefined,NaN,function
  return JSON.parse(JSON.stringify(obj))
}

export function jsonProp (obj) {
  // type check
  if (!obj || (typeof obj !== 'object')) {
    return obj
  }
  Object.keys(obj).forEach((key) => {
    if ((typeof obj[key]) === 'object') {
      obj[key] = JSON.stringify(obj[key])
    }
  })
  return obj
}
