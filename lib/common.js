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
  var svg = dimple.newSvg('#' + div_id, width, height);
  d3.csv(data, function (data) {
    clean_data = data.filter(function (record) {
      return record[x_dim] != "" && record[y_dim] != "" && record[z_dim] != "";
    });

    var myChart = new dimple.chart(svg, clean_data);
    var x = myChart.addMeasureAxis("x", x_dim);
    var y = myChart.addMeasureAxis("y", y_dim);
    var z = myChart.addMeasureAxis("z", z_dim);
    myChart.addSeries(extra_dim, dimple.plot.bubble);
    myChart.addLegend(250, 10, 500, 50, "right");
    var orig_data = JSON.parse(JSON.stringify(myChart.data));
    callback(myChart,orig_data,x,y,z);
  });
}

function updateList(list_id, selected)
{
  d3.select(list_id)
    .selectAll('li')
    .classed('selected', function (d) {
      return d === selected;
    });
}

function validRecord (record) {
  return record[appstate.response] != "" && record[appstate.predictor] != "";
}

function removeYear(text)
{
  var words = text.split(' ');
  words.shift();
  return words.join(' ');
}

function createList(list_id, selected_key, list_elements_key, axis, myChart, data)
{
  d3.select(list_id)
    .selectAll('li')
    .data(appstate[list_elements_key])
    .enter()
    .append('li')
    .text(removeYear)
    .classed('selected', function (d) {
      return d === appstate[selected_key];
    })
    .on('click', function (d) {
      appstate[selected_key] = d;
      updateList(list_id, appstate[selected_key]);
      myChart.axes[axis].measure = appstate[selected_key];
      myChart.data = data.filter(validRecord);
      myChart.draw(600);
    });
}

function init(state) {
  createBubble(state.data,
               'main-chart',
               state.width,
               state.height,
               state.predictor,
               state.response,
               "2014 Population",
               ["Country","Region"],
               function (myChart, data, x, y, z) {
                 myChart.draw();
                 createList('#predictor-list', 'predictor', 'predictors', 0, myChart, data);
                 createList('#response-list', 'response', 'responses', 1, myChart, data);
               });

}
