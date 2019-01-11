module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: 'org.admirable.admirable-electron',
                productName: 'Admirable',
                artifactName: '${productName}-v${version}.${ext}'
            }
        }
    }
}