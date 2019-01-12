module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: 'com.admirable.Admirable',
                productName: 'Admirable',
                artifactName: '${productName}-v${version}.${ext}'
            }
        }
    }
}