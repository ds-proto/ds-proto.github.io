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
    return null;
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
  var cat = appstate.bubble_instant.responses[5]; // 5 == health and pop
  var index = appstate.bubble_instant.predictors[0]; // 5 == hdi
  d3.csv("data/merged_with_coordinates.csv", function(dataset) {
    var spendingOnly = dataset.map(function (obj) {
      return obj[cat];
    });
    var hdiVals = dataset.map(function (obj) {
      return obj[index];
    });

    var minSpending = Math.min.apply(null, spendingOnly),
        maxSpending = Math.max.apply(null, spendingOnly),
        minIndex = Math.min.apply(null, hdiVals),
        maxIndex = Math.max.apply(null, hdiVals),
        mapData = {};

    // function to determine shading of country
    var paletteScale = d3.scale.linear()
          .domain([minIndex, maxIndex])
          .range(["#EFEFFF","#00254A"]); // dark dark blue

    // function to determine size of bubbles
    var bubbleScale = d3.scale.linear()
          .domain([minSpending, maxSpending])
          .range([2, 50]);

    var mapBubbles = [];

    dataset.forEach(function(item) {
      // item is one record
      var countryCode = item["ISO3166A3"],
          expenditure = item[cat],
          countryName = item["Country"],
          lat = item["latitude"],
          lon = item["longitude"],
          predictor = item[index];
      var shade = paletteScale(predictor);
      mapData[countryCode] = {
        name: countryName,
        indicator: predictor,
        spending: expenditure,
        fillColor: shade
      };
      var r = bubbleScale(expenditure);
      if (r > 1) {
        mapBubbles.push({
          name: countryName,
          spending: expenditure,
          indicator: predictor,
          latitude: lat,
          longitude: lon,
          radius: r
        });
      }
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
          popupTemplate: function(geo, data) {
            // don't show tooltip if country isn't present in dataset
            if (!data) {
              return ['<div class="hoverinfo">',
                '<strong>', geo.name || geo.properties.name, '</strong>',
                '<br>No Data',
                '</div>'].join('');
            }
            // tooltip content
            return ['<div class="hoverinfo">',
                '<strong>', data["name"], '</strong>',
                '<br>', cat, ' Spending: <strong>$', numberWithCommas(data["spending"]), '</strong>',
                '<br>', index, ':<strong> ', data["indicator"], '</strong>',
                '</div>'].join('');
          }
      },
      bubblesConfig: {
        fillOpacity: 0.5,
        defaultFill: '#000000',
        highlightFillOpacity: 0.7,
        // highlightFillColor: '#ABDDA4',
        // highlightBorderColor: '#F5F5F5',
        // show desired information in tooltip
        popupTemplate: function(geo, data) {
        // don't show tooltip if country isn't present in dataset
        if (!data) {
          return ['<div class="hoverinfo">',
            '<strong>', geo.name || geo.properties.name, '</strong>',
            '<br>No Data',
            '</div>'].join('');
        }
        // tooltip content
        return ['<div class="hoverinfo">',
            '<strong>', data["name"], '</strong>',
            '<br>', cat, ' Spending: <strong>$', numberWithCommas(data["spending"]), '</strong>',
            '<br>', index, ':<strong> ', data["indicator"], '</strong>',
            '</div>'].join('');
        }
      }
    }); //new Datamap
    heatmap.bubbles(mapBubbles.sort(function (a,b) {
      return b.radius - a.radius;
    }));
  }); //d3.csv
}

init(appstate);
var svgYearTotals = dimple.newSvg("#chart6", width, height);
d3.csv("data/year_totals.csv", function (data) {
   var myChart = new dimple.chart(svgYearTotals, data);
   var x = myChart.addCategoryAxis("x", "Year");
   var y = myChart.addMeasureAxis("y", "Cost");
   var z = myChart.addSeries("Expenditure", dimple.plot.line);
   myChart.defaultColors = opaqueColors(appstate.defaultColors);
   myChart.addLegend(width - 100, 20, 90, 300, "right");
   myChart.draw();
   y.titleShape.text("Money Spent ($)");
});
var svgPie = dimple.newSvg("#chart2", width, height);
d3.csv("data/totals.csv", function (data) {
   var myChart = new dimple.chart(svgPie, data);
   myChart.addMeasureAxis("p", "Cost");
   myChart.addSeries("Category", dimple.plot.pie);
   myChart.addLegend(0, 20, 90, 300, "left");
   myChart.draw();
});
createMap();
