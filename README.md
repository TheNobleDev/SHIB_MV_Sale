## Setup
1. Run `npm install`
2. Copy `env.example` to `.env` and fill in the values.


## Deployment (for LockLeash & LockShiboshi)

1. Set the required gas values in `hardhat.config.js` (lines 39 and 45)
2. Deploy the contracts on **rinkeby** as: `npx hardhat run .\scripts\deploy.js --network rinkeby`
3. Deploy the contracts on **mainnet** as: `npx hardhat run .\scripts\deploy.js --network mainnet`

Note: The deploy script will automatically verify the contracts on etherscan as long as the API key in the .env file exists.
