//colors
const orange = 'rgba(246,157,60,0.9)';
const greyblack = 'rgba(39, 37, 39, 0.7)';
const green = 'rgba(255,69,0, 0.9)';
const greenShadow = 'rgba(255,69,0, 0.3)'

//nav
const nav = document.querySelector('.nav');
const carouselSection = document.querySelector('.carousel');
const hamburger = document.querySelector('.hamburger');
const line1 = document.querySelector('.hamburger__first');
const line2 = document.querySelector('.hamburger__second');
const line3 = document.querySelector('.hamburger__third');
const navList = document.querySelector('.nav__list');
const links = document.querySelectorAll('.nav__list li');
const logo = document.querySelector('.nav h5');
const logoHTML = document.querySelector('.nav h5 a');




//overlay
const freeBTN = document.querySelector('.freeBTN');
const closeOverlay = document.getElementById('closeOverlay');
const overlay = document.querySelector('.overlay');
const contactBTN = document.querySelector('.overlay__contactBTN');

//carousel
const carouselSlides = document.querySelectorAll('.carousel__inner');
const carouselVideo = document.querySelectorAll('.carousel__photo');
const dots = document.querySelectorAll('.carousel__dots--dot');
let slideNr = 0;
let play;



const slide = (currentIndex) => {
    dots.forEach((dot) => {
       
        dot.classList.remove('active--dot');
    });


    carouselVideo.forEach((video) => {
        video.classList.remove('active--video')
    });

    carouselSlides.forEach((slide) => {
        slide.classList.remove('active--slide')
    });

    dots[currentIndex].classList.add('active--dot');
    carouselVideo[currentIndex].classList.add('active--video');
    carouselSlides[currentIndex].classList.add('active--slide');
}

dots.forEach((dot, i) => {
       
    dot.addEventListener('click', 
    () => {
        slide(i);
    })

});

    const autoplay = () => {
        play = setInterval(function () {

            dots.forEach((dot) => {
        
                dot.classList.remove('active--dot');
            });
        
        
            carouselVideo.forEach((video) => {
                video.classList.remove('active--video')
            });
        
            carouselSlides.forEach((slide) => {
                slide.classList.remove('active--slide')
            });

        
            slideNr++;

            if (slideNr > (carouselSlides.length - 1)) {
                slideNr = 0;
            }
        
            dots[slideNr].classList.add('active--dot');
            carouselVideo[slideNr].classList.add('active--video');
            carouselSlides[slideNr].classList.add('active--slide');
        
        }, 5000);
    };
    autoplay()
  
// change nav, logo on scroll
const scrollOptions = {
    root:null,
    threshold: 0.5,
    rootMargin: '0px 0px 0px 0px'
};


const scrollObserver = new IntersectionObserver((entries, scrollObserver) => {
    entries.forEach(entry => {
    if ((!entry.isIntersecting) && (window.innerWidth > 1024)) {
        nav.classList.add('inverse');
        links.forEach(link => {
            link.classList.add('inverse__links')
        })
    } else {
        nav.classList.remove('inverse');
        links.forEach(link => {
            link.classList.remove('inverse__links')
        })
        }


    if (!entry.isIntersecting) {
        freeBTN.style.letterSpacing = '1px';
        freeBTN.style.boxShadow = `0px 5px 10px 2px ${greyblack}`;
            
    } else {
        freeBTN.style.letterSpacing = '2px';
        freeBTN.style.boxShadow = 'none';
    }

    if ((!entry.isIntersecting) && (window.innerWidth <= 1024)) {
        logoHTML.innerHTML = '<i class="fas fa-arrow-alt-circle-up"></i>';
        logo.style.top = '92vh';
        logo.style.right = '0.5rem';
           
    } else {
        logoHTML.innerHTML = 'Ubytování U Jaklů';
        logo.style.top = '1rem'; 
        }


       
        
    })
}, scrollOptions);

scrollObserver.observe(carouselSection);


//nav
hamburger.addEventListener('click', () => {
  
    navList.classList.toggle('open');

    links.forEach(link => {
        link.classList.toggle("visible");
       
    });

    line1.classList.toggle('cross--first');
    line2.classList.toggle('cross--second');
    line3.classList.toggle('cross--third');
});

if (window.innerWidth < 1025) {
    links.forEach(link => {
        link.addEventListener('click', e => {
            navList.classList.toggle("open");
            links.forEach(link => {
                link.classList.toggle("visible");
            });
        
        });
    });
    
}

//overlay
[freeBTN, closeOverlay, contactBTN].forEach(button => {
    button.addEventListener('click', e => {
        overlay.classList.toggle('active-overlay');
    })
})



// lazy loading carousel videos
// document.addEventListener("DOMContentLoaded", function() {
//     var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
  
//     if ("IntersectionObserver" in window) {
//       var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
//         entries.forEach(function(video) {
//           if (video.isIntersecting) {
//             for (var source in video.target.children) {
//               var videoSource = video.target.children[source];
//               if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
//                 videoSource.src = videoSource.dataset.src;
//               }
//             }
  
//             video.target.load();
//             video.target.classList.remove("lazy");
//             lazyVideoObserver.unobserve(video.target);
//           }
//         });
//       });
  
//       lazyVideos.forEach(function(lazyVideo) {
//         lazyVideoObserver.observe(lazyVideo);
//       });
//     }
// });
  
document.addEventListener("DOMContentLoaded", () =>  {
    const lazyVideos = document.querySelectorAll(".lazy");
  
    if ("IntersectionObserver" in window) {
     const lazyVideoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            for (var source in entry.target.children) {
              const videoSource = entry.target.children[source];
              if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                videoSource.src = videoSource.dataset.src;
              }
            }
  
            entry.target.load();
            entry.target.classList.remove("lazy");
            lazyVideoObserver.unobserve(entry.target);
          }
        });
      });
  
      lazyVideos.forEach((lazyVideo) => {
        lazyVideoObserver.observe(lazyVideo);
      });
    }
  });