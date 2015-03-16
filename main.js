var data = [
  ['John', 'Jacob', 'Smith', '']
];

var container = document.getElementById('hot');
init();

function button() {
  console.log(hot.getData());
  data = hot.getData();
  var e = document.getElementById('option');
  var option = e.options[e.selectedIndex].value;
  var domain = document.getElementById('domain').value;
  for (var i in data) {
    var row = data[i];
    if (!isRowEmpty(row)) {
      row[0] = row[0] ? row[0].trim().toLowerCase().capitalize() : '';
      row[1] = row[1] ? row[1].trim().toLowerCase().capitalize() : '';
      row[2] = row[2] ? row[2].trim().toLowerCase().capitalize() : '';
      switch(option) {
        case "0":
          // [first name][last name]
          row[3] = row[0].toLowerCase() + row[2].toLowerCase() + '@' + domain;
          break;
        case "1":
          // [first name].[last name]
          row[3] = row[0].toLowerCase() + '.' + row[2].toLowerCase() + '@' + domain;
          break;
        case "2":
          // [last name].[first name]
          row[3] = row[2].toLowerCase() + '.' + row[0].toLowerCase() + '@' + domain;
          break;
        case "3":
          // [first initial][last name]
          row[3] = row[0].toLowerCase().charAt(0) + row[2].toLowerCase() + '@' + domain;
          break;
        case "4":
          // [last name][first initial]
          row[3] = row[2].toLowerCase() + row[0].toLowerCase().charAt(0) + '@' + domain;
          break;
        case "5":
          // [first name][middle initial][last name]
          row[3] = row[0].toLowerCase() + row[1].toLowerCase().charAt(0) + row[2].toLowerCase() + '@' + domain;
          break;
        case "6":
          // [first name].[middle initial].[last name]
          row[3] = row[0].toLowerCase() + '.' + row[1].toLowerCase().charAt(0) + '.' + row[2].toLowerCase() + '@' + domain;
          break;
        default:
      }
      data[i] = row;
    }
  }

  hot.destroy();
  init();
}

function init() {
  hot = new Handsontable(container,
  {
    data: data,
    minSpareRows: 1,
    colHeaders: ['First Name', 'Middle Name', 'Last Name', 'Email'],
    colWidths: [200, 200, 200, 200],
    contextMenu: true,
    cells : function(row, col, prop) {
      var cellProperties = {};

      if (col == 3) {
          cellProperties.readOnly = true;
      }
      else {
          cellProperties.readOnly = false;
      }

      return cellProperties;
    }
  });
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function isRowEmpty(row) {

  for (var i = 0, ilen = row.length; i < ilen; i++) {
    if (row[i] !== null) {
      return false;
    }
  }

  return true;
}