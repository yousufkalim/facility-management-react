import ReactHtmlParser from 'react-html-parser';
import { hexToRGBA } from '../utils/Helpers';
import SBSettingsBuildingIconUnSelected from '../assets/SBSettingsBuildingIconUnSelected.svg';
import { hexToCSSFilter } from 'hex-to-css-filter';

function SelectableTag({ text, color, icon, isSelected, onClick, divStyle, imgStyle, pStyle, disabled, profilePicture, image }) {
  console.log(color, 'kl');
  return (
    <div
      className="row ajc"
      style={{
        cursor: 'pointer',
        marginRight: '5pt',
        padding: '0% 2%',
        borderRadius: '20px',
        backgroundColor: isSelected ? '#D8ECFF' : color ? hexToRGBA(color) : '#F4F4F4',
        pointerEvents: disabled ? 'none' : 'auto',
        marginBottom: '1%',
        ...divStyle,
      }}
      onClick={onClick}
    >
      {icon ? (
        <img
          style={{
            height: '14px',
            width: '14px',
            margin: '0 5pt',
            filter: isSelected ? '' : color ? hexToCSSFilter(color).filter.replace(';', '') : '',
            ...imgStyle,
          }}
          src={SBSettingsBuildingIconUnSelected}
        />
      ) : (
        <></>
      )}
      {image ? (
        <img
          style={{
            height: '14px',
            width: '14px',
            margin: '0 5pt',
            borderRadius: '50%',
            ...imgStyle,
          }}
          src={profilePicture}
        />
      ) : (
        <></>
      )}
      {/* {console.log(typeof hexToCSSFilter(color).filter, 'color>>>>>')} */}

      <p
        style={{
          fontSize: '12px',
          whiteSpace: 'nowrap',
          padding: '5px',
          color: isSelected ? '#00109E' : color ? hexToRGBA(color) : '#8C8C8C',
          ...pStyle,
        }}
      >
        {ReactHtmlParser(text)}
      </p>
    </div>
  );
}

export default SelectableTag;
