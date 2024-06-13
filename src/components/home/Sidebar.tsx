import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {} from "@heroicons/react/24/solid";

import {
  Squares2X2Icon as Squares2X2OutlineIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Card className="border min-h-[45rem] w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <ListItem className="w-[10rem]" onClick={() => navigate("/home")}>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>
        <ListItem className="w-[10rem]" onClick={() => navigate("/board")}>
          <ListItemPrefix>
            <Squares2X2OutlineIcon className="h-5 w-5" />
          </ListItemPrefix>
          Boards
        </ListItem>
        {/* TODO: Need to complete this features */}
        {/* <ListItem className="w-[10rem]">
          <ListItemPrefix>
            <Icon name="tasksquare" />
          </ListItemPrefix>
          To do
        </ListItem> */}
      </List>
    </Card>
  );
}
