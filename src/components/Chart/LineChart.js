import HighchartsReact from "highcharts-react-official";
import Highchart from "highcharts";
import moment from "moment";
import classNames from "classnames";
import React, { useState, useEffect } from "react";

const generateOptions = (data) => {
    const categories = data.map((item) =>
        moment(item.Date).format("DD/MM/YYYY")
    );

    return {
        chart: {
            height: 500,
        },
        title: {
            text: "Tổng ca nhiễm",
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ["#F3585B"],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: "right",
            },
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
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
                name: "Tổng Ca nhiễm",
                data: data.map((item) => item.Confirmed),
            },
        ],
    };
};

function LineChart({ data }) {
    const [options, setOptions] = useState({});
    const [filter, setFilter] = useState("");

    useEffect(() => {
        let customData = [];
        // check filter
        switch (filter) {
            case "all": {
                customData = data;
                break;
            }
            case "30": {
                customData = data.slice(data.length - 30);
                break;
            }
            case "7": {
                customData = data.slice(data.length - 7);
                break;
            }
            default: {
                customData = data;
            }
        }
        setOptions(generateOptions(customData));
    }, [data, filter]);

    return (
        <div>
            <div className="button-group-filter mb-4">
                <button
                    type="button"
                    className={classNames("btn", "btn-outline-danger", {
                        active: filter === "all",
                    })}
                    onClick={() => setFilter("all")}
                >
                    Tất cả
                </button>
                <button
                    type="button"
                    className={classNames("btn", "btn-outline-danger", {
                        active: filter === "30",
                    })}
                    onClick={() => setFilter("30")}
                >
                    30 ngày
                </button>
                <button
                    type="button"
                    className={classNames("btn", "btn-outline-danger", {
                        active: filter === "7",
                    })}
                    onClick={() => setFilter("7")}
                >
                    7 ngày
                </button>
            </div>
            <HighchartsReact hightcharts={Highchart} options={options} />
        </div>
    );
}

export default React.memo(LineChart);
