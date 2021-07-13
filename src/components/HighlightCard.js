import React from "react";
import CountUp from "react-countup";

export default function HighlightCard({ title, count, type }) {
    return (
        <div className="col-12 col-md-4">
            <div
                id={type}
                className="card text-dark bg-light mb-3"
                style={{ maxWidth: "100%" }}
            >
                <div className="card-header">{title}</div>
                <div className="card-body">
                    <h5 className="card-title">
                        <CountUp start={0} end={count} separator=" " />
                    </h5>
                </div>
            </div>
        </div>
    );
}
