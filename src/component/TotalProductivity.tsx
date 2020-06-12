import * as React from "react";

const Highcharts = require("highcharts/highstock");

export interface ReportsProps {
  data: any;
}

export interface ReportsState {}

export default class TotalProductivity extends React.Component<
  ReportsProps,
  ReportsState
> {
  componentDidMount = () => {
    this.createBarChart(this.props.data);
  };

  seriesDataGenerator = (dataToReport) => {
    let results: any = { yellow: 0, blue: 0, green: 0 };

    dataToReport.forEach((item) => {
      results[item.type] += 1;
    });

    return results;
  };

  createBarChart = (data) => {
    let dataToReport = data.cards.filter((item) => item.dueComplete === true);

    dataToReport.forEach((element) => {
      element.type = element.labels[0].color;
    });

    dataToReport = this.seriesDataGenerator(dataToReport);

    Highcharts.setOptions({
      colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7,
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.3).get("rgb")], // darken
          ],
        };
      }),
    });

    // Build the chart
    Highcharts.chart("container2", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Total Productivity",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            connectorColor: "silver",
          },
        },
      },
      series: [
        {
          name: "Share",
          data: [
            { name: "Work", y: dataToReport.yellow },
            { name: "Personal Development", y: dataToReport.green },
            { name: "Misc.", y: dataToReport.blue },
          ],
        },
      ],
    });
  };

  render() {
    return <div id="container2" />;
  }
}
