import * as React from "react";
import {Box, Stack} from "@chakra-ui/core";
import ProductiveDays from "../component/ProductiveDays";
import TotalProductivity from "../component/TotalProductivity";

export interface ReportsProps {
}

export interface ReportsState {
}

export default class Reports extends React.Component<ReportsProps,
    ReportsState> {
    constructor(props: ReportsProps) {
        super(props);
    }

    render() {
        return (
            <Stack isInline align="center">
                <Box bg="grey" flex="1" p={4} color="white">
                    <ProductiveDays/>
                </Box>
                <Box bg="grey" flex="1" p={4} color="white">
                    <TotalProductivity/>
                </Box>
            </Stack>
        );
    }
}
