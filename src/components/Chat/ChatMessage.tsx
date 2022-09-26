import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import React from "react";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

const ChatMessage: React.FC<{ name: string; message: string }> = (
  props,
  context
) => {
  return (
    <>
      <Box maxWidth={"200px"} sx={{ display: "flex" }}>
        <Tooltip title={props.name} placement={"top"} arrow>
          <Avatar>{props.name.slice(0, 2)}</Avatar>
        </Tooltip>
        <Typography>{props.message}</Typography>
      </Box>
    </>
  );
};

export default ChatMessage;
