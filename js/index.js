"use strict";

var alerts = [];
var chance = new Chance(); // a handy lib for generating random stuff
var total = 0;

// you can reduce this if you're feeling brave
var alertInterval = 500; // reduce this to 500 if you feel brave!

var createNewAlert = function createNewAlert() {
  // Choose random from details. Creates an array
  var company = chance.pickset(details.company, 2);
  // console.log(company);
  var companyDetail = "";
  // Iterate over this array
  var ugh = company.map(function (data) {
    companyDetail += " " + data;
  });
  return {
    title: chance.sentence({ words: 2 }),
    severity: chance.integer({ min: 1, max: 5 }),
    engineer: chance.pickone(['Maren', 'Martha', 'Aris', 'Emily']),
    description: chance.paragraph({ sentences: 2 }),
    avator: chance.avatar({ protocol: 'https' }),
    time: new Date().toLocaleTimeString(),
    total: total++,
    detail: companyDetail
  };
};
var tempData = ['Quantum', 'Systems', 'Aris', 'Mechanical', 'Engineering', 'School'];
var details = {
  company: tempData, // show us your creativity!
  department: 'Mechanical Engineering'
};
// show details. onClick event
var showDetails = function showDetails(key) {
  var desc = alerts[key].detail;
  var title = alerts[key].title;
  var mountNode = document.getElementById(key);
  var temp = React.createElement(
    "div",
    null,
    "I work at ",
    desc,
    " as a ",
    title
  );
  ReactDOM.render(temp, mountNode);
};

// (you need to make this a lot better)
var onAlert = function onAlert(alert) {

  // Create new alert here
  var newalert = createNewAlert();
  alerts.push(newalert);
  // Get the total
  var total = alerts.length;

  var el =
  // Iterate over the map and print stuff.
  alerts.map(function (item) {
    return React.createElement(
      "li",
      { key: item.total },
      "It is ",
      item.time,
      " now. I am ",
      item.engineer,
      "! ",
      React.createElement(
        "button",
        { style: { marginLeft: 100 }, onClick: function onClick() {
            return showDetails(item.total);
          } },
        "click me!"
      ),
      React.createElement("div", { id: item.total, style: { paddingTop: 10 } })
    );
  });
  var element = React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Alerts Total : ",
      total
    ),
    React.createElement(
      "ul",
      null,
      el
    )
  );

  // Render element
  ReactDOM.render(element, document.getElementById('root'));
};

// you probably don't need to edit this
var _interval = setInterval(function () {
  // const alert = createNewAlert();
  // alerts.push(alert);
  onAlert(alert);
}, alertInterval);