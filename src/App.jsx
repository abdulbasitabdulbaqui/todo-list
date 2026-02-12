import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import './App.css'

const App = () => {
  const [editId, setEditId] = useState(null);
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
    if (editId) {
      // update existing
      const updated = toduData.map((item) =>
        item.id === editId ? { ...item, ...data } : item,
      );

      setToduData(updated);
      setEditId(null); // edit mode OFF
    } else {
      // add new
      setToduData([...toduData, { id: Date.now(), ...data }]);
    }

    setData({ task: "", date: "" });
  };

  const handleDelete = (id) => {
    const det = toduData.filter((res) => res.id !== id);
    setToduData(det);
  };

  const handleEdit = (id) => {
    const edit = toduData.find((res) => res.id === id);

    if (edit) {
      setData({
        task: edit.task,
        date: edit.date,
      });
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
                  <Form.Control
                    name="date"
                    className="bg-light"
                    aria-label="First name"
                    onChange={handleTask}
                    value={data.date}
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
                            <td>{res.date}</td>
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
