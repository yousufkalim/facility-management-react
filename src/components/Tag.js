function Tag({ text, icon, color, enableSelect, isSelected, onClick, divStyle, imgStyle, pStyle }) {
  return (
    <div
      className="row ajc"
      style={{
        marginRight: "5pt",
        borderRadius: "20px",
        backgroundColor: color,
        ...divStyle,
      }}
    >
      {icon ? <img style={{ height: "14px", width: "14px", margin: "0 5pt", ...imgStyle }} src={icon} /> : <></>}
      <p
        style={{
          fontSize: "12px",
          whiteSpace: "nowrap",
          padding: "5px",
          ...pStyle,
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default Tag;
