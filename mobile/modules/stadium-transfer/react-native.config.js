/* global module */
module.exports = { dependency: { platforms: {
  android: { sourceDir: './android', packageImportPath: 'import com.helyon.transfer.StadiumTransferPackage;', packageInstance: 'new StadiumTransferPackage()' },
  ios: { podspecPath: './StadiumTransfer.podspec' },
} } };
