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
          },
        },
      ],
    };
  }

  render() {
    let container = this.state.content.map((item, index) => {
      if (item.type === "panel") {
        let styles = {
          border: "1px solid black",
          width: item.props.width,
          height: item.props.height,
          display: item.props.visible ? '' : 'none',
        };
        return <div className={item.type} style={styles} key={index} />;
      }
    });
    return (
      <div className="container">
        <form>
          <label>
            Путь
            <input type="text" name="path" className="path" />
          </label>
          <label>
            Новое значение
            <input type="text" name="newVal" className="newVal" />
          </label>
          <input type="submit" value="Применить" />
        </form>
        {container}
      </div>
    );
  }
}

export default App;
