import {NextRouter, withRouter} from "next/router";
import React, {Component} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ChatMessage from "@components/Chat/ChatMessage";
import styles from "./index.module.scss";
import ChatUserList from "@components/Chat/ChatUserList";

let socket: WebSocket;

interface WithRouterProps {
    router: NextRouter;
}

interface Props extends WithRouterProps {
}

interface States {
    messages: SOCKET.chatMessage[];
    HubID: string;
}

class Success extends Component<Props, States> {
    private once: boolean;
    private inputRef: React.RefObject<any>;
    private socket: WebSocket | undefined;
    private listeners: any[];
    private user: API.CurrentUser | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
            HubID: "",
        };
        this.once = false;
        this.inputRef = React.createRef();
        this.socket = undefined;
        this.listeners = [];
        this.user = undefined
    }

    // This is awful implementation at the moment just to make things work.
    handleSocketMessage(message: SOCKET.chatSocketMessage) {
        switch (message.action) {
            case "message":
                const data = message.data;
                console.log(data)
                if (!data) return;
                this.setState<"messages">((prevState: States, msg) => {
                    return {
                        messages: prevState.messages.concat({...message.data}),
                    };
                });
                break;
        }
    }

    sendMessage = (msg: string) => {
        const chatMsg: SOCKET.chatSocketMessage = {
            action: "message",
            data: {text: msg, sender: this.user?.nickname ?? ""}
        };
        socket?.send(JSON.stringify(chatMsg));
    };

    // the event handler for global keyboard event
    keyDownEventHandler = (evt: KeyboardEvent) => {
        if (evt.key === "Enter") {
            this.SendClicked();
        }
    };


    componentDidUpdate(prevP: Props, prevS: States) {
        //  this.once flag make sure codes below are executed exactly once.
        if (!this.once && this.props.router.isReady) {
            // login status check
            fetch("/api/user/current").then(async (res) => {
                const resJson = (await res.json()) as API.baseResult<API.CurrentUser>;
                const user = resJson.data;
                console.log(user?.["Gorm.Model"]?.ID);
                if (!user?.["Gorm.Model"]?.ID || user?.["Gorm.Model"]?.ID < 0) {
                    console.log("should push to login");
                    await this.props.router.push("/user/login");
                } else {
                    this.user = user
                }
            });
            const router = this.props.router;
            const ID = router.query.ID as string;
            this.setState<"HubID">((prevState: States, msg) => {
                return {
                    HubID: ID,
                };
            });

            socket = new WebSocket(
                `ws://${window.location.hostname}:8096/hub?ID=${ID}`
            );
            socket.onmessage = (ev) => {
                this.handleSocketMessage(
                    JSON.parse(ev.data) as SOCKET.chatSocketMessage
                );
            };
            this.socket = socket;
            const ObjThis = this;
            window.addEventListener(
                "keydown",
                this.keyDownEventHandler // bind to this component to access attrs
            );
            this.listeners.push(this.keyDownEventHandler);
            console.log("call updated once");
            this.once = true;
        }
    }

    // handle the click event of message sending button.
    SendClicked = () => {
        this.sendMessage(this.inputRef.current.value);
        this.inputRef.current.value = ""; // empty the input
        this.inputRef.current.focus();
    };

    componentDidMount() {
        // trigger an update, so we can use router.query object and do things.
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.listeners.map((listener: any) => {
            window.removeEventListener("keydown", listener);
            console.log("unmount one");
        });
    }

    render() {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "5px",
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <Box className={styles.leftContainer}>
                    <Box className={styles.messageArea}>
                        {this.state.messages.map((val, idx) => {
                            return (
                                <ChatMessage
                                    name={val.sender || "**"}
                                    message={val.text}
                                    key={idx}
                                />
                            );
                        })}
                    </Box>

                    <Box display={"flex"} marginTop={"10px"} marginBottom={"20px"}>
                        <TextField
                            label={"Message"}
                            sx={{flexGrow: 1, marginRight: "10px"}}
                            id={"messageField"}
                            inputRef={this.inputRef} // use ref to access value
                            autoComplete={"off"}
                        />
                        <Button
                            onClick={() => this.SendClicked()}
                            className={styles.sendMessageBtn}
                        >
                            <p>发送消息</p>
                        </Button>
                    </Box>
                </Box>

                <Box className={styles.rightContainer}>
                    <ChatUserList HubID={this.state.HubID}/>
                </Box>
            </Box>
        );
    }
}

export default withRouter(Success);
