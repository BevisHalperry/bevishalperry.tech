$(document).ready(function() {
  //when the page is loaded, instatiate a array of javascript objects with the following data
  var projects = [
    {
      name: "Lightbloom",
      desc: "An ongoing exploration into human response to light. "+
      "2 Sound responsive Light Machines created so far: " +
      " WOCOBIDA (Wireless OSC COntrolled BIoluminesent Dinoflaggulate Agitator) "+
      "and Nostromo a weave of MIDI controlled LED backpanels.",
      img: "lightbloom.jpg",
      link: "./assets/pdf/ProjectLightbloom.pdf"
    },
    {
      name: "Anti-Tinfoil Hat",
      desc: "A Breton mariner hat with neopixels LED's that activate " +
      "different colours depending on the surrounding wifi network strength " +
      "and security. Powered by a Particle Photon.",
      img: "antitinfoil.jpg",
      link: "https://www.particle.io/"
    },
    {
      name: "Hacksmiths",
      desc: "Was President of Goldsmiths technology society for 2 years 2015-2017 "+
      "Organising 3 Hackathons (Anvil Hack, Hackcess and Anvil Hack II) and creating "+
      "a committee for the future. ",
      img: "hacksmiths.jpg",
      link: "https://www.goldsmiths.tech"
    },
    {
      name: "May the film be with you",
      desc: "A p5.js program that take a film as input and creates the iconic Star Wars "+
      "intro scroller using the plot summary of the film.",
      img: "starwarsintro.jpg",
      link: "https://github.com/BevisHalperry/StarWarsNewsScroller"
    },
    {
      name: "Printrbot",
      desc: "Hand built rep-rap style 3D printer, printrbot simple metal, "+
      "upgrading it with a heated bed and upgraded hotend for use with high temp thermoplastics like nylon and "+
      "added a Raspberry Pi print server with camera.",
      img: "printrbot.jpg",
      link: "http://printrbot.com/project/simple-metal/"
    },
    {
      name: "Zoobeacon",
      desc: "At Zoohackathon 2017 I lead a team to create a eddystone beacon activated single page web" +
      "app to enhance the zoo experience with unobtrusive up-to-date digital factsheets" +
      "with a conservation focus. I wrote the API using express.js and mongodb",
      img: "zoobeacon.png",
      link: "https://devpost.com/software/zoobeacon"
    },
  ];
 //just an array of strings for all my loves :)
  var loves = ["Rick & Morty", "Cheese", "Star Wars", "Sci-Fi", "Hackathons", "Physical Computing", "Graphic Novels", "Hacker Ethics", "Digital Rights", "Anarchism" ];


  function populateProjects() {
    function projectTemplate(i) {
      return '<li class="card">' +
      '<img src="./assets/img/projects/' + projects[i].img +
      '" alt="Photo of ' + projects[i].name + '">' +  //auto creating alt tags
      '<h2>' + '<a href="' + projects[i].link + '" target="_blank">' + projects[i].name + '</a>' + '</h2>' +
      '<p>' + projects[i].desc + '</p>' +
      '</li>'
    }

    for(var i=0; i<projects.length; i++) {
      $(".cards").append(projectTemplate(i));
    }
  }


  function chooseLove() {
    //finds random index of array of "loves"
    var random = Math.floor(Math.random() * loves.length);
    //adds html content to .content class
    $("#loves .content").html(loves[random]);
  }

  $(".btn#love").on("click", function() {
    chooseLove(); //on click jquery call back that called chooseLove with changed h2 tags content
  })

  chooseLove()
  populateProjects(); //runs project template function that returns html
  //which then is appened to cards class.

});
