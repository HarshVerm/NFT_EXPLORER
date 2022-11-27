import { Button, TextField } from "@mui/material";
import CustomUploadImage from "./CustomUploadImage";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function CreateNewNFT({
  title,
  setTitle,
  description,
  setDescription,
  uploadImage,
  createNFT,
  imageURL,
}: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* <div> */}

      <h2 style={{ textAlign: "center" }}>Create Your NFT</h2>
      <TextField
        placeholder="Title"
        variant="outlined"
        style={{ width: "300px", margin: "10px" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        placeholder="Description"
        variant="outlined"
        style={{ width: "300px", margin: "10px" }}
        multiline
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <CustomUploadImage onChange={(e: any) => uploadImage(e)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloudDownloadIcon />
          <div>{imageURL}</div>
        </div>
      </CustomUploadImage>

      {/* <label htmlFor="nft" style={{ width: "300px" }}>
      Choose a NFT Asset:
    </label>
    <input
      type="file"
      placeholder="Upload Image"
      name="nft"
      style={{ width: "300px", margin: "10px", marginTop: "0" }}
      accept="image/*"
      onChange={(e) => uploadImage(e)}
      onDragLeave={(e)=>uploadImage(e)}
    /> */}
      {/* </div> */}
      {/* {imageURL ? <img src={imageURL} /> : null} */}
      <Button variant="contained" onClick={createNFT}>
        Deploy Your NFT
      </Button>
    </div>
  );
}
