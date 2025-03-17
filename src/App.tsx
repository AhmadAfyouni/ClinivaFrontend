import { Card, createTheme, Flex, MantineProvider } from "@mantine/core";
import "./App.css";
import { SideBar } from "./layout/SideBar/SideBar";
import NavBar from "./layout/NavBar/NavBar";
import PatientsTables from "./pages/Patients";
import AddUser from "./pages/User/AddUser";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const theme = createTheme({
  colors: {
    myPrimary: [
      '#FFF5F2', // 0 - lightest
      '#FFEBE5', // 1 - light
      '#FFD9CF', // 2 
      '#FFC7B8', // 3
      '#FEB6A3', // 4 - base (primary)
      '#FE947A', // 5
      '#FD7251', // 6 - dark
      '#FD501F', // 7
      '#EC3A0C', // 8
      '#DC2A00'  // 9 - darkest
    ],
  },
  primaryColor: 'myPrimary',
  primaryShade: { light: 4, dark: 6 } ,
  other: {
    secondaryDarkColor :'#9BDABB',
    secondaryLightColor :'#E2F6EC',
    secondaryColor:'#CDEDDD',
    surfaceDefault: '#FFFDFC',
    bgSubtle: '#FAFAF8',
    bg: '#FAF6F5',
    borderDefault: '#E4E2DD',
    onSurfaceTertiary: '#B8B1A9',
    onSurfaceSecondary: '#66615E',
    onSurfacePrimary: '#1A1615',
    PurpleHear:'#D9D9D9',
  },
});
function App() {
  return (
    <MantineProvider theme={theme}>
      <Flex h={"100%"} direction={"row"} justify={"flex-start"}>
        <SideBar />
        <Flex w={"100%"} direction={"column"} justify={"start"} align={"center"}>
          <NavBar />
          <Card bg={"#FAF6F5"} w={"97%"} h={"100%"} mr={"xl"} ml={"xl"}>
            {/* <PatientProfile/> */}
            <PatientsTables/>
            {/* <InputForm /> */}
            {/* <ArticleCard/> */}
          </Card>
        </Flex>

      </Flex>
    </MantineProvider>
  );
}

export default App;
