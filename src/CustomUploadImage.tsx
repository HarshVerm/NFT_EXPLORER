export default function CustomUploadImage({
  children,
  value,
  onChange,
  disabled,
  accept,
  ref,
}: any) {
  return (
    <label
      htmlFor="contained-button-file"
      className="m-0 w-100"
      style={{
        display: "flex",
        border: "1px solid black",
        width: "300px",
        justifyContent: "center",
        padding: "10px",
        margin: "10px",
        marginLeft: "0",
        marginRight: "0",
      }}
    >
      <input
        value={value}
        accept={accept}
        disabled={disabled}
        ref={ref}
        style={{ display: "none" }}
        id="contained-button-file"
        type="file"
        onChange={(e) => onChange(e)}
        onDrop={e=>onChange(e)}
      />
      {children}
    </label>
  );
}
