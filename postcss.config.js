const postcssNested = require('postcss-nested');
const postcssCssnext = require('postcss-cssnext');
const postcssCalc = require('postcss-calc');

module.exports = {
    plugins: [
        postcssNested(),
        postcssCssnext(),
        postcssCalc()
    ]
};
