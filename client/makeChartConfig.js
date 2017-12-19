function convertData(date) {
  //Mon Dec 18 2017 15:22:15 GMT-0600 (CST)
  var year = date.split(" ")[3];
  var month = date.split(" ")[1];
  month = new Date(Date.parse(month + " 1, 2017")).getMonth();
  var day = date.split(" ")[2];
  return [Number(year), month, Number(day)];
}

export function makeChartConfig (data, handlePointClick) {
  const graphData = [];
  for (let i = 0; i < data.length; i += 1) {
    graphData.push({
      id: data[i]._id,
      x: Date.UTC(convertData(data[i].time)[0], convertData(data[i].time)[1], convertData(data[i].time)[2]), 
      y: data[i].heartBeat
    });
  }
  const config = {
    title: {
      text: 'Heartbeat History'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Heartbeat'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function (e) {
              handlePointClick(this.id)
            }
          }
        },
        marker: {
          lineWidth: 1
        }
      }
    },
    series: [{
      name: 'Heartbeat',
      type: 'line',
      data: graphData,
      pointPadding: 0,
      groupPadding: 0,
      pointPlacement: 'between',
      color: '#f1a781'
    }]
  };

  return config;
};