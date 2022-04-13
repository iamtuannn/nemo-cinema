import React from "react";
import { NEMO } from "../../utils/config";

export default function Dashboard() {
  document.title = `Dashboard - ${NEMO}`;
  return <div>Dashboard</div>;
}
