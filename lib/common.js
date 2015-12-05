var appstate = {
  predictor: '2003-2012 Agriculture',
  predictors: [
    '2003-2012 Agriculture',
    '2003-2012 Commodity Assistance',
    '2003-2012 Economic Growth',
    '2003-2012 Education',
    '2003-2012 Governance',
    '2003-2012 Health and Population',
    '2003-2012 Humanitarian',
    '2003-2012 Infrastructure',
    '2003-2012 Other'
  ],

  response: '2000-2013 Life Expectancy Increase',
  responses: [
    '2000-2013 Life Expectancy Increase',
    '2000-2013 Education Index Increase',
    '2000-2013 Mean Years of Schooling Increase',
    '2000-2013 Income Index Increase',
    '2000-2013 GNI per Capita Increase',
    '2000-2013 HDI Increase'
  ],
  width: 1200,
  height: 800,
  data: 'data/merged_aid.csv'
};

var width = appstate.width;
var height = appstate.height;

function createBubble(data,
                      div_id,
                      width, height,
                      x_dim, y_dim, z_dim,
                      extra_dim,
                      callback)
{
  var div = document.getElementById(div_id);
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  var svg = dimple.newSvg('#' + div_id, width, height);
  d3.csv(data, function (data) {
    data = data.filter(function (record) {
      return record[x_dim] != "" && record[y_dim] != "" && record[z_dim] != "";
    });

    var myChart = new dimple.chart(svg, data);
    var x = myChart.addMeasureAxis("x", x_dim);
    var y = myChart.addMeasureAxis("y", y_dim);
    var z = myChart.addMeasureAxis("z", z_dim);
    myChart.addSeries(extra_dim, dimple.plot.bubble);
    myChart.addLegend(250, 10, 500, 50, "right");
    callback(myChart,x,y,z);
  });
}

function removeChildren(div) {
  while(div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function updateList(state, list_id, list_key, selected_key)
{
  var list = document.getElementById(list_id);
  removeChildren(list);
  var list_data = state[list_key];
  list_data.forEach(function (list_entry) {
    var list_entry_class = selected_key;
    if (list_entry == state[selected_key]) {
      list_entry_class += ' selected';
    }
    var newEntry = document.createElement('LI');
    newEntry.className = list_entry_class;
    newEntry.onclick = function () {
      appstate[selected_key] = list_entry;
      update(appstate);
    };
    newEntry.innerHTML = list_entry;
    list.appendChild(newEntry);
  });
}

function update(state) {
  createBubble(state.data,
               'main-chart',
               state.width,
               state.height,
               state.predictor,
               state.response,
               "2014 Population",
               ["Country","Region"],
               function (myChart, x, y, z) {
                 myChart.draw();
               });

  updateList(state, 'predictor-list', 'predictors', 'predictor')
  updateList(state, 'response-list', 'responses', 'response')
}

