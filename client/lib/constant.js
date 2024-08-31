import {
  Pencil,
  Move,
  Scaling,
  Circle,
  Square,
  Eraser,
  MousePointer2,
  Undo,
  Redo,
  Save,
} from "lucide-react";

export const tools = [
  // {
  //   name: "select",
  //   icon: <MousePointer2 />,
  // },
  {
    name: "pen",
    icon: <Pencil />,
  },
  // {
  //   name: "rectangle",
  //   icon: <Square />,
  // },
//   {
//     name: "circle",
//     icon: <Circle />,
//   },
  {
    name: "eraser",
    icon: <Eraser />,
  },
//   {
//     name: "Move",
//     icon: <Move />,
//   },
//   {
//     name: "Resize",
//     icon: <Scaling />,
//   },
];

export const menuItems = [
  {
    name: "undo",
    icon: <Undo />,
  },
  {
    name: "redo",
    icon: <Redo />,
  },
  {
    name: "save",
    icon: <Save />,
  },
];
