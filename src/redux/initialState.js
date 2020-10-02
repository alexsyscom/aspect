const initialState = {
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
  path: "",
  value: "",
};

export default initialState;
