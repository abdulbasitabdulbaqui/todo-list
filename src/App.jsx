import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [editId, setEditId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({
    task: "",
    date: "",
  });
  const [toduData, setToduData] = useState([]);

  const handleTask = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAdd = () => {
    const newTask = {
      id: Date.now(),

      date: selectedDate,
    };
    if (!data.task) return;
    if (editId) {
      const updated = toduData.map((item) =>
        item.id === editId
          ? { ...item, task: data.task, date: selectedDate }
          : item,
      );
      setToduData(updated);
      setEditId(null);
      toast.success("Task Added Successfully!");
    } else {
      const newTask = {
        id: Date.now(),
        task: data.task,
        date: selectedDate,
      };
      setToduData([...toduData, newTask]);
      toast.success("Task Added Successfully!");
    }
    setData({ task: "" });
    setSelectedDate(null);
  };

  const handleDelete = (id) => {
    const det = toduData.filter((res) => res.id !== id);
    setToduData(det);
    toast.error("Task Deleted Successfully!");
  };

  const handleEdit = (id) => {
    const edit = toduData.find((res) => res.id === id);

    if (edit) {
      setData({
        task: edit.task,
      });
      setSelectedDate(edit.date ? new Date(edit.date) : null);

      setEditId(id);
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className=" p-4 rounded"
              style={{
                backgroundColor: "rgb(111, 66, 193)",
                color: "white",
              }}
            >
              <h2 className="text-center">Todo List</h2>
              <div className=" d-flex justify-content-center align-items-center ">
                <div>
                  <label className="text-white">Add your Task:</label>
                  <Form.Control
                    name="task"
                    className="mb-3 bg-light"
                    aria-label="Text input with radio button"
                    type="text"
                    onChange={handleTask}
                    value={data.task}
                  />
                  <label className="text-white">Date Of Task:</label>
                  <br />
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control mt-2 "
                  />

                  <Button
                    className="text-light mt-2  text-light mt-2 w-100  w-100 mt-2"
                    variant="outline-secondary"
                    onClick={handleAdd}
                    style={{
                      backgroundColor: "rgb(74, 20, 140)",
                      border: "none",
                    }}
                  >
                    {editId ? "Update Task" : "Add Task"}
                  </Button>

                  <div
                    className="mt-5 table-responsive"
                    style={{
                      maxHeight: "45vh",
                      overflowY: "auto",
                      overflowX: "auto",
                    }}
                  >
                    {toduData.length === 0 ? (
                      <h5>Please Add Task:</h5>
                    ) : (
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Sr.No</th>
                            <th>Task</th>
                            <th>Date</th>
                            <th>Buttons</th>
                          </tr>
                        </thead>
                        <tbody>
                          {toduData.map((res, index) => (
                            <tr key={res.id}>
                              <td>{index + 1}</td>
                              <td>{res.task}</td>
                              <td>
                                {res.date
                                  ? new Date(res.date).toLocaleDateString()
                                  : "No Date"}
                              </td>
                              <td>
                                <Button
                                  onClick={() => handleDelete(res.id)}
                                  className="m-1 "
                                  style={{
                                    backgroundColor: "rgb(74, 20, 140)",
                                    border: "none",
                                  }}
                                >
                                  Delete
                                </Button>
                                <Button
                                  onClick={() => handleEdit(res.id)}
                                  style={{
                                    backgroundColor: "rgb(74, 20, 140)",
                                    border: "none",
                                  }}
                                >
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
