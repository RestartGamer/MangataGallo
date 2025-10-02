
let articles = [
  {
    id: "navbar_1",
    type: "navbar-list",
    content: {
      option: "Rings",
      sections: [
        {
          section: "craft",
          sectionName: "Craft",
          listItems: [
            "Engagement Rings for Every Love Story",
            "Wedding Rings Crafted to Last",
            "Fashion Rings to Express Your Unique Style"
          ]
        },
        {
          section: "moments",
          sectionName: "Moments",
          listItems: [
            "Anniversary Rings to Celebrate Your Journey",
            "Promise Rings That Speak From the Heart",
            "Statement Rings for Bold Expressions",
            "Remembrance Rings for the Best Moments"
          ]
        }
      ]
    }
  },
  {
    id: "navbar_1",
    type: "navbar-list",
    content: {
      option: "Necklaces",
      sections: [
        {
          section: "design",
          sectionName: "Design",
          listItems: ["Pendants", "Chains", "Statement Necklaces"]
        },
        {
          section: "inspire",
          sectionName: "Inspire",
          listItems: ["Layered Looks", "Chains", "Minimalist Styles"]
        }
      ]
    }
  },
  {
    id: "navbar_1",
    type: "navbar-list",
    content: {
      option: "Earrings",
      sections: [
        {
          section: "craft",
          sectionName: "Craft",
          listItems: ["Studs", "Hoops", "Drop Earrings"]
        },
        {
          section: "stories",
          sectionName: "Stories",
          listItems: ["Everyday Essentials", "Statement Pieces"]
        }
      ]
    }
  },
  {
    id: "navbar_1",
    type: "navbar-list",
    content: {
      option: "Bracelets",
      sections: [
        {
          section: "craft",
          sectionName: "Craft",
          listItems: ["Bangles", "Chain-bracelets"]
        },
        {
          section: "moments",
          sectionName: "Moments",
          listItems: ["Friendship", "Personalized"]
        },
        {
          section: "ourluxurycollection",
          sectionName: "Our Luxury Collection",
          image: "media/bracelet-gold_2.jpg",
          imageSize: "100%",
          imagePosition: "center center"

        }
      ]
    }
  },
  {
    id: "navbar_1",
    type: "navbar-list",
    content: {
      option: "Watches",
      sections: [
        {
          section: "design",
          sectionName: "Design",
          listItems: ["Luxury watches", "Fashion watches"]
        },
        {
          section: "special",
          sectionName: "Special Lines",
          listItems: ["Modern Classics", "Heritage Styles"]
        }
      ]
    }
  },
  {
    id: "navbar_1",
    type: "navbar-list",
    content: {
      option: "Collections",
      sections: [
        {
          section: "stories",
          sectionName: "Stories",
          listItems: ["Seasonal Collections", "Limited Editions"]
        },
        {
          section: "inspire",
          sectionName: "Inspire",
          listItems: ["Collaborations", "Designer Lines"]
        }
      ]
    }
  },
    {
        id: "navbar_1",
        type: "navbar-list",
        content: {
            option: "Home", // stable key for logic
            sections: [
            {
                section: "none",
                sectionName: "none",
                listItems: "none"
            }
            ]
        }
    },
    {
        id: "navbar_1",
        type: "navbar-list",
        content: {
            option: "Contact", // stable key for logic
            sections: [
            {
                section: "none",
                sectionName: "none",
                listItems: "none"
            },
            {
                section: "inspire",
                sectionName: "Inspire",
                listItems: ["Collaborations", "Designer Lines"]
            }
            ]
        }
    },
    {
        id: "navbar_1",
        type: "navbar-list",
        content: {
            option: "About", // stable key for logic
            sections: [
            {
                section: "title",
                sectionName: "Who we are",
                listItems: "This is the description of our company."
            }
            ]
        }
    }
];


window.addEventListener("load", ()=> {

let cleared = false;
function renderArticles(articles) {
    articles.forEach(article => {
        switch (article.type) {
            case "navbar-list":
                createNavbarList(article);
                break;
            default:
                console.warn("Unknown article type:", article.type);
        }
    });
}

function createNavbarList(article) {
    const navbarOption = article.content.option;
    const container = document.getElementById(article.id);
    if (!container) return;
    if (!cleared)
    {
        container.innerHTML ="";
        cleared = true;
    }
    
    // Create option li and submenu li
    const li = document.createElement("li");
    li.classList.add("navbar__option");

    const a = document.createElement("a");
    a.classList.add("navbar__option-link");
    a.textContent = navbarOption;
    li.appendChild(a);

    const li2 = document.createElement("li");
    li2.classList.add("submenu");

    container.appendChild(li);
    container.appendChild(li2);

    // Use the newly created li2 as the submenu container
    const submenuElement = li2;
    submenuElement.classList.add(navbarOption);

    article.content.sections.forEach(section => {
        const sectionElement = document.createElement("div");
        sectionElement.classList.add("submenu__section");
        submenuElement.appendChild(sectionElement);

        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = section.sectionName;
        sectionElement.appendChild(sectionTitle);

        if (section.listItems && Array.isArray(section.listItems)) {
            const ul = document.createElement("ul");
            sectionElement.appendChild(ul);

            section.listItems.forEach(listItem => {
                const liItem = document.createElement("li");
                const aItem = document.createElement("a");
                aItem.textContent = listItem;
                aItem.href = "#";
                liItem.appendChild(aItem);
                ul.appendChild(liItem);
            });
        } else if (typeof section.listItems === "string" && section.listItems !== "none") {
            const p = document.createElement("p");
            p.textContent = section.listItems;
            sectionElement.appendChild(p);
        } else if (section.image) {
            const imgCont = document.createElement("div");
            imgCont.classList.add("submenu__section-image-container");
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("submenu__section-image");
            imgDiv.style.backgroundImage = `url(${section.image})`;
            imgDiv.style.backgroundSize = section.imageSize;
            imgDiv.style.backgroundPosition = section.imagePosition;
            sectionElement.appendChild(imgCont);
            imgCont.appendChild(imgDiv);
            sectionElement.classList.add("submenu__section--image");
        }
    });
}


renderArticles(articles);
});