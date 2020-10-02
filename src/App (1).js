import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      content: [
        {
          type: "panel",
          props: {
            width: 500,
            height: 200,
            visible: true,
          },
        },
        {
          type: "label",
          props: {
            caption: "test",
            visible: false,
          },
        },
        {
          type: "button",
          props: {
            width: 100,
            height: 50,
            visible: true,
            caption: "кнопка",
          },
        },
      ],
    };
  }

  static path;
  static value;

  elementCreator = (elem, index) => {
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
              ? elem.content.map((item, index) =>
                  this.elementCreator(item, index)
                )
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

  parseValue = (value) => {
    if (/{/.test(value)) {
      
      this.value = JSON.parse(
        value.replace(/'/g, "").replace(/\b((?!false|true)(\w+))/g, '"$&"')
      );
    //   this.setState(prevState => ({
    //     content: { ...prevState.content, ...JSON.parse(value.replace(/'/g, "").replace(/\b((?!false|true)(\w+))/g, '"$&"'))}
    // }));
    } else if (/\d/.test(value)) {
      this.value = +value;
    } else if (/false|true/.test(value)) {
      this.value = value === "true";
    } else {
      this.value = value;
    }
  };

  changeObject = (obj, keys, newValue) => {
    for (let i = 0; i < keys.length; i++) {
      if (typeof obj[keys[i]] == "object") {
        let tempObj = { ...obj[keys[i]] };
        return {
          ...obj,
          [keys[i]]: this.changeObject(tempObj, keys.slice(1), newValue),
        };
      } else {
        obj[keys] = newValue;
        return obj;
      }
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let inputPath = this.path,
      index = inputPath.match(/[0-9]/)[0],
      sliceIndex = inputPath.indexOf("]") + 2,
      path = inputPath.slice(sliceIndex).split(".");
    let contentCopy = [...this.state.content];
    // objCopy = { ...contentCopy[index] },
    const objCopy = { ...this.state.content[index] };
    console.log(objCopy);
    contentCopy[index] = this.changeObject(objCopy, path, this.value);
    // console.log(objOut);
    // console.log(index);
    // contentCopy[index] = objOut;
    this.setState({
      content: contentCopy,
    });
    // this.setState((prevState) => ({ content: [...prevState.content, [index] = objOut] }));
  };

  render() {
    return (
      <>
        <div className="header">
          <form onSubmit={this.handleSubmit}>
            <label>
              Путь
              <input
                type="text"
                className="path"
                onBlur={(e) => {
                  this.path = e.target.value;
                }}
              />
            </label>
            <label>
              Новое значение
              <input
                type="text"
                className="newVal"
                onBlur={(e) => {
                  this.parseValue(e.target.value);
                }}
              />
            </label>
            <input type="submit" value="Применить" />
          </form>
        </div>
        <div className="content">
          {this.state.content.map((item, index) =>
            this.elementCreator(item, index)
          )}
        </div>
      </>
    );
  }
}

export default App;
