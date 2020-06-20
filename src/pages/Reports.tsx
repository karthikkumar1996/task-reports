import * as React from "react";
import { ProductiveDays } from "../component/ProductiveDays";
import TotalProductivity from "../component/TotalProductivity";
import { MonthlyProductivity } from "../component/MonthlyProductivity";
const axios = require("axios").default;

export interface ReportsProps {}

export interface ReportsState {
  data: any;
}

export default class Reports extends React.Component<
  ReportsProps,
  ReportsState
> {
  constructor(props: ReportsProps) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount = () => {
    axios
      .get("https://trello.com/b/4BfHssxg.json")
      .then((Response) => {
        this.setState({ data: Response.data });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const data = this.state.data;
    return (
      <>
        {this.state.data ? (
          <>
            <div className="m-4">
              <ProductiveDays data={JSON.parse(JSON.stringify(data))} />
            </div>
            <div className="d-flex justify-content-between m-4">
              <div className="p-2 w-50 mr-2">
                <TotalProductivity data={JSON.parse(JSON.stringify(data))} />
              </div>
              <div className="p-2 w-50">
                <MonthlyProductivity data={JSON.parse(JSON.stringify(data))} />
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
}
