import axios from "axios";
import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import BreadcrumbNav from "./components/BreadcrumbNav";
import Folder from "./components/Folder";
import File from "./components/File";

function App() {
  const SERVER_URL = "http://localhost:8000/path";

  const [pathArray, setPathArray] = useState(["root"]);
  const [dirContent, setDirContent] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    axios
      .get(`${SERVER_URL}/${JSON.stringify(pathArray)}`)
      .then((res) => {
        setDirContent(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [pathArray]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Outlet />

          {!loaded ? (
            <h1>LOADING...</h1>
          ) : dirContent.type === "dir" ? (
            <Folder content={dirContent.children} pathArray={pathArray} />
          ) : (
            <File name={dirContent.name} />
          )}
        </>
      ),
      children: [
        {
          index: true,
          element: <BreadcrumbNav setPathArray={setPathArray} />,
        },
        {
          path: ":paths",
          element: <BreadcrumbNav setPathArray={setPathArray} />,
        },
      ],
    },
  ]);

  return (
    <Container maxW="3xl" my={10}>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
