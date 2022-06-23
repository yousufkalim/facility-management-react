const Spinner = require("react-spinkit");

function Loader({ spinnerColor, divStyle, spinnerStyle }) {
  return (
    <div
      className="wh100 column ajc"
      style={{
        ...divStyle,
      }}
    >
      <Spinner name="folding-cube" style={{ height: "40pt", width: "40pt", ...spinnerStyle }} color={spinnerColor ?? "#2F696D"} />
    </div>
  );
}

export default Loader;
