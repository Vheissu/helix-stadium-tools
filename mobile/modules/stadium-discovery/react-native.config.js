/* global module */
module.exports = { dependency: { platforms: {
  android: { sourceDir: './android', packageImportPath: 'import com.helyon.discovery.StadiumDiscoveryPackage;', packageInstance: 'new StadiumDiscoveryPackage()' },
  ios: { podspecPath: './StadiumDiscovery.podspec' },
} } };
