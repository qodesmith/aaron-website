// Resume in JSON'y format.
// Used with thing-to-html for the awesome resume view.
var nerdResume = {
  name: "Aaron Cordova",
  contactInfo: {
    email: "theqodesmith@gmail.com",
    phone: "917-524-7817",
    github: "http://github.com/qodesmith",
    linkedin: "http://linkedin.com/in/cordovaaaron",
    website: "http://aaroncordova.xyz"
  },
  technicalSkills: ["JavaScript", "HTML", "CSS", "Backbone", "Node", "Express", "Sequelize", "Postgres", "Gulp", "Handlbars", "responsive design", "Photoshop", "Wordpress", "GIT", "Github"],
  experience: {
    Accenture: {
      location: "New York, NY",
      role: "Front End Developer",
      currentlyActive: true,
      startDate: {
        month: "July",
        year: 2015
      },
      endDate: null,
      technologyUsed: ["JavaScript", "jQuery", "HTML", "CSS", "LESS", "Grunt", "Node/NPM", "Bootstrap", "Photoshop", "GIT", "IBM Team Rational"],
      responsibilities: ["responsive design", "creating from comps", "QA", "client deliveries", "client demos", "international communication"],
      summary: "All-things front end... I work side-by-side with a great team here in NYC. Whether working with our off-shore teams or teams across the country, I'm part of a national front end practice engaged in client delivery. I take comps from our creative teams and bring them to life. Everything is responsive and Photoshop pixel perfect. Using Grunt (though I prefer Gulp) and Node, I'm able to deliver packages to our clients in an organized and timely fashion. Being able to share results by presenting live demonstrations to our clients and teams across the country is truly fulfilling."
    },
    "General Assembly": {
      location: "New York, NY",
      role: ["Instructional Associate", "Fullstack Developer", "student"],
      courseTaken: {
        name: "WDI: Web Development Immersive",
        description: "A 12-week full-time fullstack bootcamp.",
        url: "https://generalassemb.ly/education/web-development-immersive",
        startDate: {
          month: "February",
          year: 2015
        },
        endDate: {
          month: "May",
          year: 2015
        },
        projects: {
          "JAC Sound Factory": {
            description: "A sample playback application to record and save compositions.",
            details: ["Implemented a sound engine using the Web Audio API.", "Built a graphical equalizer as the page backgound with Canvas.js.", "Developed a custom record / playback sequencer with JavaScript.", "Used Backbone for the front end with a Postgres database on the back."],
            github: "https://github.com/qodesmith/JAC-Sound-Factory",
            url: "http://jac-sound-factory.herokuapp.com/"
          },
          "Qodesmith Blog": {
            description: "A personal blog with customized photo and video galleries.",
            details: ["User login security features included authentication, authorization, sessions, and cookies.", "Created a random, fading background gallery with pure JavaScript and CSS transitions.", "Spiced up the UI by manipulating DOM elements with jQuery.js", "Built using Backbone.js, Node.js and Handlebars.js"]
          },
          "Artist-Hub": {
            description: "An online community for performing artists to create a digital portfolio.",
            details: [ "Facilitated uploads of user images and songs to AWS S3", "Persisted user accounts into a PostgreSQL database using Sequelize on a Node server", "Encrypted user passwords with Bcrypt.js"]
          }
        }
      },
      instructionalAssociate: {
        startDate: {
          month: "August",
          year: 2015
        },
        endDate: null,
        currentlyActive: true,
        coursesTaught: {
          "FEWD: Front End Web Development": {
            description: "A 10-week part-time front end night course.",
            responsibilities: ["in-class support", "review student homework", "hold student office hours"],
            summary: "The part-time FEWD night course is a two-day a week front end course spanning 10 weeks. As an Instructional Associate, my reponsibilities include assisting students in class with their labs and assignments, reviewing their homework, and providing 2 hours outside of class to meet with students. Being able to assist others towards their goals in web development is gratifying on the deepest levels."
          },
          "Programming For Non-Programmers": {
            description: "A weekend course designed to help aspiring developers get started.",
            responsibilities: ["in-class support"],
            summary: "The PFNP course is a 2-day weekend course designed to help aspiring developers get started. As an Instructional Associate, I'm responsible for assisting students throughout the class with technical and coding issues."
          }
        }
      }
    },
    Freelance: {
      location: "New York, NY",
      role: "Freelance Wordpress Designer",
      startDate: {
        month: null,
        year: 2010
      },
      endDate: {
        month: null,
        year: 2015
      },
      currentlyActive: false,
      technologyUsed: ["Wordpress", "CSS", "various plugins"],
      responsibilities: ["Customized themes with CSS, Adobe Photoshop, and various plugins.", "Integrated e-commerce solutions (EDD & Woocommerce) and maintained online stores.", "Maintained database and site backups via FTP with CRON jobs."],
      clients: ["In My City Records", "And/With Creative"]
    },
    "NYC Transit": {
      location: "New York, NY",
      role: "Track Worker",
      startDate: {
        month: "November",
        year: 2005
      },
      endDate: {
        month: "February",
        year: 2015
      },
      currentlyActive: false
    }
  },
  personalProjects: {
    Typer: {
      description: "An easy to use, choc-full-of-options, robust automated typing library.",
      github: "https://github.com/qodesmith/typer"
    },
    "Time Calculator": {
      description: "A calculator that can add and subtract times in the d:h:m:s format. Layout done in flexbox.",
      github: "https://github.com/qodesmith/time-calculator"
    },
    "Background Gallery": {
      description: "A smooth fullpage background gallery for websites with randomization feature.",
      github: "https://github.com/qodesmith/background-image-gallery"
    },
    "Deck Grid": {
      description: "An interactive graph-paper looking layout of my backyard to help me design a wooden deck.",
      github: "https://github.com/qodesmith/deck-grid"
    }
  }
}