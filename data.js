const data = {
  navLinks: [
    { url: '#about', title: 'About' },
    { url: '#skills', title: 'Skills' },
    { url: '#projects', title: 'Projects' },
    { url: '#connect', title: 'Connect' },
  ],

  skills: [
    {
      title: 'Client Side',
      icon: 'user',
      contents: [
        'HTML | HTML5',
        'CSS | CSS3',
        'TailwindCSS',
        'JavaScript | ES6+',
        'TypeScript',
        'jQuery',
        'React | Redux',
        'Vue.js | Vuex',
        'Inertia.js',
      ],
    },
    {
      title: 'Server Side',
      icon: 'server',
      contents: [
        'PHP | Laravel',
        'Node.js | Express.js',
        'MySQL',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Web Sockets (Socket.io)',
      ],
    },
    {
      title: 'Others',
      icon: 'code',
      contents: [
        'C',
        'CI/CD (Github Actions | GitlabCI)',
        'Docker + Docker Compose',
        'Vagrant',
        'Ansible',
        'Elastic Stack',
        'LaTeX',
        'Git (Github | Gitlab)',
      ],
    },
  ],
}

export default data
