import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [blog, setBlog] = useState(false);
  const [about, setAbout] = useState(false);
  const [contact, setContact] = useState(false);
  const [career, setCareer] = useState(false);

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
          px: { xs: 2, md: 6 },
          background: "lightblue",
        }}
      >
        <Box
          sx={{
            height: { xs: "50px", md: "100px" },
            width: { xs: "100px", md: "400px" },
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <img
            alt=""
            src="https://cxl-web-prod-uploads.s3.amazonaws.com/public/filestore-uploads/27f0c3e906051948cf6a650b42b0227a5b69db06.png"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 5,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Box
                sx={{
                  position: "relative",
                  "&:hover > .dropdown": {
                    visibility: "visible",
                    opacity: 1,
                  },
                }}
                onMouseEnter={() => setAbout(true)}
                onMouseLeave={() => setAbout(false)}
              >
                <p>About</p>
                {about && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 10,
                      top: "100%",
                      left: 0,
                      background: "purple",
                      borderRadius: "12px",
                      opacity: about ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <ul style={{ margin: 0, padding: "30px", color: "white" }}>
                      <li>About Item 1</li>
                      <li>About Item 2</li>
                      <li>About Item 3</li>
                    </ul>
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  position: "relative",
                  "&:hover > .dropdown": {
                    visibility: "visible",
                    opacity: 1,
                  },
                }}
                onMouseEnter={() => setContact(true)}
                onMouseLeave={() => setContact(false)}
              >
                <p>Contact</p>
                {contact && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 10,
                      top: "100%",
                      left: 0,
                      background: "#9694FF",
                      borderRadius: "12px",
                      opacity: contact ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <ul style={{ margin: 0, padding: "30px", color: "white" }}>
                      <li>Contact Item 1</li>
                      <li>Contact Item 2</li>
                      <li>Contact Item 3</li>
                    </ul>
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  position: "relative",
                  "&:hover > .dropdown": {
                    visibility: "visible",
                    opacity: 1,
                  },
                }}
                onMouseEnter={() => setCareer(true)}
                onMouseLeave={() => setCareer(false)}
              >
                <p>Career</p>
                {career && (
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 10,
                      top: "100%",
                      left: 0,
                      background: "#EBEAFF",
                      borderRadius: "12px",
                      opacity: career ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <ul style={{ margin: 0, padding: "30px", }}>
                      <li>Career Item 1</li>
                      <li>Career Item 2</li>
                      <li>Career Item 3</li>
                    </ul>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Button variant="contained">get</Button>
          </Box>
        </Box>
        <Box
          onClick={handleClick}
          sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
        >
          {menu ? <p>Close</p> : <p>Icon</p>}
        </Box>
      </Box>

      {menu ? (
        <Box
          sx={{
            display: { md: "none" },
            position: "absolute",
            top: "10%",
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ background: "red", p: 2 }}>
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                flexDirection: "column",
              }}
            >
              <li style={{ padding: 10 }}>About</li>
              <li style={{ padding: 10 }}>Contact</li>
              <li style={{ padding: 10 }}>Career</li>
              <li style={{ padding: 10 }}>Blogs</li>
            </ul>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default Header;
