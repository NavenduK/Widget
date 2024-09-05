import { Box } from "@mui/material";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Header />
      <Sidebar showSidebar={showSidebar} handleSidebar={handleSidebar} />
      <Dashboard handleSidebar={handleSidebar} />
    </Box>
  );
};

export default Home;
