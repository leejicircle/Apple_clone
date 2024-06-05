import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// 장바구니 관련
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')
// const basketEl = document.querySelector('header .basket-starter .basket')
basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()   // window 객체 까지 전파되는것을 멈춤
  if(basketEl.classList.contains('show')) {
    hideBasket()
  }else {
    showBasket()
  }
})
//basket 클릭이벤트에도 이벤트 버블링이 발생하지 않도록 설정
basketEl.addEventListener('click',function (event) {
  event.stopPropagation()
})
//화면을 클릭했을때 이벤트 추가
window.addEventListener('click', function() {
  hideBasket()
})
//show 클래스가 추가되어 basket을 보여주는 함수
function showBasket () {
  basketEl.classList.add('show')
}
//show 클래스가 제거되어 basket을 숨기는 함수
function hideBasket () {
  basketEl.classList.remove('show')
}
// 검색 
const headerEl = document.querySelector('header')
const headerMenuEl = [...headerEl.querySelectorAll('ul.menu > li')] //... 전개연산자 | li태그들을 배열로 관리
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchshadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', function(event) {
  event.stopPropagation
  hideSearch()
})
searchshadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  stopScroll()
  delaysetting(headerMenuEl.reverse())
  delaysetting(searchDelayEls)
 
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
  
}
function hideSearch() {
  headerEl.classList.remove('searching')
  playScroll()
  delaysetting(headerMenuEl.reverse())
  delaysetting(searchDelayEls.reverse())
  searchDelayEls.reverse()
  
  searchInputEl.value = ''
}

function playScroll () {
  document.documentElement.classList.remove('fixed')
}
function stopScroll () {
  document.documentElement.classList.add('fixed')
}

// function Menudelay (){
//   this.forEach (function(el, index) {
//     el.style.transitionDelay = index * .4 / headerMenuEl.length + 's'
//   })
// }
// function searchDelay () {
//   searchDelayEls.forEach(function (el,index) {
//     el.style.transitionDelay = index * .4 / headerMenuEl.length + 's'
//   })
// }    아래 delay setting 함수로 함치기
function delaysetting (elements) {
  elements.forEach(function(el, index) {
      el.style.transitionDelay = index * .4 /elements.length +'s'
  })

}



// 헤더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function () {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing')
    searchInputEl.value = ''
    playScroll()
  } else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})

// 헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', function ()  {
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click', function () {
  headerEl.classList.remove('searching--mobile')
})

// 
window.addEventListener('resize', function () {
  if(this.window.innerWidth<=740) {
    headerEl.classList.remove('searching')
  }else {
    headerEl.classList.remove('searching--mobile')
  }
})
// navigation menu toggler
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function() {
  if(navEl.classList.contains('menuing')) {
    hideNavMenu()
  }else {
    showNavMenu()
  }
})
navEl.addEventListener('click', function(event) {
  event.stopPropagation() //버블링 방지
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)
function showNavMenu() {
  navEl.classList.add('menuing')
}
function hideNavMenu() {
  navEl.classList.remove('menuing')
}



// 요소의 가시성 관창
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach (function (el) {
  io.observe(el)
})

//비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')


playBtn.addEventListener('click',function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click',function () {
  video.pause()
  pauseBtn.classList.add('hide')
  playBtn.classList.remove('hide')
})


const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div') 
  itemEl.classList.add('item')
  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style=background-color:${color}></li>`
  })
  itemEl.innerHTML=  /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt= "${ipad.name}" />
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class = "name"> ${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
`
  itemsEl.append(itemEl)
})

const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function(nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList=""
  nav.maps.forEach(function (map) {
    mapList += /*html*/ `<li>
    <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */ `
  <h3>
    <span class="text">${nav.title}</span>
    <span class="icon">+</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `
  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()


//아코디언 메뉴 만들기
const mapEls = document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function (el) {
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', function () {
    el.classList.toggle('active')
  })
})
