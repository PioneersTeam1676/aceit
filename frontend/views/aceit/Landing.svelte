<script>
   console.log ("GOOOOOOOOOOD MORNING PIONEERS 35");
    import Header from './sections/Header.svelte';
    import HeaderLoggedIn from './sections/HeaderIfLoggedIn.svelte';
    import Footer from './sections/Footer.svelte';

    import bannerImg from '../../media/aceit/forest-background2.png'

    import logo from '../../media/aceit/AceIt_Logo.svg';

    import section1 from '../../media/aceit/section1.svg'
    import blobTop from '../../media/aceit/blobConnectTop.svg'
    import blobBottom from '../../media/aceit/blobConnectBottom.svg'
    import background1 from '../../media/aceit/blobBackground.svg'
    import gif1 from '../../media/aceit/FrogAnimation.gif'
    import friends from '../../media/aceit/Friends.jpg'
    import gif2 from '../../media/aceit/Board2.gif'



</script>

<main class="aceit-landing">

   <!-- <Header /> -->
    <HeaderLoggedIn />

    <div class="aceit-landing-banner" style="--banner-img: url({bannerImg})">
      <!-- <div class="aceit-landing-banner" style = "backdrop-filter: brightness(50%);">
    </div> -->
    <div class="aceit-info-panel">
      <div>
        <!-- Main Logo-->
        <svg class="title" viewBox="0 0 500 100">
          <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
          <text width="500">
            <textPath class="aceit-landing-banner-title" xlink:href="#curve" startOffset="20%">
              ACE-IT
              </textPath>
            </text>
          </svg>
          <div style="width:400px;  ">
            <img style="margin:auto; display:block;" src={logo} class="logo" alt="logo">
          </div>
          
    
          <svg style="scale:1.2;"class="text" viewBox="0 0 500 150">
            <path id="curve1" d="M73.2,1.4c4,6.1,65.5,96.8,178.6,95.6C363.1,95.8,422.6,6.7,426.9,0"/>
            <text width="500">
              <textPath class="aceit-landing-banner-text" xlink:href="#curve1" startOffset="5%">
                  Your New Study Tool!
              </textPath>
            </text>
          </svg>
      </div>
      <div style="width:70%">
        <br>
        <h3  style="margin-top:3%;"class="aceit-landing-container-title aceit-land-text">About ACE-IT</h3>
        <p class="aceit-landing-container-description aceit-land-text">ACE-IT was created by FRC Team 1676 to be a free alternative to paid online studying tools. With a Kanban Board card creation structure and several interactive games, ACE-IT makes studying more convenient, collaborative, and fun.</p>
    
      </div>
    </div>
    
    </div>
    
    <div class="aceit-landing-sectionbreak" style="background-image: url({section1});"></div>

    
    <div class="aceit-landing-container">
      <div style="margin-top:-20%"class="aceit-container-offset">
       <div class="aceit-landing-text-container">
         <br>
         <br>
         <h3 class="aceit-landing-container-title aceit-land-text">Interactive Games</h3>
         <p class="aceit-landing-container-description aceit-land-text">Ace-It's games help users improve memory, spelling, and vocabulary. With these games, studying becomes enjoyable and rewarding.
         </p>
       </div>
       <div class="aceit-landing-content-container">
         <div>
           <img src={gif1} class="circular-Image">
         </div>
       </div>
      </div>
    </div>

    <div class="aceit-landing-sectionbreak" style="background-image: url({blobTop}); background-color: var(--aceit-tertiary);"></div>

    <div class="aceit-center-container" style="background-image: url({background1});">
      <div class="aceit-container-offset">
       <div class="aceit-landing-content-container">
         <div>
           <img src={gif2} class="circular-Image">
         </div>
       </div>
       <div class="aceit-landing-text-container">
        <br>
        <br>
        <h3 class="aceit-landing-container-title aceit-land-text">Convenient Cards</h3>
        <p class="aceit-landing-container-description aceit-land-text">Ace-It's card creation system uses a Kanban board structure, making it easy to create and organize flashcards. Users can quickly create cards with text and categorize them by subject with drag and drop functionality.
        </p>
      </div>
      </div>

      <!-- <div class="aceit-landing-content-container">
        <div>
          <img src={gif2} class="circular-Image">
        </div>
      </div>
      <div class="aceit-landing-text-container">
        <h3 class="aceit-landing-container-title aceit-land-text">Convenient Cards</h3>
        <p class="aceit-landing-container-description aceit-land-text">Ace-It's card creation system uses a Kanban board structure, making it easy to create and organize flashcards. Users can quickly create cards with text and categorize them by subject with drag and drop functionality.</p>
      </div> -->
    </div>

    <div class="aceit-landing-sectionbreak" style="background-image: url({blobBottom}); background-color: var(--aceit-tertiary);"></div>

    <div class="aceit-landing-container">
      <div class="aceit-container-offset">
      <div class="aceit-landing-text-container">
        <br>
        <br>
        <h3 class="aceit-landing-container-title aceit-land-text">COMING SOON: Card Sharing</h3>
        <p class="aceit-landing-container-description aceit-land-text">Ace-It's card sharing feature lets users access and share flashcard decks created by other users through a marketplace tab. This feature encourages collaboration and makes it simple for users to find high-quality materials created by other students or educators.
        </p>
      </div>
      <div class="aceit-landing-content-container">
        <div>
          <img src={friends} class="circular-Image">
        </div>
      </div>
    </div>
    </div>

    <Footer />

