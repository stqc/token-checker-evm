# Token Checker for EVM chains

Tool to check for honeypot, liquidity, buy and sell taxes without spending a dime...safeguard your investments! (works with public RPCs)

### How to use

```shell
$ npm install
```
```shell
$ anvil --fork-url <Your-mainnet-rpc>
```
For testing tokens with v2 pool
```shell
$ node index.js <any-wallet-address> <router-address> <token-to-buy-with (wETH or token the tested token is pegged with)> <token-to-be-tested>
```
for example 
```shell
$ anvil --fork-url https://eth.llamarpc.com
$ node index.js <wallet-address-goes-here> 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 0xdAC17F958D2ee523a2206206994597C13D831ec7
```
The above should test for a uniswapv2 pool of wETH and USDT on the forked ETH Mainnet

For testing tokens with v3 pool
```shell
$ node v3.js <any-wallet-address> <router-address> <token-to-buy-with (wETH or token the tested token is pegged with)> <token-to-be-tested> <fee 1, 0.3 or 0.05 >
```
for example 
```shell
$ anvil --fork-url https://eth.llamarpc.com
$ node index.js <wallet-address-goes-here> 0xe592427a0aece92de3edee1f18e0157c05861564 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599 0.3
```
The above should test for a uniswapv3 pool of wETH and wBTC having a 0.3% fee on the forked ETH Mainnet

To run tests

```shell
$ npm run test
```
## Impersonating wallets to test blacklist functionalities ** Proposed Solution Not Yet Implemented **

The smart contracts in this repository can be used for simulating a transaction without spending any gas money using the constructor calls/returns
however it is not possible to check for different wallets as msg.sender for all calls will always be the smart contract address. These tests of impersonating a wallet *maybe* performed by forking an archive node and using *anvil_impersonateAccount* or *hardhat_impersonateAccount*

- Fork an archive node as it would contain more older block data than a full node (for testing a token state in a past block)
- Send a request through the localhost provider of *anvil_impersonateAccount* or *hardhat_impersonateAccount* with the params as the address to impersonate
- Send a transaction to the swap contract using the impersonated account (buying and selling)
- if the selling tx throws an error the address might be blacklisted, confirm it by sending the buying and selling transactions from *prefferably* newly created wallet impersonation

*This can be confrimed with a fork of a full node as well but states olders than 128 blocks might not be available*

Draw back for the said approach is that it will be slower than a smart contract call performing all these in one transaction


 
<!-- 
**NOTE: Uniswap V2 is fully supported, v3 might work but your mileage may vary** -->


**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
