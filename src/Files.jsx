export default function Files() {
  return (
    <>
      <header className="header">
        <h2>ilmn25/art</h2>
      </header>
      <div className="file-viewer">
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
        <File></File>
      </div>
    </>
  );
}
function File() {
  return (
    <div className="file">
      <img className="file-icon" src="cat.png" alt="icon" />
      <p className="file-name" >illu.png</p>
    </div>
  );
}
