import { Button, TextField } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Network, Alchemy } from "alchemy-sdk";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContract,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useSigner,
} from "wagmi";
import NFTCard from "../src/NFTCard";
import styles from "../styles/Home.module.css";
import { create } from "ipfs-http-client";
import CreateNewNFT from "../src/CreateNewNFT";

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const [alchemy, setAlchemy]: any = useState(null);
  const [nfts, setNFTs]: any = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");

  const nftAddress = "0xF914bE9F68F3081308CDCc008Ef96b9da4af8810";
  const abi = [
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_symbol", type: "string" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "_approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "_ids",
          type: "uint256[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "_values",
          type: "uint256[]",
        },
      ],
      name: "TransferBatch",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_operator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
      ],
      name: "TransferSingle",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
      ],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address[]", name: "accounts", type: "address[]" },
        { internalType: "uint256[]", name: "ids", type: "uint256[]" },
      ],
      name: "balanceOfBatch",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "string", name: "_uri", type: "string" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256[]", name: "ids", type: "uint256[]" },
        { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeBatchTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "id", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "uri",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const { data: signer, isError, isLoading } = useSigner();

  const contract = useContract({
    address: nftAddress,
    abi: abi,
    signerOrProvider: signer,
  });

  // const {data, isSuccess,write} = useContractWrite(config)

  useEffect(() => {
    const settings = {
      apiKey: "EqDEZsByOxi_3FnnLiJMC0yN1_nZMayJ", // Replace with your Alchemy API Key.
      network: Network.ETH_GOERLI,
    };

    const alchemy = new Alchemy(settings);
    setAlchemy(alchemy);
  }, []);

  const uploadImage = async (e: any) => {
    console.log(e.target.files[0].name);
    const auth =
      "Basic " +
      Buffer.from(
        "2I4kYBfI54asoDal5vQtD6jChKE" + ":" + "25978c66a890a21dbac06047ec2fbf6b"
      ).toString("base64");
    const client = create({
      url: "https://ipfs.infura.io:5001",
      headers: {
        authorization: auth,
      },
    });
    setImageURL(e.target.files[0].name);
    // const response = await client.add(e.target.files[0]);
    // setImageURL(`https://ipfs.io/ipfs/${response.path}`);
    // console.log(response);
  };

  const createNFT = async () => {
    if (!title || !description || !imageURL) {
      alert("All field required");
    } else {
      const metaData = {
        title,
        description,
        image: imageURL,
      };
      const auth =
        "Basic " +
        Buffer.from(
          "2I4kYBfI54asoDal5vQtD6jChKE" +
            ":" +
            "25978c66a890a21dbac06047ec2fbf6b"
        ).toString("base64");
      const client = create({
        url: "https://ipfs.infura.io:5001",
        headers: {
          authorization: auth,
        },
      });
      const response = await client.add(JSON.stringify(metaData));
    }
  };

  useEffect(() => {
    if (isConnected && alchemy && address) {
      fetchNFTs(address);
    }
  }, [isConnected, alchemy, address]);

  async function fetchNFTs(address: string) {
    const nftsForOwner = await alchemy.nft.getNftsForOwner(address);

    for (let index = 0; index < nftsForOwner?.ownedNfts.length; index++) {
      const currentNFT = nftsForOwner?.ownedNfts[index];
      const metaData = await axios(currentNFT?.tokenUri?.raw);

      nftsForOwner.ownedNfts[index].metaData = metaData.data;
    }
    // console.log(nftsForOwner.ownedNfts)

    setNFTs(nftsForOwner.ownedNfts);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <Button onClick={() => setOpenForm(true)} variant="contained">
          Create Nft
        </Button>
      </main>
      {openForm ? (
        <CreateNewNFT
          title={title}
          setTitle={setTitle}
          description={description}
          uploadImage={uploadImage}
          createNFT={createNFT}
          imageURL={imageURL}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {nfts?.map((nft: any, index: any) => (
            <NFTCard nft={nft} key={index +`${JSON.stringify(nft)}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
