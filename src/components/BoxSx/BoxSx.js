import * as React from "react";
import Box from "@mui/material/Box";
import "./BoxSx.css";

export default function BoxSx() {
  return (
    <div>
      <br></br>
    <Box
      sx={{
        center:'center',
        width: '100%',
        height: 300,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <br>
      </br>
      <br>
      </br>
      <h1><p>Preciona iniciar sesion o Registrar</p></h1>

    </Box>
    </div>
  );
}
