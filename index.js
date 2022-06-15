const _ = require("lodash")

const result  = _.partition([1,2,3,4,5,6], (a) => a > 2)

console.log(result);