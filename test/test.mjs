import 'mocha';
import {ethers} from "ethers";
import jso from "../out/HoneyPot.sol/HoneyPot_v2.json" with {type:"json"};
import jso2 from "../out/HoneyPot2.sol/HoneyPot_v3.json" with {type:"json"};

import { expect } from 'chai';

describe("honey pot detector tests",()=>{
    let provider_;
    let sigerns;
    let byteC;
    let contract_;
    let abc;
    let byteC2;
    let contract_2;
    let abc2;
    const weth="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const router="0x7a250d5630b4cf539739df2c5dacb4c659f2488d";
    const router2="0xe592427a0aece92de3edee1f18e0157c05861564";
    
    before(async ()=>{
       
        provider_= new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        await provider_.send("anvil_impersonateAccount",["0x7679a32D8462c231e86077A02301f10144Ad2e0D"]);
    //    provider_.send()
        sigerns=  await provider_.getSigner("0x7679a32D8462c231e86077A02301f10144Ad2e0D");
        byteC= jso.bytecode.object.slice(2);
        byteC2=jso2.bytecode.object.slice(2);
        contract_ = new ethers.ContractFactory(jso.abi,byteC);
        contract_2 = new ethers.ContractFactory(jso2.abi,byteC2);
        abc2=contract_2.connect(sigerns);
        abc = contract_.connect(sigerns);
    })
    

    it("should return buy tax and sell tax of the token as 3% with address 0x1bb9b64927e0c5e207c9db4093b3738eef5d8447",async ()=>{

            let {data} = await abc.getDeployTransaction(router,sigerns.address,weth,"0x1bb9b64927e0c5e207c9db4093b3738eef5d8447",{from:sigerns.address});

            const x = await ethers.getCreateAddress({from:"0x0000000000000000000000000000000000000000",nonce:await provider_.getTransactionCount("0x0000000000000000000000000000000000000000")});

            await provider_.send("anvil_setBalance", [
                    x,
                    "0x1000000000000000000000000000000000",
                ]);
            const outp = await provider_.call({data})

            const o = new ethers.AbiCoder(); 

            const out=o.decode(["bool","bool","uint","uint"],outp);

            expect(out[0]).to.be.equal(false);//check for honeypot
            expect(out[1]).to.be.equal(true);//check for 0.1 ethers trading LP
            var buy=Math.round(Number(out[2])/1e18);
            var sell=Math.round(Number(out[3])/1e18);
            expect(buy).to.be.equal(3);//buy tax
            expect(sell).to.be.equal(3);//sell tax

    })

    it("should return buy and sell tax as 0 for the address 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",async ()=>{
        let {data} = await abc.getDeployTransaction(router,sigerns.address,weth,"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",{from:sigerns.address});

        const x = await ethers.getCreateAddress({from:"0x0000000000000000000000000000000000000000",nonce:await provider_.getTransactionCount("0x0000000000000000000000000000000000000000")});

        await provider_.send("anvil_setBalance", [
                x,
                "0x1000000000000000000000000000000000",
            ]);
        const outp = await provider_.call({data})

        const o = new ethers.AbiCoder(); 

        const out=o.decode(["bool","bool","uint","uint"],outp);

        expect(out[0]).to.be.equal(false);//check for honeypot
        expect(out[1]).to.be.equal(true);//check for 0.1 ethers trading LP
        var buy=Math.round(Number(out[2])/1e18);
        var sell=Math.round(Number(out[3])/1e18);
        expect(buy).to.be.equal(0);//buy tax
        expect(sell).to.be.equal(0);//sell tax
    })

    it("should perform the transaction successfully even when the token pairs is not weth/token", async ()=>{
        let {data} = await abc.getDeployTransaction(router,sigerns.address,"0xdac17f958d2ee523a2206206994597c13d831ec7","0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",{from:sigerns.address});

        const x = await ethers.getCreateAddress({from:"0x0000000000000000000000000000000000000000",nonce:await provider_.getTransactionCount("0x0000000000000000000000000000000000000000")});

        await provider_.send("anvil_setBalance", [
                x,
                "0x1000000000000000000000000000000000",
            ]);
        const outp = await provider_.call({data})

        const o = new ethers.AbiCoder(); 

        const out=o.decode(["bool","bool","uint","uint"],outp);

        expect(out[0]).to.be.equal(false);//check for honeypot
        expect(out[1]).to.be.equal(true);//check for 0.1 ethers trading LP
        var buy=Math.round(Number(out[2])/1e18);
        var sell=Math.round(Number(out[3])/1e18);
        expect(buy).to.be.equal(0);//buy tax
        expect(sell).to.be.equal(0);//sell tax
    })
// 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
    it("should work well with tokens have decimals that are not 18 for example USDC",async ()=>{
        let {data} = await abc.getDeployTransaction(router,sigerns.address,weth,"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",{from:sigerns.address});

        const x = await ethers.getCreateAddress({from:"0x0000000000000000000000000000000000000000",nonce:await provider_.getTransactionCount("0x0000000000000000000000000000000000000000")});

        await provider_.send("anvil_setBalance", [
                x,
                "0x1000000000000000000000000000000000",
            ]);
        const outp = await provider_.call({data})

        const o = new ethers.AbiCoder(); 

        const out=o.decode(["bool","bool","uint","uint"],outp);

        expect(out[0]).to.be.equal(false);//check for honeypot
        expect(out[1]).to.be.equal(true);//check for 0.1 ethers trading LP
        var buy=Math.round(Number(out[2])/1e18);
        var sell=Math.round(Number(out[3])/1e18);
        expect(buy).to.be.equal(0);//buy tax
        expect(sell).to.be.equal(0);//sell tax
    })

    it("should work without a fail with USDC token having 6 decimals traded with BTC",async ()=>{
        let {data} = await abc.getDeployTransaction(router,sigerns.address,"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599","0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",{from:sigerns.address});

        const x = await ethers.getCreateAddress({from:"0x0000000000000000000000000000000000000000",nonce:await provider_.getTransactionCount("0x0000000000000000000000000000000000000000")});

        await provider_.send("anvil_setBalance", [
                x,
                "0x1000000000000000000000000000000000",
            ]);
        const outp = await provider_.call({data})

        const o = new ethers.AbiCoder(); 

        const out=o.decode(["bool","bool","uint","uint"],outp);

        expect(out[0]).to.be.equal(false);//check for honeypot
        expect(out[1]).to.be.equal(true);//check for 0.1 ethers trading LP
        var buy=Math.round(Number(out[2])/1e18);
        var sell=Math.round(Number(out[3])/1e18);
        expect(buy).to.be.equal(0);//buy tax
        expect(sell).to.be.equal(0);//sell tax
    })

    it("should work with a Uniswap v3 pair",async ()=>{

        let {data} = await abc2.getDeployTransaction(router2,weth,"0x1BB9b64927e0C5e207C9DB4093b3738Eef5D8447",1*10000,{from:sigerns.address});

        const x = await ethers.getCreateAddress({from:"0x0000000000000000000000000000000000000000",nonce:await provider_.getTransactionCount("0x0000000000000000000000000000000000000000")});

        await provider_.send("anvil_setBalance", [
                x,
                "0x1000000000000000000000000000000000",
            ]);
        const outp = await provider_.call({data})

        const o = new ethers.AbiCoder(); 

        const out=o.decode(["bool","bool"],outp);

        expect(out[0]).to.be.equal(false);//check for honeypot
        expect(out[1]).to.be.equal(true);//check for 0.1 ethers trading LP
 
        }
        )

        it("should work with a Uniswap v3 not paired with weth",async ()=>{

            let {data} = await abc2.getDeployTransaction(router2,"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",1*10000,{from:sigerns.address});
    
            const x = await ethers.getCreateAddress({from:"0x0000000000000000000000000000000000000000",nonce:await provider_.getTransactionCount("0x0000000000000000000000000000000000000000")});
    
            await provider_.send("anvil_setBalance", [
                    x,
                    "0x1000000000000000000000000000000000",
                ]);
            const outp = await provider_.call({data})
    
            const o = new ethers.AbiCoder(); 
    
            const out=o.decode(["bool","bool"],outp);
    
            expect(out[0]).to.be.equal(false);//check for honeypot
            expect(out[1]).to.be.equal(true);//check for 0.1 ethers trading LP
     
            }
            )

            it("should *assume* honey pot and show insufficient LP for 0.1 ether trade if the pool does not exist ",async ()=>{

                let {data} = await abc2.getDeployTransaction(router2,weth,"0x1BB9b64927e0C5e207C9DB4093b3738Eef5D8447",20*10000,{from:sigerns.address});
        
                const x = await ethers.getCreateAddress({from:"0x0000000000000000000000000000000000000000",nonce:await provider_.getTransactionCount("0x0000000000000000000000000000000000000000")});
        
                await provider_.send("anvil_setBalance", [
                        x,
                        "0x1000000000000000000000000000000000",
                    ]);
                const outp = await provider_.call({data})
        
                const o = new ethers.AbiCoder(); 
        
                const out=o.decode(["bool","bool"],outp);
        
                expect(out[0]).to.be.equal(true);//check for honeypot
                expect(out[1]).to.be.equal(false);//check for 0.1 ethers trading LP
         
                }
                )
        
        


})