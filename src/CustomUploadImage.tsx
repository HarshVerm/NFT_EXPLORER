import { styled } from "@mui/material";

const StyledUploadFileInput = styled("div")(() => ({
  " & input[type='file']": {
    visibility: "hidden",
    width: "1px",
  },
  " & div": {
    backgroundColor: "#ddd",
    borderColor: "#ccc",
    color: "#333",
    padding: "3px 0",
    borderRadius: "5px",
    cursor: "pointer",
    width: "195px",
    textAlign: "center",
  },
  "& label": {
    cursor: "pointer",
    padding: "3px 53px",
  },
}));
export default function CustomUploadImage({
  children,
  value,
  onChange,
  disabled,
  accept,
  ref,
}: any) {
  return (
    // <label
    //   htmlFor="contained-button-file"
    //   className="m-0 w-100"
    //   style={{
    //     display: "flex",
    //     border: "1px solid black",
    //     width: "300px",
    //     justifyContent: "center",
    //     padding: "10px",
    //     margin: "10px",
    //     marginLeft: "0",
    //     marginRight: "0",
    //   }}
    // >
    //   <input
    //     value={value}
    //     accept={accept}
    //     disabled={disabled}
    //     ref={ref}
    //     style={{ display: "none" }}
    //     id="contained-button-file"
    //     type="file"
    //     onChange={(e) => onChange(e)}
    //     onDrop={e=>onChange(e)}
    //   />
    //   {children}
    // </label>

    <StyledUploadFileInput>
    <div>
      <label htmlFor="file">Select a file</label>
      <input
        type="file"
        onChange={(e) => {
          onChange(e);
        }}
        id="file"
        accept="application/pdf"
      />
    </div>
  
  </StyledUploadFileInput>
  );
}
