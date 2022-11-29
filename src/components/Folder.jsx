import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { FcFolder, FcFile } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Folder({ content, pathArray }) {
  return (
    <List spacing={3} fontSize="1.1rem">
      {content.map((item) => (
        <ListItem key={item.name}>
          <Link to={`/${JSON.stringify(pathArray.concat(item.name))}`}>
            <ListIcon as={item.type === "dir" ? FcFolder : FcFile} />
            {item.name}
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
