<script>
import { onMount } from 'svelte';

onMount(() => {
	(async () => {
	    if (localStorage.getItem("user_id") == undefined) {
	        let response = await fetch('https://portal.team1676.com/api.php?init=1&origin=aceit.team1676.com', { method: 'GET' });
	        let login_session = await response.json();
	        let callback_url = window.location.href;
	        localStorage.setItem("redirect_post_login", "https://aceit.team1676.com/#/aceit/hubbeta");
	        callback_url = callback_url.split('#')[0];
	        window.location.href = "https://portal.team1676.com/api.php?app_token=OE0XHlRvZzedMZ18rmSggw8H-9huRVLTYJ7sYCE_HfU&key=" + login_session.token + "&callback=" + callback_url + "%23%2Faceit%2Fcallback";
	        this.userID = -1;
	    } else {
            history.back();
      }
	})();
});
</script>

<div class="wrapper">
    <div class="container">
        <div class="banner">
            <b>LOADING...</b>
            <div class="banner-left"></div>
            <div class="banner-right"></div>
        </div>
    </div>
</div>


<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

/*
Light Blue 007db7
Blue 170073
Blue 162cff
Pink ff1684
Saumon f85a5a
Yellow ebfc5c
Yellow dcfa51
*/

.wrapper
{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(144deg, rgb(159 140 67) 0%, rgb(155 130 34) 100%)
}

.container
{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.banner
{
  position: relative;
  padding: 10px 20px;
  animation: loader 1.5s cubic-bezier(0.5, 0.1, 0.15, 1) alternate infinite;
  background-color: #272727;
  color: #fff;
}

@keyframes loader
{
  0%
  {
    letter-spacing: -1px;
  }
  100%
  {
    letter-spacing: 15px;
  }
}

.banner::before
{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  transform: skewX(-15deg);
  background-color: #272727;
}

.banner-left, .banner-right
{
  width: 60px;
  height: 100%;
  position: absolute;
  z-index: -2;
  bottom: -30%;
  transform: skewX(-15deg);
  background-color: #090808;
}

.banner-left
{
  animation: sub-banner-left 1.5s cubic-bezier(0.5, 0.1, 0.15, 1) alternate infinite;
}

@keyframes sub-banner-left
{
  0%
  {
    right: 82%;
  }
  100%
  {
    right: 90%;
  }
}

.banner-right
{
  animation: sub-banner-right 1.5s cubic-bezier(0.5, 0.1, 0.15, 1) alternate infinite;
}

@keyframes sub-banner-right
{
  0%
  {
    left: 82%;
  }
  100%
  {
    left: 90%;
  }
}

.banner-left::before, .banner-right::before
{
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  top: -1px;
  border: 22px solid;
  border-color: transparent;
}

.banner-left::before
{
  left: -1px;
  border-left-color: #171717;
}

.banner-right::before
{
  right: -1px;
  border-right-color: #171717;
}
</style>