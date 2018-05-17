/**
 * Created Date: Tuesday, October 31st 2017, 3:01:08 pm
 * Author: yugasun
 * Email: yuga.sun.bj@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2017 yugasun
 */

async function Sleep (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time)
    }, time * 1000)
  })
}

module.exports = {
  Sleep: Sleep
}
