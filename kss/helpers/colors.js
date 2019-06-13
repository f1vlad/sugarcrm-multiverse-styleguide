module.exports = function (Handlebars) {
  'use strict';
  
  Handlebars.registerHelper('colorsCollection', function (doc, block) {
    var output = [];
    var regex = /^(\S+)\s*:\s*(\S+)(?:\s*-\s*(.*))?$/gm;
    var test;

    while ((test = regex.exec(doc)) !== null) {
      this.item = {};
      this.item.var = test[1];
      this.item.hex = test[2];
      output.push(block.fn(this));
    }

    return output.join('');
  });
};
