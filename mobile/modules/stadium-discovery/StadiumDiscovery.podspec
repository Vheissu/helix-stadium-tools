require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))
Pod::Spec.new do |s|
  s.name = 'StadiumDiscovery'
  s.version = package['version']
  s.summary = 'Find Helix Stadium devices on the local network.'
  s.homepage = 'https://github.com/Vheissu/helix-editor'
  s.license = 'MIT'
  s.author = 'Dwayne Charrington'
  s.source = { :git => 'https://github.com/Vheissu/helix-editor.git' }
  s.platform = :ios, '15.1'
  s.source_files = 'ios/**/*.{h,m,mm}'
  s.requires_arc = true
  s.dependency 'React-Core'
end
