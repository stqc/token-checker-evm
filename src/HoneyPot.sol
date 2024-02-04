pragma solidity ^0.8.0;

import "./unirouter.sol";


contract HoneyPot_v2{

    constructor(address router,address owner,address token0, address token1){
        
        address[] memory path;// path when buying
        address[] memory revPath;// path when selling
        
        //check whether token 1 is WETH or not if not make a 3 slot path for address else 2
        if(IUniswapV2Router02(router).WETH()!=token0){
            
            path=new address[](3);
            revPath= new address[](3); 

            path[0]=IUniswapV2Router02(router).WETH();
            path[1]=token0;
            path[2]=token1;

            revPath[0]=token1;
            revPath[1]=token0;
            revPath[2]=IUniswapV2Router02(router).WETH();
        
        }else{
            
            path=new address[](2);
            revPath= new address[](2);

            path[0]=token0;
            path[1]=token1;
            revPath[0]=token1;
            revPath[1]=token0;
        }
        
        bool isHoneyPot=true;
        bool sufficientLP=true;
        
        uint buytax;
        uint selltax;
            
            uint amountsOut = IUniswapV2Router02(router).getAmountsOut(0.1 ether,  path)[path.length-1];
            //try to purchase token1 if fails there is insufficent LP for a 0.1 Ether trade
            try IUniswapV2Router02(router).swapExactETHForTokensSupportingFeeOnTransferTokens{value:0.1 ether}(0, path, address(this), block.timestamp){
                    
                    
                    if(amountsOut>IERC20(token1).balanceOf(address(this))){//get the buy tax
                        buytax = ((amountsOut-IERC20(token1).balanceOf(address(this)))*1e18)/amountsOut;
                        buytax*=100;
                        
                    }

            }catch{
                sufficientLP=false;
            }
            
            IERC20(token1).approve(router, 100000000000000 ether); //approve spending

            amountsOut = IUniswapV2Router02(router).getAmountsOut(IERC20(token1).balanceOf(address(this)),  revPath)[revPath.length-1];
            uint256 prev = owner.balance; //get user balance before selling
            

            //try to sell the token, if it fails then it is a honeypot
            try IUniswapV2Router02(router).swapExactTokensForETHSupportingFeeOnTransferTokens(IERC20(token1).balanceOf(address(this)),0,revPath,owner,block.timestamp){
                    
                    uint256 newBal =  owner.balance-prev;
                    
                    if(amountsOut>newBal){ //get the sell tax
                        selltax = ((amountsOut-newBal)*1e18)/amountsOut;
                        selltax*=100;
                        
                    }

                   
                        isHoneyPot=false;
                    

            }catch{
                isHoneyPot=true;
            }
        
      

        //return the data

        bytes memory _abiEncodedData = abi.encode(isHoneyPot,sufficientLP,buytax,selltax);

        assembly{
              let dataStart := add(_abiEncodedData, 0x20)
        return(dataStart, sub(msize(), dataStart))
        }


    }
}