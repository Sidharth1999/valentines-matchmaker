import { BrowserRouter, Route, Link, Routes} from "react-router-dom"; //import the package
import LandingPage from "./screens/LandingPage.tsx"
import MainPage from "./screens/MainPage.tsx" 

function MainRouter(){
    return(
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/main" element={<MainPage />} />
                </Routes>
            </div>
       </BrowserRouter>

    )
}
export default MainRouter;

