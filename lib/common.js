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
  ],

  labels: {
    '2000-2014 Agriculture': "US Money Spent on Country's Agriculture from 2000-2014 ($)",
    '2000-2014 Commodity Assistance': "US Money Spent on Country's Commodity Assistance from 2000-2014 ($)",
    '2000-2014 Economic Growth': "US Money Spent on Country's Economic Growth from 2000-2014 ($)",
    '2000-2014 Education': "US Money Spent on Country's Education from 2000-2014 ($)",
    '2000-2014 Governance': "US Money Spent on Country's Governance from 2000-2014 ($)",
    '2000-2014 Health and Population': "US Money Spent on Country's Health and Population from 2000-2014 ($)",
    '2000-2014 Humanitarian': "US Money Spent on Country's Humanitarian Efforts from 2000-2014 ($)",
    '2000-2014 Infrastructure': "US Money Spent on Country's Infrastructure from 2000-2014 ($)",
    '2000-2014 Other': "US Money Spent on Other Aid in Country from 2000-2014 ($)",
    '2000-2013 Life Expectancy Increase': "Country's Increase in Life Expectancy from 2000-2013 (years)",
    '2000-2013 Education Index Increase': "Country's Increase in its Education Index from 2000-2013",
    '2000-2013 Mean Years of Schooling Increase': "Country's Increase in Mean Years of Schooling from 2000-2013",
    '2000-2013 Income Index Increase': "Country's Increase in its Income Index from 2000-2013",
    '2000-2013 GNI per Capita Increase': "Country's Increase in GNI per Capita from 2000-2013",
    '2000-2013 HDI Increase': "Country's Increase in its Human Development Index from 2000-2013",
    "2013 Life Expectancy": "Country's Life Expectancy in 2013",
    "2013 Education Index": "Country's Education Index in 2013",
    "2013 Mean Years of Schooling": "Country's Mean Years of Schooling in 2013",
    "2013 Income Index": "Country's Income Index in 2013",
    "2013 GNI per Capita": "Country's GNI per Capita in 2013",
    "2013 HDI": "Country's Human Development Index in 2013",
    '2014 Agriculture': "US Money Spent on Country's Agriculture in 2014 ($)",
    '2014 Commodity Assistance': "US Money Spent on Country's Commodity Assistance in 2014 ($)",
    '2014 Economic Growth':  "US Money Spent on Country's Economic Growth in 2014 ($)",
    '2014 Education': "US Money Spent on Country's Education in 2014 ($)",
    '2014 Governance': "US Money Spent on Country's Governance in 2014 ($)",
    '2014 Health and Population': "US Money Spent on Country's Health and Population in 2014 ($)",
    '2014 Humanitarian': "US Money Spent on Country's Humanitarian Efforts in 2014 ($)",
    '2014 Infrastructure': "US Money Spent on Country's Infrastructure in 2014 ($)",
    '2014 Other': "US Money Spent on Other Aid in Country in 2014 ($)"
  },

  specialMins: {
    '2013 Life Expectancy': 40
  }

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
    x.overrideMin = calcMin(x_dim);
    var y = myChart.addMeasureAxis("y", y_dim);
    y.overrideMin = calcMin(y_dim);
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
  text = text.replace(/\d{4}-\d{4}/g,'');
  return text.replace(/\d{4}/g, '');
}

function calcMin(measure)
{
  if(appstate.specialMins[measure]) {
    return appstate.specialMins[measure];
  }
  else {
    return 0;
  }
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
      myChart.axes[axis].overrideMin = calcMin(myChart.axes[axis].measure);
      myChart.data = data.filter(function (record) {
        return validRecord(state, record);
      });
      myChart.draw(600);
      myChart.axes[0].titleShape.text(appstate.labels[myChart.axes[0].measure]);
      myChart.axes[1].titleShape.text(appstate.labels[myChart.axes[1].measure]);
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
                 x.fontSize="12px";
                 y.fontSize="12px";
                 z.tickFormat = ',.d';
                 myChart.draw();
                 x.titleShape.text(appstate.labels[x.measure]);
                 y.titleShape.text(appstate.labels[y.measure]);
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
                 x.fontSize="12px";
                 y.fontSize="12px";
                 z.tickFormat = ',.d';
                 myChart.draw();
                 x.titleShape.text(appstate.labels[x.measure]);
                 y.titleShape.text(appstate.labels[y.measure]);
                 createList(state.bubble_instant, '#instant-predictor-list', 'predictor', 'predictors', 0, myChart, data);
                 createList(state.bubble_instant, '#instant-response-list', 'response', 'responses', 1, myChart, data);
               });


}

// Heatmap
// modified http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\..*\b/, "");
}

function createMap() {
  // Create a choropleth
  var cat = appstate.bubble_instant.responses[5]; // 
  d3.csv("data/aid_FY2014_condensed.csv", function(dataset) {
    var valuesOnly = dataset.map(function(obj)
      { return obj[cat]; }
    );

    var minValue = Math.min.apply(null, valuesOnly),
        maxValue = Math.max.apply(null, valuesOnly),
        mapData = {};

    // function to determine shading of country
    var paletteScale = d3.scale.linear()
          .domain([minValue, maxValue])
          .range(["#EFEFFF","#00254A"]); // dark dark blue

    dataset.forEach(function(item) {
      // item is one record
      var countryCode = item["country_code"],
          expenditure = item[cat],
          countryName = item["name"];
      mapData[countryCode] = {
        name: countryName,
        spending: expenditure,
        fillColor: paletteScale(expenditure)
      };
    }); //forEach
    var heatmap = new Datamap({
      element: document.getElementById('heatmap'),
      fills: { defaultFill: '#F5F5F5' },
      data: mapData,
      geographyConfig: {
          borderColor: '#DEDEDE',
          highlightBorderWidth: 2,
          // don't change color on mouse hover
          highlightFillColor: function(geo) {
              return geo['fillColor'] || '#F5F5F5';
          },
          // only change border
          highlightBorderColor: '#B7B7B7',
          // show desired information in tooltip
          popupTemplate: function(geo, data) {
              // don't show tooltip if country isn't present in dataset
              if (!data) {
                return ['<div class="hoverinfo">',
                  '<strong>', geo.properties.name, '</strong>',
                  '<br>No Data',
                  '</div>'].join('');
              }
              // tooltip content
              return ['<div class="hoverinfo">',
                  '<strong>', geo.properties.name, '</strong>',
                  '<br>Spending: <strong>$', numberWithCommas(data["spending"]), '</strong>',
                  '</div>'].join('');
          }
      }
    }); //new Datamap
  }); //d3.csv
}

