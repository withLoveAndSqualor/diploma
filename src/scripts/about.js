import '../styles/about.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import {CommitCard} from './components/CommitCard.js';
import {CommitsList} from './components/CommitsList.js';
import {GitHubApi} from './modules/GitHubApi.js';
Swiper.use([Navigation, Pagination]);


(function (){

  /*const swiper = new Swiper();*/

  const mySwiper = new Swiper('.swiper-container', {
    loop: true,
    init: true,
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    loopedSlides: 3,
    //slidesOffsetBefore: -322,
    //slidesOffsetAfter: -322,
    effect: "fade",
    //slidesPerGroup: 3,
    //loopAdditionalSlides: true,
    //freeMode: true,
    spaceBetween: 16,
    breakpoints: {
      320: {
          slidesPerView: 1,
          navigation: {
            hiddenClass: 'swiper-button-hidden',
          }
      },
      600: {
          slidesPerView: 2,
          spaceBetween: 2,
          navigation: {
            hiddenClass: 'swiper-button-hidden',
          }
      },
      800: {
          slidesPerView: 3,
          spaceBetween: 2,
      },
      1064: {
        slidesPerView: 4,
        spaceBetween: 16,
        //slidesOffsetBefore: -322,
        //slidesOffsetAfter: -322,
      }
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      clickable: true,
    },
    fadeEffect: {
      crossFade: true
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })

  const commitsContainer = document.querySelector('.swiper-wrapper');

  function commitsCardFill (itemData) {
    const commitCard = new CommitCard(itemData);
    return commitCard.create();
  }

  const gitHubApi = new GitHubApi();
  const commitsList = new CommitsList(commitsContainer, commitsCardFill);

  gitHubApi.getCommits()
    .then( res => commitsList.render(Array.from(res))
    )
    .catch ((err) => {
      console.log(err);
    })
}())
