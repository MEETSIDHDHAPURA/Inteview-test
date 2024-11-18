import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const ShowData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const renderData = (fields, indent = 0) => {
    return fields.map((field) => (
      <Box
        key={field.id}
        sx={{
          ml: indent * 2,
          mt: 2,
          p: 2,
          bgcolor: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Typography variant="body1">
          <strong>Type </strong> {field.type}
        </Typography>
        <Typography variant="body1">
          <strong>Value</strong> {field.value}
        </Typography>
        {field.children && field.children.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Children
            </Typography>
            {renderData(field.children, indent + 1)}
          </Box>
        )}
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        bgcolor: "#F0F4F8",
        p: 4,
        overflowY: "auto",
        color: "black",
      }}
    >
      <Typography variant="h5" sx={{ mb:2, color: "#333" }}>
        Display Stored Data
      </Typography>
      {data && data.length > 0 ? (
        renderData(data)
      ) : (
        <Typography variant="h6" color="textSecondary">
          No data available. Please add some data first.
        </Typography>
      )}
    </Box>
  );
};

export default ShowData;
