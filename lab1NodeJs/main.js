const fs = require('fs');
const helper = require('./helper');

extractData = (data) => {
   const [, , permission, ...options] = data;
   const extraxtedData = options.reduce((obj, elem) => {
      const [key, value] = elem.split('=');
      obj[key] = value;
      return obj;
   }, {})
   extraxtedData.command = permission;
   return extraxtedData;
}

checkFile = (path) => {
   if (!fs.existsSync(path)) {
      fs.writeFileSync(path, '[]');
   }
}
main = (cmdArgv) => {
   const data = extractData(cmdArgv);
   switch (data.command) {
      case 'add':
         console.log('command add');
         helper.add(data);
         return;
      case 'edit':
         console.log('command edit');
         helper.edit(data);
         return;
      case 'delete':
         console.log('command delete');
         helper.remove(data);
         return;
      default:
         return;
   }
}
checkFile('fileData.json');
main(process.argv);