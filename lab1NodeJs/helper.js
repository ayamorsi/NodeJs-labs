const fs = require('fs');

readFileJson = (path) => {
   const allData = fs.readFileSync(path);
   return JSON.parse(allData);
}
witeFileJson = (data) => {
   const jsonData = JSON.stringify(data);
   fs.writeFileSync('./fileData.json', jsonData);
}

exports.add = (response) => {
   let data = response;
   let fileData = readFileJson('./fileData.json');
   data.id = getLastId(fileData);
   data.checked = false;
   fileData.push(data);
   witeFileJson(fileData);
}

exports.edit = (data) => {
   let fileData = readFileJson('./fileData.json');
   let result;
   fileData.forEach((ele, index) => {
      if (ele.id == data.id) {
         editObject(fileData, data, index);
         result = `obj with id ${data.id} updated Succesfully`;
      } else {
         result = `obj with id ${data.id} not Exist`;
      }
   });
   console.log(result);
}

exports.remove = (data) => {
   let fileData = readFileJson('./fileData.json');
   let result = '';
   fileData.forEach((ele, index) => {
      if (ele.id == data.id) {
         result = `obj with id ${data.id} removed Succesfully`;
         fileData.splice(index, 1);
      } else {
         result = `obj with id ${data.id} not Exist`;
      }
   });
   console.log(result);
   witeFileJson(fileData);
}

editObject = (existData, newData, index) => {
   existData[index].title = newData.title;
   existData[index].body = newData.body;
   existData[index].checked = true;
   console.log(existData);
   witeFileJson(existData);
}

getLastId = (data) => {
   if (!data.length) {
      return 1;
   } else {
      let lastId = data[data.length - 1].id;
      return lastId + 1;
   }
} 
