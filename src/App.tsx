import { useState } from "react";
import Scene from './componants/Scene'
import BasicInfo from './componants/BasicInfo'
import SideBar from './componants/SideBar'

function App() {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="flex">
            <div
                className={`transition-all duration-300 w-full ${
                    hovered ? "mr-64" : "mr-12"
                } p-6`}
            >
                <BasicInfo />
                <Scene />
            </div>

            <div

            className={`fixed top-0 right-0 h-full z-20 shadow-md overflow-hidden transition-all duration-300
                ${hovered ? "w-64 bg-green-200 bg-opacity-100" : "w-12 bg-red-200 bg-transparent"}`}

                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="h-full flex flex-col justify-between items-center py-4">
                    {/* Arrow Icons */}
                    <div className="text-xl font-bold">«»</div>

                    {hovered && <SideBar />}
                </div>
            </div>
        </div>
    );
}

export default App;
