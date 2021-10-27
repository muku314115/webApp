import config from "../config";
import { create } from 'ipfs-http-client';
import base64url from "base64url";
import sha1 from "crypto-js/sha1";
import Base64 from "crypto-js/enc-base64";
const pinataSDK= require('@pinata/sdk');

const pinata = pinataSDK(
    'a021b51c3eee8d65e427','b7422d9d3a4d275bbb43ea05599f706883e5163277124bb6e9c9b86b0dd0a4e2'
);

pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});

function SortObjectData(totalData) {
    const sortable = [];
    for (let item in totalData) {
        sortable.push([item, totalData[item]]);
    }

    const sorted = [];

    for (let i = 0; i<sortable.length ; i++) {
        if(sortable[i][0] === "URI"){
            sorted.unshift(sortable[i]);
        }else {
            sorted.push(sortable[i]);
        }
    }

    let objSorted = {};
    sorted.forEach(function(sortedItem){
        objSorted[sortedItem[0]]=sortedItem[1];
    });
    return objSorted;
}
async function IpfsPath(file) {
    const client = create(config.IPFS_URL);
    const added = await client.add(file);

    // const added = await client.add(
    // //     { path: file.name, content: file },
    // //     { wrapWithDirectory: true }
    // // );
    const options ={
        "name":file.name,
        "description":"adsfasfd",
        "image":"ipfs://"+added.path,
    };
    await pinataFile(options);
    console.log(added.path, "path");
    return added.path;
}
async function pinataFile(file, path){
    const options ={
        "name":file.name,
        "description":"adsfasfd",
        "image":"ipfs://"+path,
    };
    let result= await pinata.pinJSONToIPFS(options);
    console.log(result);
    return result;
}
function GetIpfsUrl(path) {
    console.log(path, "decod");
    // const updateFileUrl ="https://demo-assetmantle.mypinata.cloud/ipfs/"+.IpfsHash+"/"+file.name;
    const url = `https://ipfs.infura.io/ipfs/${path}`;
    return url;
}

function stringFilter(data, initialCharacter, replaceableText){
    const re = new RegExp(initialCharacter,"g");
    console.log(data.replace(re, replaceableText));
    return data.replace(re, replaceableText);
    // return data.replace(/${initialCharacter}/g, replaceableText);
    // return result;
}

function getUrlEncode(Url) {
    let UrlEncode;
    if (Url) {
        UrlEncode = base64url.encode(Url) + "=";
    }
    return UrlEncode;
}

function getBase64Hash(fileData) {
    var pwdHash = sha1(fileData);
    var joinedDataHashB64 = Base64.stringify(pwdHash);
    var finalHash = base64url.fromBase64(joinedDataHashB64) + "=";
    return finalHash;
}

export default {
    SortObjectData,
    IpfsPath,
    GetIpfsUrl,
    pinataFile,
    stringFilter,
    getUrlEncode,
    getBase64Hash
};