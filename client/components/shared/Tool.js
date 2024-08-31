import React from "react";
import { menuItems, tools } from "@/lib/constant";
import { Button } from "../ui/button";

function Tool({state,dispatch}) {

    const handleClick = (e) => {
        const button = e.target.closest("button");
        
        if (button) {
            const selectedTool = button.getAttribute("data-attr");
            dispatch({ type: "CHANGE_TOOL", tool: selectedTool });
        }
      };
      
  return (
    <>
      {/* <div className="w-full flex justify-center items-center gap-2 h-[8vh]"> */}
        <div onClick={handleClick} className=" flex justify-center items-center gap-2 absolute m-auto top-6 left-[50%] translate-x-[-50%]">

        {tools?.map((item, index) => {
          return (
            <Button variant={state.selectedTool===item.name?"default":"outline"}  key={index} data-attr={item.name}>
              {item.icon}
            </Button>
          );
        })}
        </div>
        <div className="absolute bottom-6 left-6">

        {menuItems?.map((item, index) => {
          return (
            <Button className="hover:bg-primary hover:text-white" variant="outline" key={index} data-attr={item.name}>
              {item.icon}
            </Button>
          );
        })}
        </div>
      {/* </div> */}
    </>
  );
}

export default Tool;
