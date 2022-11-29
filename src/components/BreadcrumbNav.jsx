import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BreadcrumbNav({ setPathArray }) {
  // Read the paths from the routing url params
  const { paths } = useParams();
  // Convert the paths to an array
  const pathArr = paths ? JSON.parse(paths) : ["root"];

  useEffect(() => {
    paths && setPathArray(JSON.parse(paths));
  }, [paths]);

  return (
    <Breadcrumb my={6} fontSize="1.3rem" color="blue.500">
      {pathArr.map((item, index) => {
        // full url for each link
        const url = JSON.stringify(pathArr.slice(0, index + 1));

        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink as={Link} to={`/${url}`}>
              {item}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
