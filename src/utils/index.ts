const tagReg = /<\/?([^<|^>]*)>/g;
/**
 * String cut
 *
 * @export
 * @param {any} value
 * @param {any} limit
 * @returns
 */
export function cutStr(value: string, limit: number): string {
    if (!value) {
        return '';
    }
    let result = `${value}`;
    // remove html tag
    result = result.replace(tagReg, '');
    let strLength = 0;
    const strLen = result.length;
    let strCut = '';
    for (let i = 0; i < strLen; i += 1) {
        const a = result.charAt(i);
        strLength += 1;
        if (encodeURI(a).length > 4) {
            // 中文字符的长度经编码之后大于4
            strLength += 1;
        }
        strCut = strCut.concat(a);
        if (strLength > limit) {
            strCut = strCut.concat('...');
            return strCut;
        }
        if (strLength === limit) {
            return strCut;
        }
    }

    // 如果给定字符串小于指定长度，则返回源字符串；
    if (strLength < limit) {
        return result;
    }
    return '';
}

/**
 * simple version deep copy
 * @param {Object} obj
 */
export function deepClone(obj: object) {
    // obj not contain special type like：undefined,NaN,function
    return JSON.parse(JSON.stringify(obj));
}

export function jsonProp(obj: any) {
    // type check
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    const res = Object.assign(obj);
    Object.keys(res).forEach((key) => {
        if (typeof obj[key] === 'object') {
            res[key] = JSON.stringify(obj[key]);
        }
    });
    return res;
}
