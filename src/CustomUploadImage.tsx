import { styled } from "@mui/material";

const StyledUploadFileInput = styled("div")(() => ({
  borderRadius: "15px",
  marginBottom:"10px",
  backgroundColor: "grey",
  
  " & input[type='file']": {
    visibility: "hidden",
    width: "1px",
  },
  " & div": {
   
    borderColor: "#ccc",
    color: "black",
    padding: "3px 0",
    borderRadius: "15px",
    cursor: "pointer",
    width: "300px",
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
  ref
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
    <div style={{display:"flex", justifyContent:"center"}}>
      <label htmlFor="file" style={{fontWeight:"600", textAlign:"center"}}>Select a NFT</label>
      <input
        type="file"
        onChange={(e) => {
          onChange(e);
        }}
        id="file"
        accept="image/*"
      />
    
    </div> 
    {children}
  </StyledUploadFileInput>
  );
}
