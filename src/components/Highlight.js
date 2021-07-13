import React from "react";
import HighlightCard from "./HighlightCard";

export default function Highlight({ summary }) {
    return (
        <div className="row mt-4">
            {summary.map((item, index) => {
                return (
                    <HighlightCard
                        key={index}
                        title={item.title}
                        count={item.count}
                        type={item.type}
                    />
                );
            })}
        </div>
    );
}
