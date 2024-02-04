pragma solidity ^0.8.0;

import "./unirouter.sol";


contract HoneyPot_v3{

    constructor(address router,address token0, address token1, uint fee,address routerv2){

        address weth = IPeripheryImmutableState(router).WETH9();

        IWETH(weth).deposit{value:1 ether}();
        IWETH(weth).approve(router, 100 ether);
        
        bool isHoneyPot=true;
        bool sufficientLP=true;
        uint amountOut;
        
        //check whether token 1 is WETH or not if not make a 3 slot path for address else 2
        if(weth!=token0){
            address[] memory path_= new address[](2);
            
            path_[0]=weth;
            path_[1]=token0;

            IUniswapV2Router02(routerv2).swapExactETHForTokensSupportingFeeOnTransferTokens{value:0.1 ether}(0, path_, address(this), block.timestamp);
           
            uint token0Bal= IERC20(token0).balanceOf(address(this));

            IERC20(token0).approve(router, token0Bal);

             ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: token0,
                tokenOut: token1,
                fee: uint24(fee),
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: token0Bal,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });


            // uint amountOut ;
            try ISwapRouter(router).exactInputSingle(params) returns(uint amount2){
                
                amountOut=amount2;

            }catch{

                sufficientLP=false;

            }

            IERC20(token1).approve(router, amountOut);

            ISwapRouter.ExactInputSingleParams memory params2 = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: token1,
                tokenOut: token0,
                fee: uint24(fee),
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountOut,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

            try ISwapRouter(router).exactInputSingle(params2) returns (uint256 amount2){
                        if (amount2 > 0){
                            isHoneyPot=false;
                        }
            }catch{

                isHoneyPot=true;

            }
                
        }else{
            ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: token0,
                tokenOut: token1,
                fee: uint24(fee),
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: 0.1 ether,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

            try ISwapRouter(router).exactInputSingle(params) returns (uint256 amount){
                    
                    amountOut=amount;

            }catch{
                sufficientLP=false;
            }

            IERC20(token1).approve(router, amountOut);
            ISwapRouter.ExactInputSingleParams memory params2 = ISwapRouter.ExactInputSingleParams({
                tokenIn: token1,
                tokenOut: token0,
                fee: uint24(fee),
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountOut,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

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