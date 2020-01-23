import React from "react";
import ReactDOM from "react-dom";
import ext from "../utils/ext";
import Draggable from "react-draggable";

import Panel from "./components/Panel";

function onRequest(request) {
  if (request.action === "change-color") {
    document.body.style.background = request.data.color;
  }
}

ext.runtime.onMessage.addListener(onRequest);

class Main extends React.Component {
  render() {
    return (
      <div className="my-extension">
        <Draggable
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[25, 25]}
          scale={1}
        >
          <div>
            <Panel />
          </div>
        </Draggable>
      </div>
    );
  }
}

const app = document.createElement("div");
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
