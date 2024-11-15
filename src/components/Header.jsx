import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const [data, setData] = useState([]);

  const handleClick = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const renderData = data?.length > 0 ? data[0]?.children : [];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
          borderBottom: "1px solid gray",
          background: "#C9E6F0",
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
            alt="Logo"
            src="https://cxl-web-prod-uploads.s3.amazonaws.com/public/filestore-uploads/27f0c3e906051948cf6a650b42b0227a5b69db06.png"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {renderData.map((item) =>
            item?.children?.map(
              (child) =>
                child?.children?.length > 0 && (
                  <Box
                    key={child?.id}
                    sx={{
                      display: { xs: "none", md: "flex" },
                      alignItems: "center",
                      position: "relative",
                    }}
                    onMouseEnter={() => setHoveredItem(child?.id)}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      setHoveredSubItem(null);
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "darkblue",
                        }}
                      >
                        <p>{child?.value}</p>
                      </Box>
                    </Box>

                    {hoveredItem === child?.id && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          background: "white",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          padding: 2,
                          borderRadius: "8px",
                          zIndex: 10,
                        }}
                      >
                        {child?.children?.map(
                          (subChild) =>
                            subChild?.children?.length > 0 && (
                              <Box
                                key={subChild?.id}
                                sx={{ position: "relative", padding: 1 }}
                                onMouseEnter={() =>
                                  setHoveredSubItem(subChild.id)
                                }
                                onMouseLeave={() => setHoveredSubItem(null)}
                              >
                                <p>{subChild?.value}</p>

                                {hoveredSubItem === subChild.id && (
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: "0",
                                      left: "100%",
                                      background: "#f0f8ff",
                                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                      padding: 2,
                                      borderRadius: "8px",
                                      zIndex: 20,
                                    }}
                                  >
                                    <p>
                                      {subChild?.children?.length
                                        ? subChild.children[0]?.value
                                        : "No Data"}
                                    </p>
                                  </Box>
                                )}
                              </Box>
                            )
                        )}
                      </Box>
                    )}
                  </Box>
                )
            )
          )}
        </Box>

        <Box
          onClick={handleClick}
          sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
        >
          {menu ? (
            <p>
              <IoMdClose />
            </p>
          ) : (
            <p>
              <IoMenu />
            </p>
          )}
        </Box>
      </Box>

      {menu && (
        <Box
          sx={{
            display: { md: "none" },
            position: "absolute",
            top: "10%",
            width: "100%",
            height: "100%",
            zIndex:1
          }}
        >
          <Box sx={{ background: "white", p: 2 }}>
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
      )}
    </>
  );
};

export default Header;
