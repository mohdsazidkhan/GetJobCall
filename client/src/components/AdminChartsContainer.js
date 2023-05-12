import React, { useState } from "react";

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";

const AdminChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyJobsData: jdata, monthlyCompaniesData: cdata, monthlyUsersData: udata } = useAppContext();
  return (
    <>
      <Wrapper>
        <h4>Monthly Jobs</h4>
        <button type="button" onClick={() => setBarChart(!barChart)}>
          {barChart ? "Area Chart" : "Bar Chart"}
        </button>
        {barChart ? <BarChart data={jdata} /> : <AreaChart data={jdata} />}
      </Wrapper>
      <Wrapper>
        <h4>Monthly Companies</h4>
        <button type="button" onClick={() => setBarChart(!barChart)}>
          {barChart ? "Area Chart" : "Bar Chart"}
        </button>
        {barChart ? <BarChart data={cdata} /> : <AreaChart data={cdata} />}
      </Wrapper>
      <Wrapper>
        <h4>Monthly Users</h4>
        <button type="button" onClick={() => setBarChart(!barChart)}>
          {barChart ? "Area Chart" : "Bar Chart"}
        </button>
        {barChart ? <BarChart data={udata} /> : <AreaChart data={udata} />}
      </Wrapper>
    </>
  );
};

export default AdminChartsContainer;
