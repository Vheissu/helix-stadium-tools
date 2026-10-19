require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))
Pod::Spec.new do |s|
  s.name = 'StadiumTransfer'
  s.version = package['version']
  s.summary = 'Scoped song uploads to a Helix Stadium on the local network.'
  s.homepage = 'https://github.com/Vheissu/helix-editor'
  s.license = 'MIT'
  s.author = 'Dwayne Charrington'
  s.source = { :git => 'https://github.com/Vheissu/helix-editor.git' }
  s.platform = :ios, '15.1'
  s.source_files = 'ios/**/*.{h,m,mm}'
  s.requires_arc = true
  s.dependency 'React-Core'
  s.dependency 'libssh2-iosx', '1.11.1.0'
  s.dependency 'openssl-iosx', '3.6.5.1'
end
