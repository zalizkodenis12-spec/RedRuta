const fs = require('fs');

function fixSyntax(file) {
  try {
    let js = fs.readFileSync(file, 'utf8');
    js = js.replace(/\\`/g, '`');
    js = js.replace(/\\\${/g, '${');
    fs.writeFileSync(file, js, 'utf8');
    console.log('Fixed ' + file);
  } catch(e) {
    console.error('Error fixing ' + file, e);
  }
}

fixSyntax('d:/Мої сайти/D&Dflovers_n_cofee-site/assets/js/products.js');
fixSyntax('d:/Мої сайти/D&Dflovers_n_cofee-site/assets/js/cart.js');
