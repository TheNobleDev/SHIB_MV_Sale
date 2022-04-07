const ethers = require('ethers');

const main = async () => {
	
	const LandRegistry = await hre.ethers.getContractFactory("LandRegistry");
  	const landRegistry = await LandRegistry.attach("0xDEAA0D9Db2596de812B95D3796a52bE72fcef122");

	for (var i = -10; i < 10; i++) {
		for (var j = -10; j < 10; j++) {
			let encodedValue = await landRegistry.encode(i, j);

			console.log(i, j, encodedValue);
		}	
	}
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
