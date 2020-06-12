import * as React from "react";
import { Box, Stack } from "@chakra-ui/core";
import ProductiveDays from "../component/ProductiveDays";
import TotalProductivity from "../component/TotalProductivity";
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
    return (
      <Stack isInline align="center">
        {this.state.data ? (
          <>
            <Box bg="grey" flex="1" p={4} color="white">
              <ProductiveDays data={this.state.data} />
            </Box>
            <Box bg="grey" flex="1" p={4} color="white">
              <TotalProductivity data={this.state.data} />
            </Box>
          </>
        ) : null}
      </Stack>
    );
  }
}
