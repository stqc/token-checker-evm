const ethers = require("ethers");
const jso= require("./out/HoneyPot2.sol/HoneyPot_v3.json");
const erc = require("./out/unirouter.sol/IERC20.json");

const provider_ = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

const args=process.argv.slice(2);

const main = async()=>{
  
  console.log(args);
  
  await provider_.send(method="anvil_impersonateAccount",params=[args[0]])

  const sigerns=  await provider_.getSigner(args[0]);

  const byteC= jso.bytecode.object.slice(2)

  const contract_ = new ethers.ContractFactory(abi= jso.abi,bytecode=byteC);

  const abc = contract_.connect(sigerns);

  let {data} = await abc.getDeployTransaction(args[1],args[2],args[3], Number(args[4])*10000,{from:args[0]});

  const x = await ethers.getCreateAddress({from:"0x0000000000000000000000000000000000000000",nonce:await provider_.getTransactionCount("0x0000000000000000000000000000000000000000")});
  
  await provider_.send("anvil_setBalance", [
    x,
    "0x1000000000000000000000000000000000",
  ]);
  const outp = await provider_.call({data})

  const o = new ethers.AbiCoder(); 

  const out=o.decode(["bool","bool"],outp);
  
  console.log("is HoneyPot?: "+out[0]);
  console.log("Has Sufficient LP for 0.1 Ether trade: "+out[1]);

}

main()