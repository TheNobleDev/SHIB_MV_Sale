## Setup
1. Run `npm install`
2. Copy `env.example` to `.env` and fill in the values.


## Deployment (for LockLeash & LockShiboshi)

1. Set the required gas values in `hardhat.config.js` (lines 39 and 45)
2. Deploy the contracts on **rinkeby** as: `npx hardhat run .\scripts\deploy.js --network rinkeby`
3. Deploy the contracts on **mainnet** as: `npx hardhat run .\scripts\deploy.js --network mainnet`

Note: The deploy script will automatically verify the contracts on etherscan as long as the API key in the .env file exists.


## Deployment (for LandRegistry & LandAuction)

1. Set the required gas values in `hardhat.config.js`, skip this step to use the current netwwork default values
2. Deploy the contracts on **rinkeby** as: `npx hardhat run .\scripts\deploy-sale.js --network rinkeby`
3. Deploy the contracts on **mainnet** as: `npx hardhat run .\scripts\deploy-sale.js --network mainnet`

Note: The deploy script will automatically verify the contracts on etherscan as long as the API key in the .env file exists.


## Deployment (for LandAuctionV2)

1. Set the required gas values in `hardhat.config.js`, skip this step to use the current netwwork default values
2. Deploy the contracts on **rinkeby** as: `npx hardhat run .\scripts\deploy-saleV2.js --network rinkeby`
3. Deploy the contracts on **mainnet** as: `npx hardhat run .\scripts\deploy-saleV2.js --network mainnet`

Note: The deploy script will automatically verify the contracts on etherscan as long as the API key in the .env file exists.


## WL Signing

1. Add `SIGNING_PRIVATE_KEY` in the env file (see .env.sample)
2. Populate the `scripts\addresses.json` file with all addresses to WL
3. Run the script as: `npx hardhat run .\scripts\wlSigning.js`
4. Output will be stored in `scripts\signatures.json` file


## Encoding (x,y) to a unique ID

1. Edit and run the script: `npx hardhat run .\scripts\encode.js --network rinkeby`
