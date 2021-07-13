import React, { useState, useEffect, useMemo } from "react";
import "@fontsource/roboto";
import { sortBy } from "lodash";

import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

import { getCountries } from "./apis";
import { getReportByCountry } from "./apis";

function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState("");
    const [report, setReport] = useState([]);

    useEffect(() => {
        getCountries().then((res) => {
            const countries = sortBy(res.data, "Country");
            setCountries(countries);
            setSelectedCountryId("vn");
        });
    }, []);

    const handleOnchange = (event) => {
        setSelectedCountryId(event.target.value);
    };

    useEffect(() => {
        if (selectedCountryId) {
            const { Slug } = countries.find(
                (country) => country.ISO2.toLowerCase() === selectedCountryId
            );
            getReportByCountry(Slug).then((res) => {
                res.data.pop();
                setReport(res.data);
            });
        }
    }, [countries, selectedCountryId]);

    const summary = useMemo(() => {
        if (report && report.length) {
            const latestData = report[report.length - 1];
            return [
                {
                    title: "Confirmed",
                    count: latestData.Confirmed,
                    type: "confirmed",
                },
                {
                    title: "Recovered",
                    count: latestData.Recovered,
                    type: "recovered",
                },
                {
                    title: "Death",
                    count: latestData.Deaths,
                    type: "death",
                },
            ];
        }
        return [];
    }, [report]);

    return (
        <div className="App container">
            <Header />
            <CountrySelector
                value={selectedCountryId}
                countries={countries}
                handleOnchange={handleOnchange}
            />
            <Highlight summary={summary} />
            <Summary report={report} />
        </div>
    );
}

export default App;
