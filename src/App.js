import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "./App.css";
import { useForm, useFieldArray } from "react-hook-form";

export default function App() {
  const [question, setQuestion] = useState("");
  const [preview, setPreview] = useState(true);

  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: { firstName: "Bill" },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  let arrcheckBox = [];

  const handleCheckbox = (e, index) => {
    const value = e.target.checked;
    // console.log(value);

    let selected = fields[index].firstName;

    console.log(selected);
    if (value) {
      arrcheckBox.push(selected);
    }
  };

  const previewData = () => {
    setPreview(!preview);
  };
  const onsubmit = (data) =>
    console.log(
      JSON.stringify({
        question: question,
        Option: data,
        selected: arrcheckBox,
      })
    );

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
            {fields.map((item, index) => (
              <li key={item.id} className="survey__items">
                {!preview && (
                  <input
                    style={{ accentColor: "#6F73D2" }}
                    // value={item.defaultValue}
                    ch
                    type="checkbox"
                    name="mycheckboxes"
                    onChange={(e) => handleCheckbox(e, index)}
                  />
                )}
                <form id="hook-form" onSubmit={handleSubmit(onsubmit)}>
                  <input
                    {...register(`test.${index}.firstName`, { required: true })}
                    className={
                      preview ? "survey__input" : "previewsurvey__input"
                    }
                    disabled={!preview}
                  />
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
            append({ firstName: "" });
          }}
          disabled={!preview}
        >
          add choice
        </button>
      </div>
      <div>
        <button
          type="submit"
          form="hook-form"
          className="button button__submit"
          // onClick={onsubmit}
        >
          save
        </button>
      </div>
    </div>
  );
}
