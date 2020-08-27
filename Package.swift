// swift-tools-version:5.2
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "vimari",
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
        .package(url: "https://github.com/nicklockwood/SwiftFormat", from: "0.45.6"),
        .package(url: "https://github.com/Realm/SwiftLint", from: "0.40.0"),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages this package depends on.
      .target(name: "Vimari", dependencies: [], path: "Vimari", sources: []),
    ]
)
