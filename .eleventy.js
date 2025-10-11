const { flattenDeep } = require("lodash");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Add 'flatten' filter
  eleventyConfig.addNunjucksFilter("flatten", arr => flattenDeep(arr));

  // Add 'map' filter
  eleventyConfig.addNunjucksFilter("map", function(arr, property) {
    if (!Array.isArray(arr)) return [];
    return arr.map(item => property.split('.').reduce((obj, key) => obj?.[key], item));
  });

  // 🔹 Add 'date' filter (formats JS Date to readable string)
  eleventyConfig.addNunjucksFilter("date", function(dateObj, format = "dd LLL yyyy") {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // Passthrough static files
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("legacy");

  // Notes collection
  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/notes/*.md").sort((a,b) => {
      const da = a.data.date ? new Date(a.data.date) : new Date(0);
      const db = b.data.date ? new Date(b.data.date) : new Date(0);
      return db - da;
    });
  });

  // Assets passthrough
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    passthroughFileCopy: true
  };
};
