import { useNavigate } from 'react-router-dom';

export default function Desktop() {
  const navigate = useNavigate();

  return (
    <div className ="desktop">
      <div className="desktop-apps">
        <File
          onDoubleClick={() => {
            navigate("/files");
          }}
          iconSrc={"cat.png"}
          fileName={"files"}
        ></File>
      </div>
    </div>
  );
}
function File({ iconSrc, fileName, onDoubleClick }) {
  return (
    <div className="file" onDoubleClick={onDoubleClick}>
      <img className="file-icon" src={iconSrc} alt="icon" />
      <p className="file-name white-font">{fileName}</p>
    </div>
  );
}
