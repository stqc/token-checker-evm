pragma solidity ^0.8.0;

import "./unirouter.sol";


contract HoneyPot_v3{

    constructor(address router,address token0, address token1, uint24 fee){

        address weth = IPeripheryImmutableState(router).WETH9();

        IWETH(weth).deposit{value:1 ether}();
        IWETH(weth).approve(router, 100 ether);
        
        bool isHoneyPot=true;
        bool sufficientLP=true;
        uint amountOut;
        //check whether token 1 is WETH or not if not make a swap using router v2 to token0 
        if(weth!=token0){
        

             ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams(
                {path:abi.encodePacked(weth, fee, token0, fee, token1),
                recipient: address(this),
                 deadline: block.timestamp,
                amountIn: 0.1 ether,
                amountOutMinimum: 0
                }
             ) ;
          
            //try to make the swap if it fails then there is insufficient LP
            try ISwapRouter(router).exactInput(params) returns(uint amount2){
                
                amountOut=amount2;

            }catch{

                sufficientLP=false;

            }

            IERC20(token1).approve(router, amountOut);

            ISwapRouter.ExactInputParams memory params2 = ISwapRouter.ExactInputParams(
                {path:abi.encodePacked(token1, fee, token0, fee, weth),
                recipient: address(this),
                 deadline: block.timestamp,
                amountIn: amountOut,
                amountOutMinimum: 0
            });
           
            //make the swap back to token0 if it fails token is a honeypot
            try ISwapRouter(router).exactInput(params2) returns (uint256 amount2){
                        if (amount2 > 0){
                            isHoneyPot=false;
                        }
            }catch{

                isHoneyPot=true;

            }
                
        }else{
            //token0 is same as weth
            ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: token0,
                tokenOut: token1,
                fee: fee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: IERC20(token0).balanceOf(address(this))/10,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

            //try to make the swap if it fails then there is insufficient LP
            try ISwapRouter(router).exactInputSingle(params) returns (uint256 amount){
                    
                    amountOut=amount;

            }catch{
                sufficientLP=false;
            }

            IERC20(token1).approve(router, amountOut);
            ISwapRouter.ExactInputSingleParams memory params2 = ISwapRouter.ExactInputSingleParams({
                tokenIn: token1,
                tokenOut: token0,
                fee: fee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountOut,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
            
            //make the swap back to token0 if it fails token is a honeypot
            try ISwapRouter(router).exactInputSingle(params2)returns (uint amount2){
                if(amount2>0){
                    isHoneyPot=false;
                }
            }
            catch{
                isHoneyPot=true;
            }
           
        }

        //return the data

        bytes memory _abiEncodedData = abi.encode(isHoneyPot,sufficientLP);

        assembly{
              let dataStart := add(_abiEncodedData, 0x20)
        return(dataStart, sub(msize(), dataStart))
        }


    }
    
}