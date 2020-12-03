import React, { useState, useEffect, useRef } from "react";
//import React, { Component } from "react";
import ReactDOM from "react-dom";

function Modal({ qty, menu, open, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const prevQuantity = useRef("");

  const spanRef = useRef();

  useEffect(() => {
    // prevQuantity.current = quantity;
    // console.log(prevQuantity, open, qty);
    document.body.addEventListener("click", (event) => {
      if (
        event.target.nodeName === "BUTTON" &&
        event.target.textContent === "test"
      ) {
        console.log("Clicked", event.target.textContent);
        setQuantity(1);
       // console.log(quantity);
      }
    });
  }, []);

  function handleSetQuantity() {
    setQuantity(1);
  }

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div id="myModal" className="m-style">
        <div className="m-content">
          <div className="m-header">
            <h2>{menu.name}</h2>
            <button ref={spanRef} className="m-close" onClick={onClose}>
              test
            </button>
            <span> &times;</span>
          </div>
          <div className="m-body">
            <p>Price: ${menu.price}</p>
            <p>
              Quantity:{" "}
              <span>
                {quantity} and previous qty: {prevQuantity.current}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="btn btn-secondary btn-sm m-2"
              >
                +
              </button>
              <button
                onClick={() => setQuantity(quantity - 1)}
                className="btn btn-secondary btn-sm"
                disabled={quantity === 0}
              >
                -
              </button>
            </p>
          </div>
          <div className="m-footer">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleSetQuantity()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;

// class Modal extends Component {
//   state = {
//     quantity: 1,
//   };

//   componentDidMount() {
//     this.setState({ quantity: 1 });

//     console.log("didmount", this.state.quantity);
//   }
//   increseQuantity = () => {
//     this.setState({ quantity: this.state.quantity + 1 });
//   };

//   decreseQuantity = () => {
//     this.setState({ quantity: this.state.quantity - 1 });
//   };

//   render() {
//     const { qty, menu, open, onClose } = this.props;

//     console.log(this.state.quantity);
//     if (!open) return null;

//     return ReactDOM.createPortal(
//       <>
//         <div id="myModal" className="m-style">
//           <div className="m-content">
//             <div className="m-header">
//               <h2>{menu.name}</h2>
//               <span className="m-close" onClick={onClose}>
//                 &times;
//               </span>
//             </div>
//             <div className="m-body">
//               <p>Price: ${menu.price}</p>
//               <p>
//                 Quantity: <span>{this.state.quantity}</span>
//                 <button
//                   onClick={() => this.increseQuantity()}
//                   className="btn btn-secondary btn-sm m-2"
//                 >
//                   +
//                 </button>
//                 <button
//                   onClick={() => this.decreseQuantity()}
//                   className="btn btn-secondary btn-sm"
//                   disabled={this.quantity === 0}
//                 >
//                   -
//                 </button>
//               </p>
//             </div>
//             <div className="m-footer">
//               <button className="btn btn-outline-primary">Close</button>
//             </div>
//           </div>
//         </div>
//       </>,
//       document.getElementById("portal")
//     );
//   }
// }

// export default Modal;