</main>

<style>
  .aceit-landing {
    background-color: var(--aceit-primary);
  }

  .aceit-landing-banner {
    /* DO NOT TOUCH UNLESS KNOW WHAT DOING*/
    width: 100%;

    background-position: 0 -15vw;
    background-repeat: no-repeat;
    background-size: cover;

    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-position-y: -300px;
    filter: brightness(100%);
  }

  .aceit-landing-banner::before {
  content:"";
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;

  background-image: var(--banner-img);
  background-position: 0 -15vw;
  background-repeat: no-repeat;
  background-size: cover;

  z-index:-1;
  filter: brightness(40%) blur(2px);
}

  .aceit-landing-banner path {
    fill: transparent;
  }

  .aceit-landing-banner .title {
    width: 400px;

    padding-top: 2rem;

    opacity: 0;
    animation: translate 1000ms ease 200ms;
    animation-fill-mode: forwards;
    position: relative;
    display:block;
  }

  .aceit-landing-banner .text {
    width: 400px;
    margin-bottom:5%;
    opacity: 0;
    animation: translate 1000ms ease 1000ms;
    animation-fill-mode: forwards;
    position: relative;
  }

  .aceit-landing-banner-text {
    font-size: 40px;
    fill: var(--aceit-white);
    text-align: center;

    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .aceit-landing-banner-title {
    font-size: 75px;
    font-weight: 700;
    fill: var(--aceit-white);
    text-align: center;

    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .logo {
    opacity: 0;
    animation: translate 1000ms ease 600ms;
    animation-fill-mode: forwards;

    position: relative;
    /* background-color: darkorange; */
  }
  .circular-Image {
    width: 25rem;
    height: 25rem;
    border-radius: 25px;
    opacity: 0;
    animation: translate 1000ms ease 600ms;
    animation-fill-mode: forwards;

    position: relative;
    /* background-color: darkorange; */
  }

  .aceit-landing-sectionbreak {
    background-size: cover;
    height: 10rem;
    width: 100%;
  }
  

  .aceit-center-container {
    height:325px;
    background-size: cover;
    padding: 3vw;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .aceit-info-panel {
    display: flex;
    flex-direction: row;
  }


  .aceit-landing-container-title {
    font-size: 3vw;
    text-align: center;
  }

  .aceit-landing-container-description {
    font-size: 2vw;
    text-align: center;
  }
  .aceit-container-offset{
    position: absolute;
    display:flex;
    margin-top:-40%;

  }

  .aceit-landing-container{
    height:525px;
  }


  .aceit-landing-content-container {
    height:500px;
    padding: 3vw;
    width: 65%;
  }

  .aceit-landing-text-container {
    width: 100%;
    margin-top:5%;
  }

  @keyframes translate {
      from {opacity: 0; top: 100px;}
      to {opacity: 1; top: 0px;}
  }

  @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
  }
</style>
