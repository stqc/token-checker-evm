const hre = require("hardhat");
const {Web3, eth} = require('web3');
const ethers = require("ethers");
// const jso= require("./out/HoneyPot.sol/HoneyPot_v2.json");
const jso = require("./out/getAdd.sol/HoneyPot_v2.json");
// const erc = require("./abi.json");

// const prov = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const provider_ = new ethers.JsonRpcProvider("http://127.0.0.1:8545");


const main = async()=>{

    
//   await provider_.send(method="anvil_impersonateAccount",params=["0x6DB133E840376555A5aD5c1D7616872EF57e7F13"])
//   const sigerns=  await provider_.getSigner("0x6DB133E840376555A5aD5c1D7616872EF57e7F13");
    // console.log(await provider_.getBlockNumber())
    // provider_.send("anvil_setBalance", [
    //     "0x6DB133E840376555A5aD5c1D7616872EF57e7F13",
    //     "0x10000000000000000000000000000000000000",
    //     ]);

    // await hre.network.provider.send("hardhat_setBalance", [
    //     await sigerns[0].address,
    //     "0x100000000000000000000000000000000000000000000",
    //   ]);

    
    // console.log(await provider_.getBalance(sigerns.address),sigerns.address);

const byteC= jso.bytecode.object.slice(2);

const contract_ = new ethers.ContractFactory(abi= jso.abi,bytecode=byteC);


// let d= await contract_.connect(sigerns).deploy()
let {data} = await contract_.getDeployTransaction({from:"0x6DB133E840376555A5aD5c1D7616872EF57e7F13"});
// const ContAdd=await d.getAddress();
// const x = await ethers.getCreateAddress({from:sigerns.address,nonce:await provider_.getTransactionCount(sigerns.address)});

// console.log(d)
const outp = await provider_.call({data})



const o = new ethers.AbiCoder(); 


console.log(o.decode(["address","address"],outp));
console.log(outp);
// console.log(x)

// await provider_.send("anvil_setBalance", [
//     ContAdd,
//     "0x1000000000000000000000000000000000",
//   ]);
// console.log(await provider_.getBalance(d.getAddress()))

// const data =await d.checkHoneyPot("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c","0x2170Ed0880ac9A755fd29B2688956BD959F933F8");
// console.log(data)
// const contract_parse = new ethers.Interface(jso.abi);
// console.log(contract_parse.parseTransaction({data:data.data}));
// console.log(await d.name());


}
main()



// const hre = require("hardhat");
// const {Web3, eth} = require('web3');
// const ethers = require("ethers");
// const jso= require("./out/HoneyPot.sol/HoneyPot_v2.json");
// // const addJSo = require("./out/getAdd.sol/HoneyPot_v2.json");
// // const erc = require("./abi.json");

// // const prov = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
// const provider_ = new ethers.JsonRpcProvider("http://127.0.0.1:8545");


// const main = async()=>{
//   await provider_.send(method="anvil_impersonateAccount",params=["0x6DB133E840376555A5aD5c1D7616872EF57e7F13"])
//   const sigerns=  await provider_.getSigner("0x6DB133E840376555A5aD5c1D7616872EF57e7F13");
//     console.log(await provider_.getBlockNumber())
//     provider_.send("anvil_setBalance", [
//         "0x6DB133E840376555A5aD5c1D7616872EF57e7F13",
//         "0x10000000000000000000000000000000000000",
//         ]);

//     // await hre.network.provider.send("hardhat_setBalance", [
//     //     await sigerns[0].address,
//     //     "0x100000000000000000000000000000000000000000000",
//     //   ]);

    
//     console.log(await provider_.getBalance(sigerns.address),sigerns.address);

// const byteC= jso.bytecode.object.slice(2)

// const contract_ = new ethers.ContractFactory(abi= jso.abi,bytecode=byteC);





// // let d= await contract_.connect(sigerns).deploy()
// let d = await contract_.getDeployTransaction("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c","0x2170Ed0880ac9A755fd29B2688956BD959F933F8");
// // const ContAdd=await d.getAddress();
// const x = await ethers.getCreateAddress({from:sigerns.address,nonce:await provider_.getTransactionCount(sigerns.address)});
// // console.log(d)
// const outp = await provider_.call({d})

// const o = new ethers.AbiCoder(); 

// // console.log(o.decode(["bool"],outp));
// console.log(outp);
// console.log(x)

// // await provider_.send("anvil_setBalance", [
// //     ContAdd,
// //     "0x1000000000000000000000000000000000",
// //   ]);
// // console.log(await provider_.getBalance(d.getAddress()))

// // const data =await d.checkHoneyPot("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c","0x2170Ed0880ac9A755fd29B2688956BD959F933F8");
// // console.log(data)
// // const contract_parse = new ethers.Interface(jso.abi);
// // console.log(contract_parse.parseTransaction({data:data.data}));
// // console.log(await d.name());


// }
// main()