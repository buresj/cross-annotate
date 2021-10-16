const path = "/home/bures/Downloads/test.docx"

const mammoth = require("mammoth")
const fs = require("fs")

mammoth
  .convertToHtml({ path })
  .then(function (result) {
    var html = result.value // The generated HTML
    var messages = result.messages // Any messages, such as warnings during conversion
    fs.writeFileSync("index.html", html)
  })
  .done()
