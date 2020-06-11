import * as React from "react";
import data from "./exported.json";
const _ = require("lodash");
const Highcharts = require("highcharts/highstock");

export interface ReportsProps {}
export interface ReportsState {
  data: any;
}

export default class ProductiveDays extends React.Component<
  ReportsProps,
  ReportsState
> {
  constructor(props: ReportsProps) {
    super(props);
    this.state = {
      data: data,
    };
  }
  componentDidMount = () => {
    this.createBarChart();
  };

  seriesDataGenerator = (formattedDates, dataToReport) => {
    let results: any = [];
    formattedDates.forEach((item, index) => {
      results.push({ date: item, yellow: 0, blue: 0, green: 0 });
      dataToReport.forEach((data) => {
        if (item === data.due) {
          results[index][data.type] += 1;
        }
      });
    });

    return results;
  };

  createBarChart = () => {
    let categories: Date[] = [];
    let dataToReport = this.state.data.cards.filter(
      (item) => item.dueComplete === true
    );

    dataToReport.map((item) =>
      categories.push(new Date(new Date(item.due).toDateString()))
    );

    const uniqueDates = _.uniqBy(categories, (date) => date.getTime());
    let formattedDates: string[] = [];
    uniqueDates.map((date) =>
      formattedDates.push(
        date
          .toLocaleDateString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
          .replace(/\//g, "-")
      )
    );
    formattedDates = _.reverse(formattedDates);

    dataToReport.forEach((element) => {
      element.due = element.due
        .split("T")[0]
        .replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1");
      element.type = element.labels[0].color;
    });

    let seriesData = this.seriesDataGenerator(formattedDates, dataToReport);
    const workData = seriesData.map((item) => item["yellow"]);
    const pdData = seriesData.map((item) => item["green"]);
    const miscData = seriesData.map((item) => item["blue"]);

    Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: {
        text: "Daily Productivity",
      },
      subtitle: {
        text: "Source: Trello Board",
      },
      xAxis: {
        categories: formattedDates,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Productivity",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "Office Tasks",
          color: "#2A69AC",
          data: workData,
        },
        {
          name: "Personal Development Tasks",
          color: "#38B2AC",
          data: pdData,
        },
        {
          name: "Misc Tasks",
          color: "#F6AD55",
          data: miscData,
        },
      ],
    });
  };
  render() {
    return <div id="container" />;
  }
}
