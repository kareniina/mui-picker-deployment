import React, { useState, useRef } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import adapterLocale from 'date-fns/locale/en-GB';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Todolist() {
  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const columns = [
    { field: "description", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    {
      field: "priority",
      sortable: true,
      filter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
  ];

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    } else {
      alert("Select row first");
    }
  };

  return (
    <div>
      <h1>Todolist</h1>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          label="Description"
          variant="standard"
          name="description"
          value={todo.description}
          onChange={inputChanged}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            format="dd.MM.yyyy"
            locale={adapterLocale}
            variant="standard"
            value={todo.date}
            onChange={(value) => setTodo({ ...todo, date: value })}
          />
        </LocalizationProvider>

        <input
          type="text"
          onChange={inputChanged}
          placeholder="Priority"
          name="priority"
          value={todo.priority}
        />{" "}
        <Button variant="contained" onClick={addTodo}>
          Add
        </Button>{" "}
        <button onClick={deleteTodo}>Delete</button>
        </Stack>

      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "70%", margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default Todolist;
