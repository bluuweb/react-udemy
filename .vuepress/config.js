module.exports = {
  title: 'React Udemy',
  description: 'Aprende React Hooks con bluuweb',
  base: '/react-udemy/',
  locales:{
    '/':{
      lang: 'es-ES'
    }
  },
  themeConfig:{
    nav: [
      { text: 'Guía', link: '/' },
      // { text: 'Guia', link: '/docs/' },
      { text: 'Youtube', link: 'https://youtube.com/bluuweb' },
    ],
    sidebar:
      [
        '/',
        '/01-proyecto/',
        '/02-hooks-fundamentos/',
        '/03-jsx/',
        '/04-formularios/',
        '/04-02-simple-crud/',
        '/05-components/',
        '/06-router/',
        '/07-crud-firestore/',
        '/08-auth/',
      ]
  }
 
}