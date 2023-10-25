import "./body.style.scss";
import Timer from "../timer";
import Product from "../product.jsx";
import MyProvider from '../MyProvider.jsx'; // Import the provider
import SomeComponent from '../SomeComponent.jsx'; // Import a component that uses the context

const Body = () => {
  return (
    <>
      <div className="background-style">
        <div className="background-container element"></div>
        <div className="background-container middle">
          <input
            className="search-container"
            type="text"
            placeholder="Search..."
            name="search"
          ></input>
        </div>
        <div className="background-container element"></div>
      </div>
      <div>
        <Timer />
      </div>
      <div>
      <MyProvider>
      <div>
        <h1>My App</h1>
        <SomeComponent />
      </div>
    </MyProvider>

      </div>
      <div>
        <Product />
      </div>
    </>
  );
};
export default Body;
