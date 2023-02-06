import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import "./App.css";
import { useForm, useFieldArray } from "react-hook-form";

export default function App() {
  const [preview, setPreview] = useState(true);

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
    question: "question",
    name: "test",
    rules: {
      maxLength: {
        value: 5,
        message: "Only 5 inputs are allowed",
      },
    },
  });

  const previewData = () => {
    setPreview(!preview);
  };

  const onsubmit = (data) => {
    let selectedCheckbox = [];
    let surveyOption = [];
    let question = data.question;

    //getting selected checkbox
    data.test.filter((x) => {
      if (x.checkbox) {
        selectedCheckbox.push(x.option);
      }
    });

    //alert when no input is selected
    if (!preview && selectedCheckbox.length === 0) {
      alert("please select atleast one of the field");
    }

    data.test.filter((x) => {
      if (x.option) {
        surveyOption.push(x.option);
      }
    });

    console.log(
      JSON.stringify({
        question: question,
        option: surveyOption,
        selected: selectedCheckbox,
      })
    );
    // console.log(data);
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

        <div className="survey__answer">
          <ol type="A" className="survey__list">
            <form id="hook-form" onSubmit={handleSubmit(onsubmit)}>
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
                className={
                  preview ? "survey__question" : "previewsurvey__question"
                }
                disabled={!preview}
              />
              {errors.question && (
                <span style={{ color: "red" }}>{errors.question.message}</span>
              )}
              {fields.map((item, index) => {
                const id = `test.${index}.checkbox`;
                return (
                  <li key={item.id} className="survey__items">
                    {!preview && (
                      <input
                        className="survey__checkbox"
                        type="checkbox"
                        value="on"
                        {...register(id)}
                        defaultChecked={fields.checked}
                      />
                    )}

                    <input
                      {...register(`test.${index}.option`, {
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
                    {errors.test?.[index]?.option && (
                      <span style={{ color: "red" }}>
                        {errors.test?.[index]?.option.message}
                      </span>
                    )}

                    <AiFillDelete
                      onClick={() => remove(index)}
                      className={
                        preview
                          ? "button__handledelete"
                          : "previewbutton__handledelete"
                      }
                    />
                  </li>
                );
              })}
            </form>
          </ol>
        </div>
      </div>
      <div>
        <button
          className="button button__addtask"
          onClick={() => {
            append({ option: "" });
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
