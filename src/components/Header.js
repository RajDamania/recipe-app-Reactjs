import React, { useState, useEffect, useRef } from "react";
import "./Header.css";

function Header(props) {
  const { onLoadedData } = props;
  const [filterData, setFilterData] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterData === inputRef.current.value) {
        const query =
          filterData.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${filterData}"`;

        fetch(process.env.FIREBASE_DB + query)
          .then((response) => response.json())
          .then((responseData) => {
            const loadedData = [];
            for (const key in responseData) {
              loadedData.push({
                id: key,
                title: responseData[key].title,
                ingredints: responseData[key].ingredints,
                process: responseData[key].process,
              });
            }
            onLoadedData(loadedData);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filterData, onLoadedData, inputRef]);

  return (
    <>
      <div className="headerContainer">
        <div className="search-input">
          <input
            type="text"
            ref={inputRef}
            value={filterData}
            onChange={(event) => setFilterData(event.target.value)}
            placeholder="Search Recipe..."
          />
        </div>
        <h1>Recipe Keeper</h1>
      </div>
    </>
  );
}

export default Header;
