const sanitizeHtml = require('sanitize-html');

module.exports = function (context) {
  var name = ""
  for (var parm in context.data.root.query) {
    name = name+context.data.root.query[parm]
  }
  name = sanitizeHtml(name)
  name = name ? name : "Stranger"
//  console.log("Helper Context: ", context.data.root.query)
  
  return name;
};