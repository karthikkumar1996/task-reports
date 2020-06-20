import * as React from "react";
import { Box, Stack } from "@chakra-ui/core";
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
            <Box bg="grey" flex="1" p={4} color="white">
              <ProductiveDays data={JSON.parse(JSON.stringify(data))} />
            </Box>
            <Stack isInline spacing={0} align="center">
              <Box bg="grey" flex="1" p={4} marginRight={0} color="white">
                <TotalProductivity data={JSON.parse(JSON.stringify(data))} />
              </Box>
              <Box bg="grey" flex="1" p={4} color="white">
                <MonthlyProductivity data={JSON.parse(JSON.stringify(data))} />
              </Box>
            </Stack>
          </>
        ) : null}
      </>
    );
  }
}
