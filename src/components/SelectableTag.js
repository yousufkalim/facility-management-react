import ReactHtmlParser from 'react-html-parser';
import { hexToRGBA } from '../utils/Helpers';
import hexToRgba from 'hex-to-rgba';
import SBSettingsBuildingIconUnSelected from '../assets/SBSettingsBuildingIconUnSelected.svg';
import { hexToCSSFilter } from 'hex-to-css-filter';

function SelectableTag({
  text,
  color,
  icon,
  isSelected,
  onClick,
  divStyle,
  imgStyle,
  pStyle,
  disabled,
  profilePicture,
  image,
  categorieslevelscolor,
}) {
  return (
    <div
      className="row ajc"
      style={{
        cursor: 'pointer',
        marginRight: '5pt',
        padding: '0% 2%',
        borderRadius: '15px',
        // backgroundColor: isSelected ? '#D8ECFF' : color ? hexToRGBA(color) : '#F4F4F4',
        backgroundColor: isSelected ? hexToRgba(categorieslevelscolor ? categorieslevelscolor : '#ffffff', 0.3) : '#F4F4F4',
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
            filter: isSelected
              ? hexToCSSFilter(categorieslevelscolor ? categorieslevelscolor : '#ffffff').filter.replace(';', '')
              : '',
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
            height: '18px',
            width: '18px',
            margin: '0 2pt',
            borderRadius: '50%',
            ...imgStyle,
          }}
          src={profilePicture}
        />
      ) : (
        <></>
      )}
      <p
        style={{
          fontSize: '12px',
          whiteSpace: 'nowrap',
          padding: '5px',
          // color: '#8C8C8C',
          color: isSelected ? categorieslevelscolor : '#8C8C8C',
          ...pStyle,
        }}
      >
        {ReactHtmlParser(text.length > 30 ? text.slice(0, 30) + '..' : text)}
      </p>
    </div>
  );
}

export default SelectableTag;
