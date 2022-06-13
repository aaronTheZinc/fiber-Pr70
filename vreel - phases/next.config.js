// module.exports = (phase, {defaultConfig}) => {
//     if ('sassOptions' in defaultConfig) {
//         defaultConfig['sassOptions'] = {
//             includePaths: ['./src'],
//             prependData: `@import "/styles/sass/abstracts/_placeholders.scss";`,
//         }
//     }
//     return defaultConfig;
// }
module.exports = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}