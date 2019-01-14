module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: 'com.admirable.Admirable',
                productName: 'Admirable',
                artifactName: '${productName}-v${version}.${ext}',
                publish: {
                    provider: 'github',
                    owner: 'htasha',
                    private: false
                },
                win: {
                    target: [{
                        target: "nsis",
                        arch: [
                            "x64",
                            "ia32"
                        ]
                    }]
                }
            }
        }
    }
}