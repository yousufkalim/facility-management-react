import ReactHtmlParser from 'react-html-parser';

function SelectableTag({ text, color, icon, isSelected, onClick, divStyle, imgStyle, pStyle, disabled }) {
  return (
    <div
      className="row ajc"
      style={{
        cursor: 'pointer',
        marginRight: '5pt',
        borderRadius: '20px',
        backgroundColor: isSelected ? '#D8ECFF' : color ? color : '#F4F4F4',
        pointerEvents: disabled ? 'none' : 'auto',
        marginBottom: '1%',
        ...divStyle,
      }}
      onClick={onClick}
    >
      {icon ? (
        <img
          style={{ height: '14px', width: '14px', margin: '0 5pt', filter: isSelected ? '' : 'grayscale(100%)', ...imgStyle }}
          src={icon}
        />
      ) : (
        <></>
      )}
      <p
        style={{
          fontSize: '12px',
          whiteSpace: 'nowrap',
          padding: '5px',
          color: isSelected ? '#00109E' : '#8C8C8C',
          ...pStyle,
        }}
      >
        {ReactHtmlParser(text)}
      </p>
    </div>
  );
}

export default SelectableTag;
