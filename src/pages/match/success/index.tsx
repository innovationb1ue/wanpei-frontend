import { NextRouter, useRouter, withRouter } from "next/router";
import React, { Component, createRef } from "react";
import { string } from "prop-types";
import { SOCKET } from "@api/socket";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

let socket: WebSocket;

interface WithRouterProps {
  router: NextRouter;
}
interface Props extends WithRouterProps {}

interface States {
  connected: boolean;
  messages: SOCKET.chatMessage[];
}

class Success extends Component<Props, States> {
  private messageInput: string;
  constructor(props: any) {
    super(props);
    this.state = {
      connected: false,
      messages: [],
    };
    this.messageInput = "";
  }

  // todo: abstract and typing all the messages.
  // This is really bad implementation at the moment just to make things work.
  handleSocketMessage(message: SOCKET.chatSocketMessage) {
    switch (message.action) {
      case "default":
        console.log(message);
        break;
      case "message":
        const data = message.data;
        if (!data) return;
        this.setState<"messages">((prevState: States, msg) => {
          return {
            messages: prevState.messages.concat({ ...message.data }),
          };
        });
    }
  }

  sendMessage(msg: string) {
    const chatMsg: SOCKET.chatSocketMessage = {
      action: "message",
      data: { text: msg },
    };
    socket?.send(JSON.stringify(chatMsg));
  }

  componentDidUpdate() {
    console.log("did update");
    if (!this.state.connected) {
      const router = this.props.router;
      const ID = router.query.ID;
      socket = new WebSocket(
        `ws://${window.location.hostname}:8096/hub?ID=${ID}`
      );
      console.log(socket);
      socket.onmessage = (ev) => {
        console.log(ev);
        this.handleSocketMessage(
          JSON.parse(ev.data) as SOCKET.chatSocketMessage
        );
      };
      this.setState({
        connected: true,
      });
    }
  }

  componentDidMount() {
    // trigger an update, so we can take router.query object and establish Websocket connection.
    this.forceUpdate();
  }

  render() {
    return (
      <>
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{
            height: "100vh",
            padding: "10%",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Box
            sx={{
              borderStyle: "solid",
              height: "50%",
              flexGrow: 1,
              flexDirection: "column",
              width: "100%",
            }}
          >
            {this.state.messages.map((val, idx) => {
              return (
                <>
                  <p key={idx}>{val.text}</p>
                </>
              );
            })}
          </Box>

          <TextField
            label={"Message"}
            sx={{ margin: "auto" }}
            id={"messageField"}
            onChange={(evt) => {
              this.messageInput = evt.target.value;
            }}
          />
          <Button onClick={() => this.sendMessage(this.messageInput)}>
            Submit
          </Button>
        </Box>
      </>
    );
  }
}

export default withRouter(Success);

export function getStaticProps() {
  return { props: { a: "b" } };
}
