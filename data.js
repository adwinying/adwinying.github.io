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

  projects: [
    {
      title: 'Hotel Hamlet',
      tags: ['PHP', 'Laravel', 'MySQL', 'Inertia.js', 'Vue.js', 'TypeScript', 'TailwindCSS', 'PHPUnit', 'Github Actions', 'Heroku'],
      description: 'A full-stack web application with a built-in reservation system.',
      img: 'projects_hotel_hamlet.jpg',
      url: 'https://hotel-hamlet.herokuapp.com/admin',
    },
    {
      title: 'Webdev',
      tags: ['Docker Compose', 'MySQL', 'PostgreSQL', 'Redis', 'Mailhog', 'Meilisearch'],
      description: 'A set of commonly used services in web development all bundled in a docker compose file.',
      img: 'projects_webdev.jpg',
      url: 'https://github.com/adwinying/webdev',
    },
    {
      title: 'Server Provisioning',
      tags: ['Terraform', 'Ansible', 'MergerFS', "Let's Encrypt", 'Wireguard'],
      description: 'Automated provisioning of homelab servers.',
      img: 'projects_server_provisioning.jpg',
      url: 'https://github.com/adwinying/server-provisioning',
    },
    {
      title: 'PinIt',
      tags: ['Node.js', 'Express.js', 'MongoDB', 'Vue.js', 'ESlint', 'Heroku'],
      description: 'A Node.js-based Pintrest clone.',
      img: 'projects_pinit.jpg',
      url: 'http://pins.nodeapp.iadw.in/',
    },
  ],

  connect: [
    {
      title: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://linkedin.com/in/adwinying',
    },
    {
      title: 'Github',
      icon: 'github',
      url: 'https://github.com/adwinying',
    },
    {
      title: 'Email',
      icon: 'mail',
      url: 'mailto:adwinying[at]gmail[dot]com',
    },
  ],
}

export default data
