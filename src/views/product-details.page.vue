<template>
  <section class='product-details-container-all'>
    <div class='product-details-container-main'>

      <div class='product-details-left-side-container'>
       <img @click='onBack' class='product-details-img-back btn' src='../../public/img/icons/left-arrow.png' alt='back' title="Back">
        <div class='product-details-preview-artwork'>
          <div class='product-details-img-main'>
            <img class='product-details-img-enlarge btn' src="../../public/img/svg/enlarge.svg" alt="Enlarge picture" title="Enlarge picture" @click="biger" />
            <img class='product-details-img-artwork' :class="frame" :src='artwork.imgURLs[0]' alt='artwork'>
         </div>
          <h4 class='product-details-img-title'>{{artwork.title}}</h4>
          <h4>{{artwork.desc}}</h4>
        </div>

        <hr class="product-details-hr">
        <div class='product-details-container-reviews'>
          <h2>Reviews:</h2>
          <ul class="product-details-reviews-list">
            <li class="product-details-review-prev" v-for='(review, index) in artwork.reviews' :key='index'>
              <div class="product-details-review-main-header">
                <img class="product-details-img-reviewer" :src='review.by.imgURL' alt='reviewer'>
                <div class="product-details-img-rev-inside">
                  <h3 class="product-details-review-fullName">{{review.by.fullName}}</h3>
                  <h5 class="product-details-review-rate">{{currRate(review.rate)}}</h5>
                </div>
              </div>
              <h4 class="product-details-review-txt">{{review.Txt}}</h4>
            </li>
          </ul>
        </div>
      </div>

        <div class="product-details-line"></div>

      <div class="product-details-aside-container">
        <div class="product-details-seller-main flex-center">
          <router-link :to="'/sellerGallery/'+artwork.createdBy._id">
            <img class="product-details-img-seller" :src="artwork.createdBy.imgURL" alt="Seller Picture">
          </router-link>
          <span class="product-details-span">|</span>
          <div class="product-details-seller-main2 flex-center">
            <router-link :to="'/sellerGallery/'+artwork.createdBy._id">
            <h4 class="product-details-seller-name">{{artwork.createdBy.fullName}}</h4>
            </router-link>
            <span class="product-details-span">|</span>
            <h4 class="product-details-seller-sales">{{artwork.salesCount}} sales</h4>
          </div>
       </div>
        <div class="product-details-aside-price">
          <h4 class="product-details-price-title">Price</h4>
          <h4 class="product-details-price-num">${{artwork.price}}</h4>
          <p class="product-details-free-shipping">Free worldwide shipping and returns</p>
        </div>

        <div class="product-details-buy-btn btn flex-center" @click='onBuy'>Buy Now</div>
        <div class="product-details-add-btn btn flex-center" @click='onCart' >Add To Cart</div>
        <div class="product-details-frame-btn-main">
          <h2>Frame Illustration:</h2>
            <div class="product-details-frame-btn-first">
                <div class="fr1 btn style-frame mrgR" @click="onChangeFrame(1)"></div>
                <div class="fr2 btn style-frame mrgR" @click="onChangeFrame(2)"></div>
                <div class="fr3 btn style-frame mrgR" @click="onChangeFrame(3)"></div>
            </div>
            <div class="product-details-frame-btn-seccond">
                <div class="fr4 btn style-frame mrgR" @click="onChangeFrame(4)"></div>
                <div class="fr5 btn style-frame mrgR" @click="onChangeFrame(5)"></div>
                <div class="fr6 btn style-frame mrgR" @click="onChangeFrame(6)"></div>
            </div>
        </div>
        <div class="product-details-policy-main">
          <hr/>
          <div class="product-details-all-policy-img">

            <div class="product-details-policy-main1">
              <div class="product-details-policy-flex-col">
                <img class="product-details-policy-img" src="../../public/img/svg/shipping-policy.svg" alt="shipping-policy">
                <h5 class="product-details-p">Shipping usually takes up to 7 days.</h5>
              </div>
              <div class="product-details-policy-flex-col">
                <img class="product-details-policy-img" src="../../public/img/svg/medal.svg" alt="shipping-policy">
                <h5 class="product-details-p">Original work delivered with a certificate of authenticity.</h5>
              </div>
            </div>

            <div class="product-details-policy-main2">
              <div class="product-details-policy-flex-col">
                <img class="product-details-policy-img" src="../../public/img/svg/return.svg" alt="shipping-policy">
                <h5 class="product-details-p">We have a 14 day withdrawal period, starting on the day you receive the work.</h5>
              </div>
              <div class="product-details-policy-flex-col">
                <img class="product-details-policy-img" src="../../public/img/svg/password.svg" alt="shipping-policy">
                <h5 class="product-details-p">You can pay safely by credit card or bank transfer.</h5>
              </div>
            </div>

            <div class="product-details-policy-main3">
              <img class="product-details-policy-img" src="../../public/img/svg/sticker.svg" alt="shipping-policy">
              <h5 class="product-details-p1">Reliability and traceability guaranteed.</h5>
            </div>

          </div>
       </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name:'product-details',
  data(){
    return{
      artwork: null,
      loggedinUser: null,
      currFrame: 'frame1'
    }
  },
  created(){
    const loggedinUser = this.$store.getters.loggedinUser;
    this.$store.dispatch({
      type: "loadCart",
      userId: loggedinUser._id
    })
  },
  mounted(){
    this.loggedinUser = this.$store.getters.loggedinUser;
     const artworkId = this.$route.params.id;
        if (artworkId) {
          this.$store.dispatch({
            type: 'loadArtwork',
            artworkId
          })
          .then(artwork => {
              this.artwork = JSON.parse(JSON.stringify(artwork))
          })
        }
  },
  computed:{
    frame(){
      return this.currFrame
    }
  },
  methods:{
    onChangeFrame(frameIdx){
      this.currFrame = 'frame'+ frameIdx
    },
    onBack(){
      this.$router.push('/artwork');
    },
    onCart(){
      const userId = this.loggedinUser._id;
      const product = this.artwork;
      this.$store.dispatch({
        type: 'addToCart',
        userId, 
        product 
      })
    },
    onBuy(){
        Swal.fire({
        title: 'Are you sure?',
        text: "Are you sure that you want to buy this artwork?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#dedede',
        confirmButtonText: 'Yes, buy it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire({
              showConfirmButton: false,
              timer: 2000,
              title:'Thank you!',
              text:'This artwork entered into the order!',
              icon:'success'
            })
          }
        })
    },
     currRate(rate){
       return '⭐'.repeat(rate);
    }, 
    biger(){
      Swal.fire({
        title: this.artwork.title,
        text: this.artwork.desc,
        imageUrl: this.artwork.imgURLs[0],
        imageWidth: 900,
        imageAlt: 'Custom image',
      })
    }
  }
}
</script>