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
          content: [
            {
              type: "label",
              props: {
                caption: "innerLabel1",
                visible: false,
              },
            },
            {
              type: "label",
              props: {
                caption: "innerLabel2",
                visible: false,
              },
            },
            {
              type: "label",
              props: {
                caption: "innerLabel3",
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
      path: null,
      value: null,
    };
  }
  
  elementCreator = (elem, index) => {
    let childArr = [];
    switch (elem.type) {
      case "panel": {
        let styles = {
          border: "1px solid black",
          width: elem.props.width,
          height: elem.props.height,
          display: elem.props.visible ? "" : "none",
        };
        if (elem.content) {
          for (let i = 0; i < elem.content.length; i++) {
            childArr.push(this.elementCreator(elem.content[i], i));
          }
        }
        return (
          <div
            className={elem.type}
            style={styles}
            key={elem.caption ? elem.caption : index}
          >
            {childArr ? childArr : null}
          </div>
        );
      }
      case "label": {
        let styles = {
          display: elem.props.visible ? "" : "none",
        };
        return (
          <span className={elem.type} style={styles} key={index}>
            {elem.props.caption}
          </span>
        );
      }
      case "button": {
        let styles = {
          width: elem.props.width,
          height: elem.props.height,
          display: elem.props.visible ? "" : "none",
        };
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
      value = JSON.parse(value.replace(/'/g, "").replace(/[a-zA-Z]+/g, '"$&"'));
      this.setState({ value });
    } else if (/[0-9]/.test(value)) {
      this.setState({ value: +value });
    } else if (/false|true/.test(value)) {
      value = value === "true";
      this.setState({ value });
    } else {
      this.setState({ value });
    }
  };

  changeObject = (obj, keys, newValue) => {
    for (let i = 0; i < keys.length; i++) {
      if (
        obj[keys[i]] &&
        typeof obj[keys[i]] == "object" &&
        typeof keys !== "string"
      ) {
        let tempObj = { ...obj[keys[i]] };
        return {
          ...obj,
          [keys[i]]: this.changeObject(tempObj, keys.slice(1), newValue),
        };
      } else {
        obj[keys + ""] = newValue;
        return obj;
      }
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let inputPath = this.state.path,
      value = this.state.value,
      index = inputPath.match(/[0-9]/) + "",
      sliceIndex = inputPath.indexOf("]") + 2,
      path = inputPath.slice(sliceIndex).split("."),
      contentCopy = [...this.state.content],
      objCopy = { ...contentCopy[index] },
      objOut = this.changeObject(objCopy, path, value);

    contentCopy[index] = objOut;
    this.setState({ content: contentCopy });
  };

  render() {
    let content = this.state.content.map((item, index) => {
      return this.elementCreator(item, index);
    });
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
                  this.setState({ path: e.target.value });
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
        <div className="content">{content}</div>
      </>
    );
  }
}

export default App;
