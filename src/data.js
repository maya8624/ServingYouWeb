import sushi from "./images/sushi-6.jpg";
import ramen1 from "./images/ramen1.jpg";
import ramen2 from "./images/ramen2.jpg";
import mussels from "./images/grilled-mussels.jpg";
import pizza from "./images/pizza-1.jpg";
import spaghetti from "./images/spaghetti.jpg";
import pasta from "./images/pasta.jpg";

const menus = [
  {
    id: 1,
    name: "Sushi1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Japanese",
    price: 20,
    special: false,
    image: {
      url: sushi,
    },
  },
  {
    id: 2,
    name: "Fresh Sushi",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Japanese",
    price: 25,
    special: true,
    image: {
      url: sushi,
    },
  },
  {
    id: 3,
    name: "Yum Yum Pizza",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Italian",
    special: true,
    price: 30,
    image: {
      url: pizza,
    },
  },
  {
    id: 4,
    name: "Never Fail Spaghetti",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Italian",
    price: 17,
    special: true,
    image: {
      url: spaghetti,
    },
  },
  {
    id: 5,
    name: "Ramen2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Japanese",
    price: 19,
    special: false,
    image: {
      url: ramen2,
    },
  },
  {
    id: 6,
    name: "Ramen3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Japanese",
    price: 18,
    special: true,
    image: {
      url: ramen2,
    },
  },
  {
    id: 7,
    name: "Mussels",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Italian",
    price: 26,
    special: false,
    image: {
      url: mussels,
    },
  },
  {
    id: 8,
    name: "Mussels2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Korean",
    price: 30,
    special: false,
    image: {
      url: mussels,
    },
  },
  {
    id: 9,
    name: "Pasta Salad",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Italian",
    price: 22,
    special: true,
    image: {
      url: pasta,
    },
  },
  {
    id: 10,
    name: "King Pizza Set",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: true,
    category: "Italian",
    price: 110,
    special: true,
    image: {
      url: pasta,
    },
  },
];

export default menus;
