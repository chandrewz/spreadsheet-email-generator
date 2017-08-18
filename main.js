var data = [
  [
    'Last Name',
    'Middle Name',
    'First Name', 
    'Location',
    'Title',
    'Email',
    'School District',
    'State',
    'Regional Service Center',
    'Lead Source',
    'Lead Status',
    'Birthdate',
    'Hire Date',
    'Salary'
  ],
];

var container = document.getElementById('hot');
init();

function button() {
  console.log(hot.getData());
  data = hot.getData();
  var e = document.getElementById('option');
  var option = e.options[e.selectedIndex].value;
  var domain = document.getElementById('domain').value;
  var baseRow = data[0];
  var titles = document.getElementById('titles').value
  var titlesArray = titles.length > 0 ? titles.split(",").map(function(item) {
    return item.trim()
  }) : [];
  window.localStorage.titles = titles

  for (var i in data) {
    var row = data[i];
    if (!isRowEmpty(row)) {

      // name
      row[0] = row[0] ? row[0].trim().capitalize() : '';
      row[1] = row[1] ? row[1].trim().capitalize() : '';
      row[2] = row[2] ? row[2].trim().capitalize() : '';
      var firstName = row[2].toLowerCase().replace(/[^a-z]/gi,'');
      var middleName = row[1].toLowerCase().replace(/[^a-z]/gi,'');
      var lastName = row[0].toLowerCase().replace(/[^a-z]/gi,'');

      // location
      row[3] = row[3] ? row[3].trim().capitalize().replace(/[^\w\s]/gi, '') : '';

      // title
      row[4] = row[4] ? row[4].trim().capitalize() : '';

      // school district
      row[6] = data[0][6] ? data[0][6] : '';

      // state
      row[7] = data[0][7] ? data[0][7] : '';

      // Regional Service Center
      row[8] = data[0][8] ? data[0][8] : '';

      // Lead Source
      row[9] = data[0][9] ? data[0][9] : '';

      // Lead Status
      if (row[4] && titlesArray.length > 0 && titlesArray.indexOf(row[4])) {
        row[10] = 'Do Not Market'
      } else if (row[4] && data[0][10]) {
        row[10] = data[0][10]
      } else {
        row[10] = ''
      }

      var dateFormat = document.getElementById('date').value ? document.getElementById('date').value : 'MM/DD/YYYY';

      // dob
      row[11] = row[11] ? moment(row[11], dateFormat).format('MM/DD/YYYY') : '';

      // date of hire
      row[12] = row[12] ? moment(row[12], dateFormat).format('MM/DD/YYYY') : '';

      switch(option) {
        case "0":
          // [first name][last name]
          row[5] = firstName + lastName + '@' + domain;
          break;
        case "1":
          // [first name].[last name]
          row[5] = firstName + '.' + lastName + '@' + domain;
          break;
        case "2":
          // [last name].[first name]
          row[5] = lastName + '.' + firstName + '@' + domain;
          break;
        case "3":
          // [first initial][last name]
          row[5] = firstName.charAt(0) + lastName + '@' + domain;
          break;
        case "4":
          // [last name][first initial]
          row[5] = lastName + firstName.charAt(0) + '@' + domain;
          break;
        case "5":
          // [first name][middle initial][last name]
          row[5] = firstName + middleName.charAt(0) + lastName + '@' + domain;
          break;
        case "6":
          // [first name].[middle initial].[last name]
          if (middleName == '') {
            row[5] = firstName + '.' + lastName + '@' + domain;
          } else {
            row[5] = firstName + '.' + middleName.charAt(0) + '.' + lastName + '@' + domain;
          }
          break;
        case "7":
          // [first name][last initial]
          row[5] = firstName + lastName.charAt(0) + '@' + domain;
          break;
        case "8":
          // [first initial].[last name]
          row[5] = firstName.charAt(0) + '.' + lastName + '@' + domain;
          break;
        case "9":
          // [first name]_[last name]
          row[5] = firstName + '_' + lastName + '@' + domain;
          break;
        case "10":
          // [first initial][middle initial][last name]
          row[5] = firstName.charAt(0) + middleName.charAt(0) + lastName + '@' + domain;
          break;
        case "11":
          // lastnamefirstinitalmiddleinital
          row[5] = lastName + firstName.charAt(0) + middleName.charAt(0) + '@' + domain;
          break;
        case "12":
          // lastname firstname
          row[5] = lastName + firstName + '@' + domain;
          break;
        case "13":
          // lastname
          row[5] = lastName + '@' + domain;
          break;
        case "14":
          // lastname_firstname
          row[5] = lastName + '_' + firstName + '@' + domain;
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
  var cellWidth = screen.width / 14;

  hot = new Handsontable(container,
  {
    data: data,
    minSpareRows: 1,
    rowHeaders: true,
    colHeaders: [
      'Last Name',
      'Middle Name',
      'First Name', 
      'Location',
      'Title',
      'Email',
      'School District',
      'State',
      'Regional Service Center',
      'Lead Source',
      'Lead Status',
      'Birthdate',
      'Hire Date',
      'Salary'
      ],
    contextMenu: true,
    cells : function(row, col, prop) {
      var cellProperties = {};

      if (col == 5) {
          cellProperties.readOnly = true;
      }
      else {
          cellProperties.readOnly = false;
      }

      return cellProperties;
    },
    stretchH: 'all',
    copyRowsLimit: 10000,
    copyColsLimit: 10000
  });

  document.getElementById('titles').value = window.localStorage.titles ? window.localStorage.titles : ''
}

String.prototype.capitalize = function() {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function isRowEmpty(row) {

  for (var i = 0, ilen = row.length; i < ilen; i++) {
    if (row[i] !== null) {
      return false;
    }
  }

  return true;
}