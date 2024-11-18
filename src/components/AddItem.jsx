import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const AddItem = () => {
  const [fields, setFields] = useState([
    {
      id: uuidv4(),
      value: "",
      children: [
        { id: uuidv4(), type: "searchField", value: "", children: [] },
      ],
    },
  ]);

  const addItem = () => {
    setFields((prevFields) => [
      ...prevFields,
      {
        id: uuidv4(),
        value: "",
        children: [
          { id: uuidv4(), type: "searchField", value: "", children: [] },
        ],
      },
    ]);
  };

  const addField = (parentId) => {
    const addChildField = (fields) => {
      return fields.map((field) => {
        if (field.id === parentId) {
          return {
            ...field,
            children: [
              ...field.children,
              { id: uuidv4(), type: "searchField", value: "", children: [] },
            ],
          };
        }
        if (field.children.length) {
          return {
            ...field,
            children: addChildField(field.children),
          };
        }
        return field;
      });
    };
    setFields((prevFields) => addChildField(prevFields));
  };

  const addFieldUnderSearch = (parentId) => {
    const addChildField = (fields) => {
      return fields.map((field) => {
        if (field.id === parentId && field.type === "searchField") {
          return {
            ...field,
            children: [
              ...field.children,
              { id: uuidv4(), type: "textField", value: "", children: [] },
            ],
          };
        }
        if (field.children.length) {
          return {
            ...field,
            children: addChildField(field.children),
          };
        }
        return field;
      });
    };
    setFields((prevFields) => addChildField(prevFields));
  };

  const addChildFieldBelowTextField = (parentId) => {
    const addChildField = (fields) => {
      return fields.map((field) => {
        if (field.id === parentId && field.type === "textField") {
          return {
            ...field,
            children: [
              ...field.children,
              { id: uuidv4(), type: "newField", value: "", children: [] },
            ],
          };
        }
        if (field.children.length) {
          return {
            ...field,
            children: addChildField(field.children),
          };
        }
        return field;
      });
    };
    setFields((prevFields) => addChildField(prevFields));
  };

  const handleChange = (id, value) => {
    const updateFieldValues = (fields) => {
      return fields.map((field) => {
        if (field.id === id) {
          return { ...field, value }; 
        }
        if (field.children.length) {
          return {
            ...field,
            children: updateFieldValues(field.children),
          };
        }
        return field;
      });
    };

    setFields((prevFields) => updateFieldValues(prevFields));
  };

  const renderFields = (parent, ml = 0) => {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, ml }}
        key={parent.id}
      >
        <Box sx={{ border: "1px solid gray", p: 1, mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {parent.children.map((child) => {
              if (child.type === "searchField") {
                return (
                  <Box key={child.id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <TextField
                        size="small"
                        placeholder="search"
                        value={child.value || ""}
                        onChange={(e) => handleChange(child.id, e.target.value)}
                      />
                      <Button
                        variant="contained"
                        onClick={() => addFieldUnderSearch(child.id)}
                      >
                        +
                      </Button>
                    </Box>
                    {child.children.length > 0 &&
                      child.children.map((nestedChild) => {
                        if (nestedChild.type === "textField") {
                          return (
                            <Box key={nestedChild.id}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                  mt: 2,
                                  ml: 6,
                                }}
                              >
                                <TextField
                                  size="small"
                                  placeholder="Shap"
                                  value={nestedChild.value || ""}
                                  onChange={(e) =>
                                    handleChange(nestedChild.id, e.target.value)
                                  }
                                />
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    addChildFieldBelowTextField(nestedChild.id)
                                  }
                                >
                                  +
                                </Button>
                              </Box>
                              {nestedChild.children.length > 0 &&
                                nestedChild.children.map((newfieldChild) => {
                                  if (newfieldChild.type === "newField") {
                                    return (
                                      <Box
                                        key={newfieldChild.id}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 2,
                                          mt: 2,
                                          ml: 10,
                                        }}
                                      >
                                        <TextField
                                          size="small"
                                          placeholder="color"
                                          value={newfieldChild.value || ""}
                                          onChange={(e) =>
                                            handleChange(
                                              newfieldChild.id,
                                              e.target.value
                                            )
                                          }
                                        />
                                        <Button variant="contained">+</Button>
                                      </Box>
                                    );
                                  }
                                })}
                            </Box>
                          );
                        }
                      })}
                  </Box>
                );
              } else if (child.type === "newField") {
                return (
                  <Box key={child.id} sx={{ ml: 2 }}>
                    <TextField
                      size="small"
                      placeholder="New Field"
                      value={child.value || ""}
                      onChange={(e) => handleChange(child.id, e.target.value)}
                    />
                    <Button>+</Button>
                  </Box>
                );
              } else {
                return null;
              }
            })}
          </Box>
          <Button sx={{ mt: 2 }} onClick={() => addField(parent.id)}>
            Add Sub Menu
          </Button>
        </Box>
      </Box>
    );
  };

  const handleSave = () => {
    localStorage.setItem("formData", JSON.stringify(fields));
  };


  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "70vh",
            width: "70vh",
            border: "1px solid gray",
            borderRadius: "10px",
            padding: 2,
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <Button variant="contained" onClick={addItem}>
                Add Item
              </Button>
            </Box>
            <Box>{fields.map((field) => renderFields(field))}</Box>
          </Box>
        </Box>
        <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default AddItem;
