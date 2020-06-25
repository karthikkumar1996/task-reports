import * as React from "react";
const _ = require("lodash");
const Highcharts = require("highcharts/highstock");

export interface ReportsProps {
  data: any;
}
export interface ReportsState {}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MonthlyProductivity: React.FunctionComponent<ReportsProps> = (
  props: ReportsProps
) => {
  React.useEffect(() => {
    createBarChart(props.data);
  });

  const seriesDataGenerator = (monthsForProcessing, dataToReport) => {
    let results: any = [];
    monthsForProcessing.forEach((item, index) => {
      results.push({ date: item, yellow: 0, blue: 0, green: 0 });
      dataToReport.forEach((data) => {
        if (
          item.month === monthNames[new Date(data.due).getMonth()] &&
          item.year === new Date(data.due).getFullYear().toString()
        ) {
          results[index][data.type] += 1;
        }
      });
    });

    return results;
  };

  const createBarChart = (data) => {
    let categories: Date[] = [];
    let dataToReport = data.cards.filter((item) => item.dueComplete === true);

    dataToReport.map((item) => categories.push(new Date(item.due)));

    let uniqueMonths = _.uniq(
      categories.map(
        (day) => monthNames[day.getMonth()] + ", " + day.getFullYear()
      )
    );
    uniqueMonths = _.reverse(uniqueMonths);

    const monthsForProcessing = uniqueMonths.map((item) => {
      return {
        month: item.split(", ")[0],
        year: item.split(", ")[1],
      };
    });

    dataToReport.forEach((element) => {
      element.type = element.labels[0].color;
    });

    let seriesData = seriesDataGenerator(monthsForProcessing, dataToReport);
    const workData = seriesData.map((item) => item["yellow"]);
    const pdData = seriesData.map((item) => item["green"]);
    const miscData = seriesData.map((item) => item["blue"]);
    const totalWork = seriesData.map(
      (item) => item["yellow"] + item["green"] + item["blue"]
    );

    Highcharts.chart("container3", {
      chart: {
        type: "areaspline",
      },
      title: {
        text: "Monthly Productivity",
      },
      legend: {
        layout: "vertical",
        align: "left",
        verticalAlign: "top",
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
      },
      xAxis: {
        categories: uniqueMonths,
      },
      yAxis: {
        title: {
          text: "Tasks",
        },
      },
      tooltip: {
        shared: true,
        valueSuffix: " units",
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "Total",
          data: totalWork,
          color: "#322659",
        },
        {
          name: "Office Tasks",
          data: workData,
          color: "#2A69AC",
        },
        {
          name: "Misc",
          data: miscData,
          color: "#F6AD55",
        },
        {
          name: "Personal development",
          data: pdData,
          color: "#38B2AC",
        },
      ],
    });
  };

  return <div id="container3"></div>;
};
