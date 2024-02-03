# Token Checker for EVM chains

Tool to check for honeypot, liquidity, buy and sell taxes without spending a dime...sfaeguard your investments! (works with public RPCs)

### How to use

Run
```shell
$ npm install
```
```shell
$ anvil --fork-url <Your-mainnet-rpc>
```
```shell
$ node index.js <any-wallet-address> <router-address> <token-to-buy-with (wETH or token the tested token is pegged with)> <token-to-be-tested>
```

**NOTE: Uniswap V2 is fully supported, v3 might work but your mileage may vary**
## Foundry

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
