import React from "react";

import LineChart from "./Chart/LineChart";

export default function Summary({ report }) {
    return (
        <div className="row">
            <div className="col">
                <LineChart data={report} />
            </div>
        </div>
    );
}
