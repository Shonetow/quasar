export async function script ({ scope, utils }) {
  await utils.prompts(scope, [
    {
      type: 'select',
      name: 'engine',
      message: 'Pick Quasar App CLI variant:',
      initial: 0,
      choices: [
        { title: 'Quasar App CLI with Vite 6 (latest | v2)', value: 'vite-2', description: 'recommended' },
        { title: 'Quasar App CLI with Webpack (latest | v4)', value: 'webpack-4' },
        { title: '[Legacy] Quasar App CLI with Vite 2 (v1)', value: 'vite-1' },
        { title: '[Legacy] Quasar App CLI with Webpack (v3)', value: 'webpack-3' }
      ]
    },
    {
      type: 'text',
      name: 'name',
      message: 'Package name:',
      initial: () => utils.inferPackageName(scope.projectFolderName),
      validate: (val) =>
        utils.isValidPackageName(val) || 'Invalid package.json name'
    },

    utils.commonPrompts.productName,
    utils.commonPrompts.description,
    utils.commonPrompts.author,

    {
      type: 'select',
      name: 'sfcStyle',
      message: 'Pick a Vue component style:',
      initial: 0,
      choices: [
        { title: 'Composition API with <script setup>', value: 'composition-setup', description: 'recommended' },
        { title: 'Composition API', value: 'composition', description: 'recommended' },
        { title: 'Options API', value: 'options' }
      ]
    },

    {
      type: 'select',
      name: 'css',
      message: 'Pick your CSS preprocessor:',
      initial: 0,
      choices: [
        { title: 'Sass with SCSS syntax', value: 'scss' },
        { title: 'Sass with indented syntax', value: 'sass' },
        { title: 'None (the others will still be available)', value: 'css' }
      ]
    }
  ])

  const { script } = await import(`./${ scope.scriptType }-${ scope.engine }/index.js`)
  await script({ scope, utils })
}
