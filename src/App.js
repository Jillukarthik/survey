import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "./App.css";
import { useForm, useFieldArray } from "react-hook-form";

export default function App() {
  const [preview, setPreview] = useState(true);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
      test: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name2: "question",
    name: "test",
    rules: {
      maxLength: {
        value: 5,
        message: "Only 5 inputs are allowed",
      },
    },
  });

  // console.log(fields.length);
  let arrcheckBox = [];
  const handleCheckbox = (e, index) => {
    var value = e.target.checked;
    let selected = fields[index].firstName;
    // console.log(selected);
    if (value) {
      arrcheckBox.push(selected);
    }
    return [];
  };

  //checkbox
  const handleCheckboxChange = (event) => {
    setSelectedCheckboxes(
      event.target.checked
        ? [...selectedCheckboxes, event.target.value]
        : selectedCheckboxes.filter((value) => value !== event.target.value)
    );
  };

  const previewData = () => {
    setPreview(!preview);
  };

  const onsubmit = (data) => {
    console.log(
      JSON.stringify({
        data,
        selected: arrcheckBox,
      })
    );
    console.log(data);
    // console.log(selectedCheckboxes.length);
    if (!preview && selectedCheckboxes.length === 0) {
      alert("no input is selected");
    }
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
          {...register("question", {
            required: {
              value: true,
              message: "Required field!!!",
            },
            pattern: {
              value: /[A-Za-z]/,
              message: "please enter the valid!!!",
            },
          })}
          className={preview ? "survey__question" : "previewsurvey__question"}
          disabled={!preview}
        />
        {errors.question && (
          <span style={{ color: "red" }}>{errors.question.message}</span>
        )}
        <div className="survey__answer">
          <ol type="A" className="survey__list">
            {fields.map((item, index) => (
              <li key={item.id} className="survey__items">
                {!preview && (
                  <input
                    style={{ accentColor: "#6F73D2" }}
                    type="checkbox"
                    name="mycheckboxes"
                    onChange={
                      ((e) => handleCheckbox(e, index),
                      (e) => handleCheckboxChange(e))
                    }
                  />
                )}
                <form id="hook-form" onSubmit={handleSubmit(onsubmit)}>
                  <input
                    {...register(`test.${index}.firstName`, {
                      required: {
                        value: true,
                        message: "Required field!!!",
                      },
                      pattern: {
                        value: /[A-Za-z]/,
                        message: "please enter the valid!!!",
                      },
                      maxLength: {
                        value: 20,
                        message: "should not exceed 10!!!",
                      },
                    })}
                    className={
                      preview ? "survey__input" : "previewsurvey__input"
                    }
                    disabled={!preview}
                  />
                  {errors.test?.[index]?.firstName && (
                    <span style={{ color: "red" }}>
                      {errors.test?.[index]?.firstName.message}
                    </span>
                  )}
                </form>
                <AiFillDelete
                  onClick={() => remove(index)}
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
          onClick={() => {
            append();
          }}
          disabled={!preview || (fields.length === 5 && true)}
        >
          {fields.length === 5 ? "only 5 fields" : "add choice"}
        </button>
      </div>
      <div>
        {/* <p>{errors.test?.root?.message}</p> */}
        <button
          type="submit"
          form="hook-form"
          className="button button__submit"
        >
          save
        </button>
      </div>
    </div>
  );
}
