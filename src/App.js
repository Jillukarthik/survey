import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "./App.css";
export default function App() {
  const [question, setQuestion] = useState("");
  const [task, addTask] = useState([]);
  const [preview, setPreview] = useState(true);
  const handleAdd = () => {
    const abc = [...task, []];
    addTask(abc);
  };

  const handleChange = (onChangeValue, i) => {
    const inputdata = [...task];
    inputdata[i] = onChangeValue.target.value;
    addTask(inputdata);
  };

  const handleDelete = (i) => {
    const deletVal = [...task];
    deletVal.splice(i, 1);
    addTask(deletVal);
  };

  const showData = (event) => {
    console.log(JSON.stringify("question:" + question));
    task.map((x) => {
      console.log(JSON.stringify("option:" + x));
    });
  };

  const previewData = () => {
    setPreview(!preview);
  };

  return (
    <div className="survey">
      <div className="survey__card">
        <div className="survey__header">
          <h1 className="survey__topic">Multiselect Question</h1>
          <FaEye className="survey__icon" onClick={previewData} />
        </div>
        <div>
          <p className="survey__description">
            Add Description to your question
          </p>
        </div>
        <input
          className={preview ? "survey__question" : "previewsurvey__question"}
          value={question}
          disabled={!preview}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="survey__answer">
          <ol type="A" className="survey__list">
            {task.map((data, i) => (
              <li key={i} className="survey__items">
                <input
                  className={preview ? "survey__input" : "previewsurvey__input"}
                  value={data}
                  disabled={!preview}
                  onChange={(e) => handleChange(e, i)}
                />
                <AiFillDelete
                  onClick={() => handleDelete(i)}
                  button__handledelete
                  className={
                    preview
                      ? "button__handledelete"
                      : "previewbutton__handledelete"
                  }
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div>
        <button
          className="button button__addtask"
          onClick={handleAdd}
          disabled={!preview}
        >
          add choice
        </button>
      </div>
      <div>
        <button className="button button__submit" onClick={showData}>
          save
        </button>
      </div>
    </div>
  );
}
