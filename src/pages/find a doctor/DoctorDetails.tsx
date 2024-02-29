import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ViewDetails from "../../components/viewDetails/ViewDetails";

function DoctorDetails() {
  const { state } = useLocation();

  useEffect(() => {
    console.log(state.doctor);
  }, [state]);

  return (
    <div>
      <ViewDetails fetchedData={state.doctor} />
    </div>
  );
}

export default DoctorDetails;
