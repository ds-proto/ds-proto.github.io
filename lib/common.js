var appstate = {  bubble_span: {
    predictor: '2000-2014 Health and Population',
    predictors: [
      '2000-2014 Agriculture',
      '2000-2014 Commodity Assistance',
      '2000-2014 Economic Growth',
      '2000-2014 Education',
      '2000-2014 Governance',
      '2000-2014 Health and Population',
      '2000-2014 Humanitarian',
      '2000-2014 Infrastructure',
      '2000-2014 Other'
    ],

    response: '2000-2013 HDI Increase',
    responses: [
      '2000-2013 Life Expectancy Increase',
      '2000-2013 Education Index Increase',
      '2000-2013 Mean Years of Schooling Increase',
      '2000-2013 Income Index Increase',
      '2000-2013 GNI per Capita Increase',
      '2000-2013 HDI Increase'
    ]
  },

  bubble_instant: {
    predictor: '2013 Life Expectancy',
    predictors: [
      "2013 Life Expectancy",
      "2013 Education Index",
      "2013 Mean Years of Schooling",
      "2013 Income Index",
      "2013 GNI per Capita",
      "2013 HDI"
    ],

    response: '2014 Health and Population',
    responses: [
      '2014 Agriculture',
      '2014 Commodity Assistance',
      '2014 Economic Growth',
      '2014 Education',
      '2014 Governance',
      '2014 Health and Population',
      '2014 Humanitarian',
      '2014 Infrastructure',
      '2014 Other'
    ]
  },

  width: 1200,
  height: 800,
  data: 'data/merged_aid.csv',
  defaultColors: [
    new dimple.color("#DB5A6B","#C93756", 0.65), // gray
    new dimple.color("#2ABB9B","#16A085", 0.65), // turquoise
    new dimple.color("#FCC9B9","#FFB3A7", 0.65),  // magenta
    new dimple.color("#D2D7D3","#757D75", 0.65), // yellow
    new dimple.color("#CF3A24","#C3272B", 0.65), // red
    new dimple.color("#4B77BE","#044F67", 0.65), // blue
    new dimple.color("#407A52","#006442", 0.65), // green
    new dimple.color("#875F9A","#5D3F6A", 0.65), // purple
    new dimple.color("#F5AB35","#CA6924", 0.65), // yellow
    new dimple.color("#FAA945","#FFB61E", 0.65), // orange
  ]

};


var width = appstate.width;
var height = appstate.height;

function opaqueColors(colors) {
  return colors.map(function (color) {
    return new dimple.color(color.fill, color.stroke, 1);
  });
}

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
    myChart.addLegend(250, 10, 500, 70, "right");
    myChart.defaultColors = appstate.defaultColors;
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

function validRecord (state, record) {
  return record[state.response] != "" && record[state.predictor] != "";
}

function removeYear(text)
{
  return text.replace(/\d{4}-\d{4}/g,'');
}

function createList(state, list_id, selected_key, list_elements_key, axis, myChart, data)
{
  d3.select(list_id)
    .selectAll('li')
    .data(state[list_elements_key])
    .enter()
    .append('li')
    .text(removeYear)
    .classed('selected', function (d) {
      return d === state[selected_key];
    })
    .on('click', function (d) {
      state[selected_key] = d;
      updateList(list_id, state[selected_key]);
      myChart.axes[axis].measure = state[selected_key];
      myChart.data = data.filter(function (record) {
        return validRecord(state, record);
      });
      myChart.draw(600);
    });
}

function init(state) {
  createBubble(state.data,
               'span-main-chart',
               state.width,
               state.height,
               state.bubble_span.predictor,
               state.bubble_span.response,
               "2014 Population",
               ["Country","Region"],
               function (myChart, data, x, y, z) {
                 myChart.draw();
                 createList(state.bubble_span, '#span-predictor-list', 'predictor', 'predictors', 0, myChart, data);
                 createList(state.bubble_span, '#span-response-list', 'response', 'responses', 1, myChart, data);
               });

  createBubble(state.data,
               'instant-main-chart',
               state.width,
               state.height,
               state.bubble_instant.predictor,
               state.bubble_instant.response,
               "2014 Population",
               ["Country","Region"],
               function (myChart, data, x, y, z) {
                 myChart.draw();
                 createList(state.bubble_instant, '#instant-predictor-list', 'predictor', 'predictors', 0, myChart, data);
                 createList(state.bubble_instant, '#instant-response-list', 'response', 'responses', 1, myChart, data);
               });
}
