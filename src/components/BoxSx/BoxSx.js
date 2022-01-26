import * as React from "react";
import Box from "@mui/material/Box";
import "./BoxSx.css";

export default function BoxSx() {
  return (
    <div>     
      <Box
        sx={{
          center:'center',
          width: '100%',
          height: 300,
          backgroundColor: "primary",
        }}
      >
        <p>Automedical</p>
      </Box>
    </div>
  );
}
