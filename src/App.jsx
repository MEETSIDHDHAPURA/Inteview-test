import { Box } from "@mui/material";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import ShowData from "./components/ShowData";

const App = () => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <AddItem />
        <ShowData />
      </Box>
    </Box>
  );
};

export default App;
