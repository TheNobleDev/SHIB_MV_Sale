const dotenv = require('dotenv');
const ethers = require('ethers');
const fs = require('fs');
const addresses = require('./addresses.json');

const envPath = "../.env";
dotenv.config({path: envPath});

const main = async () => {
	const signer = new ethers.Wallet(process.env.SIGNING_PRIVATE_KEY);
	console.log("Signing with Wallet:", signer.address);

	let signedMessages = {};

	console.log(`Signing ${addresses.length} Wallets`);
	for (let address of addresses) {
		let messageHash = ethers.utils.solidityKeccak256(["address"], [address]);
		let signature = await signer.signMessage(ethers.utils.arrayify(messageHash));
	    signedMessages[address] = signature;
	}

	fs.writeFileSync('./signatures.json', JSON.stringify(signedMessages, null, 2), 'utf8');
	console.log("\nSignatures Written > `./signatures.json`");
}
const runMain = async () => {
    try {
        await main(); 
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
runMain();
