import React from "react";
import { connect } from "react-redux";
import {
  addObject,
  changeObject,
  inputHandler,
  clearInputHandler,
} from "./actions/";
import "./App.css";



const App = ({
  content,
  state,
  addObject,
  changeObject,
  inputHandler,
  clearInputHandler,
}) => {
  let inputPath;
  let inputValue;

  const elementCreator = (elem, index) => {
    let styles = {
      border: elem.type === "panel" ? "1px solid black" : null,
      width: elem.props.width,
      height: elem.props.height,
      display: elem.props.visible ? "" : "none",
    };
    switch (elem.type) {
      case "panel": {
        return (
          <div
            className={elem.type}
            style={styles}
            key={elem.caption ? elem.caption : index}
          >
            {elem.content
              ? elem.content.map((item, index) => elementCreator(item, index))
              : null}
          </div>
        );
      }
      case "label": {
        return (
          <span className={elem.type} style={styles} key={index}>
            {elem.props.caption}
          </span>
        );
      }
      case "button": {
        return (
          <button className={elem.type} style={styles} key={index}>
            {elem.props.caption}
          </button>
        );
      }
      default: {
        return null;
      }
    }
  };

  const parseValue = (value) => {
    if (/{/.test(value)) {
      inputHandler(
        "value",
        JSON.parse(
          value.replace(/'/g, "").replace(/\b((?!false|true)(\w+))/g, '"$&"')
        )
      );
    } else if (/\d/.test(value)) {
      inputHandler("value", +value);
    } else if (/false|true/.test(value)) {
      inputHandler("value", value === "true" ? true : false);
    } else {
      inputHandler("value", value);
    }
  };

  const changeProps = (obj, str, value) => {
    const parts = str.split(".");
    let newObj;
    if (/\[\d\]/.test(parts[0])) {
      const [, , props, index] = parts[0].match(/((\b[a-z]+\b)\[(\d)\])/);
      newObj = obj[props][+index];
    } else {
      newObj = obj[parts[0]];
    }
    if (parts[1]) {
      parts.splice(0, 1);
      const newString = parts.join(".");
      changeProps(newObj, newString, value);
    }
    if (parts.length === 1 && newObj[parts] !== value) {
      obj[parts[0]] = value;
    }
  };

  const clearInputs = () => {
    clearInputHandler();
  };
  const addObjectToState = (value) => {
    const cloneStateObj = JSON.parse(JSON.stringify(state));
    cloneStateObj.content.push(value);
    addObject(cloneStateObj);
    clearInputs();
  };

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    if (typeof inputValue === "object") {
      addObjectToState(state.value);
    }
    if (typeof inputValue !== "object") {
      console.log(inputPath);
      console.log(inputValue);
      console.log("изменение свойства");
      console.log(state.path);
      console.log(state.value);
      const cloneStateObj = JSON.parse(JSON.stringify(state));
      changeProps(cloneStateObj, state.path, state.value);
      changeObject(cloneStateObj);
      clearInputs();
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Путь
            <input
              type="text"
              className="path"
              value={state.path}
              onChange={(e) => {
                console.log(e.target.value);
                inputHandler("path", e.target.value);
              }}
            />
          </label>
          <label>
            Новое значение
            <input
              type="text"
              className="newValue"
              value={state.value}
              onChange={(e) => {
                console.log(e.target.value);
                parseValue(e.target.value);
              }}
            />
          </label>
          <input type="submit" value="Применить" />
        </form>
        <div className="content">
          {content.map((item, index) => elementCreator(item, index))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { content: state.content, state };
};
const mapDispatchToProps = {
  addObject,
  changeObject,
  inputHandler,
  clearInputHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
