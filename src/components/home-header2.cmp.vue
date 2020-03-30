<template>
  <header class="home-main-header2">
    <video h="100" class="home-main-header2-vid" autoplay loop >
      <source
        :src="require('../../public/video/homepage2.1.mp4')"
        type="video/mp4"
      />
      Your browser does not support HTML5 video.
    </video>
      <div class="home-header2-txt">
        <h2>Online inspire <span class="whiter">community.</span></h2>
        <h2>simple interaction <span class="whiter">marketplace.</span></h2>
        <h2>paintings, photography, <span class="whiter">design.</span> </h2>
        <h2>gallerior. make <span class="whiter">creativity</span>  count.</h2>
        <button>
          <router-link to="/artwork"> 
              Begin exploring now...
          </router-link>
        </button>
      </div>
  </header>
</template>