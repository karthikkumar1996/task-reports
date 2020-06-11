import * as React from "react";
import { Box } from "@chakra-ui/core";
import ProductiveDays from "../component/ProductiveDays";

export interface ReportsProps {}
export interface ReportsState {}

export default class Reports extends React.Component<
  ReportsProps,
  ReportsState
> {
  constructor(props: ReportsProps) {
    super(props);
  }

  render() {
    return (
      <>
        <Box bg="grey" w="100%" p={4} color="white">
          <ProductiveDays />
        </Box>
      </>
    );
  }
}
