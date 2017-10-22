var fs = require('fs');
var filenamesObj = JSON.stringify({});

fs.readdir('./template/default/card', function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var count = files.length;
  var results = {};
  var filenames = [];
  files.forEach(function (filename) {
    var regAtomFile = /.+\.atom.html/;
    if (regAtomFile.test(filename)) {
      filenames.push(filename);
    }
  });

  console.log(filenames.join(';'));

  filenamesObj = JSON.parse(filenamesObj);

  filenamesObj['card'] = filenames;

  filenamesObj = JSON.stringify(filenamesObj);

  fs.writeFile('filename.txt', filenamesObj, (err) => {
    if (err) {
      throw err;
    }
    console.log('It\'s saved!');
  });

});


fs.readdir('./template/default/resource_v2', function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  var count = files.length;
  var results = {};
  var filenames = [];
  files.forEach(function (filename) {
    var regAtomFile = /.+\.atom.html/;
    if (regAtomFile.test(filename)) {
      filenames.push(filename);
    }

  });

  console.log(filenames.join(';'));

  filenamesObj = JSON.parse(filenamesObj);

  filenamesObj['resource_v2'] = filenames;

  filenamesObj = JSON.stringify(filenamesObj);

  fs.writeFile('filename.txt', filenamesObj, (err) => {
    if (err) {
      throw err;
    }
    console.log('It\'s saved!');
  });
});