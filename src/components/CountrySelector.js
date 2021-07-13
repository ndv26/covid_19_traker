import React from "react";

export default function CountrySelector({ value, handleOnchange, countries }) {
    return (
        <div style={{ width: "250px" }}>
            <label className="mb-2" htmlFor="country-selector">
                Countries
            </label>
            <select
                id="country-selector"
                className="form-select form-select-sm"
                aria-label="Default select example"
                value={value}
                onChange={handleOnchange}
            >
                {countries.map((country, index) => {
                    return (
                        <option key={index} value={country.ISO2.toLowerCase()}>
                            {country.Country}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
