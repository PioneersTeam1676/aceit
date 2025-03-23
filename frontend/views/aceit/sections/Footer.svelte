<script>
    import { onMount } from 'svelte';
    import { location } from 'svelte-spa-router';
    let currentYear;
    let footerBgColor = "#081d12";
    let footerCopyrightColor = "#030703";

    location.subscribe(currentRoute => {
        if (currentRoute == "/aceit" || currentRoute == "/") {
            footerBgColor = "#081d1a";
            footerCopyrightColor = "#040c0a";
        }
    });

    onMount(() => {
        currentYear = new Date().getFullYear(); 
    });
</script>

<main style="bottom: 0; left: 0; right: 0;">
    <div class="aceit-landing-container aceit-footer" style="padding: 45px 30px; background-color: {footerBgColor};">
        <div class="aceit-footer-container">
            <div class="aceit-footer-section aceit-footer-about"> 
                <div>
                    <hr class="mob-foot-bar">
                    <h3> What is ACE-IT? </h3> <hr> <p style="padding: 0 32px 0 0; font-size: 11pt;">ACE-IT was created by The Pascack Pi-oneers [FRC Team 1676] to be a free alternative to paid online studying tools. With a Kanban Board card creation structure and several interactive games, ACE-IT makes studying more convenient, collaborative, and fun.</p>
                </div>
            </div>
            <div class="aceit-footer-section"> 
                <div>
                    <hr class="mob-foot-bar">
                    <h3> About Team 1676 </h3> <hr> <p  style="padding: 0 32px 0 0; font-size: 11pt; margin-bottom: 20px;">The Pascack Pi-oneers, <i>FIRST</i> Robotics Competition (FRC) Team 1676, are located in Bergen County, New Jersey, are part of the Pascack Valley Regional High School District, which consists of four towns: Hillsdale, River Vale, Montvale and Woodcliff Lake. Students from Hillsdale and River Vale attend Pascack Valley High School, students from Montvale and Woodcliff Lake attend Pascack Hills High School.</p>
                </div>
            </div>
            <div class="aceit-footer-section">
                <div>
                    <span class="show-line"><hr></span>
                    <h3>Let's Connect</h3>
                    <hr/>
                </div>
                <div class="row">
                    <div class="col-6" style="font-size: 10pt;">
                        The Pascack Pi-oneers
                        <br/>
                        255 W. Grand Avenue
                        <br/>
                        Montvale, NJ 07645
                    </div>
                    <div class="col-6" style="font-size: 11pt;">
                        <p style="margin-bottom: 0.5rem;"><a href="https://team1676.com/contact">Contact Us ›</a></p>
                        <p><a href="tel:+19373141676">(937)-314-1676</a></p>
                    </div>
                </div>
                <div class="aceit-footer-follow-2" style="border-top: 0.5px solid #ffffff4a; padding-top: 15px; margin-top: 9px;">
                    <hr/>
                    <div style="font-size: 11pt;">
                        <a href="https://twitter.com/frcteam1676" style="display: inline-block;"><i class="icon fa-brands fa-twitter"></i>&emsp;<span style="vertical-align:middle;"></span>Team Twitter</a>&emsp;
                        <a href="https://twitter.com/team1676safety" style="display: inline-block; margin-left: 49px;"><i class="icon fa-brands fa-twitter"></i>&emsp;<span style="vertical-align:middle;"></span>Safety Twitter</a>&emsp;
                        <br/>
                        <a href="http://instagram.com/frcteam1676/" style="display: inline-block;"><i class="icon fa-brands fa-instagram"></i>&emsp;<span style="vertical-align:middle;">Team Instagram</span></a>&emsp;
                        <a href="http://instagram.com/frcteam1676safety/" style="display: inline-block; margin-left: 31px;"><i class="icon fa-brands fa-instagram"></i>&emsp;<span style="vertical-align:middle;">Safety Instagram</span></a>&emsp;
                        <br/>
                        <a href="http://www.youtube.com/user/Team1676" style="display: inline-block;"><i class="icon fa-brands fa-youtube"></i>&emsp;<span style="vertical-align:middle;">Team YouTube</span></a>
                    </div>
                </div>
            </div>
            <div class="aceit-footer-section aceit-footer-follow-1">
                <div>
                    <hr>
                    <h3>Follow Us</h3>
                    <hr>
                </div>
                <div style="font-size: 11pt;">
                    <a href="https://twitter.com/frcteam1676" style="display: inline-block;"><i class="icon fa-brands fa-twitter"></i>&emsp;<span style="vertical-align:middle;"></span>Team Twitter</a>&emsp;
                    <a href="https://twitter.com/team1676safety" style="display: inline-block; margin-left: 49px;"><i class="icon fa-brands fa-twitter"></i>&emsp;<span style="vertical-align:middle;"></span>Safety Twitter</a>&emsp;
                    <br/>
                    <a href="http://instagram.com/frcteam1676/" style="display: inline-block;"><i class="icon fa-brands fa-instagram"></i>&emsp;<span style="vertical-align:middle;">Team Instagram</span></a>&emsp;
                    <a href="http://instagram.com/frcteam1676safety/" style="display: inline-block; margin-left: 31px;"><i class="icon fa-brands fa-instagram"></i>&emsp;<span style="vertical-align:middle;">Safety Instagram</span></a>&emsp;
                    <br/>
                    <a href="http://www.youtube.com/user/Team1676" style="display: inline-block;"><i class="icon fa-brands fa-youtube"></i>&emsp;<span style="vertical-align:middle;">Team YouTube</span></a>
                </div>
            </div>
        </div>
        <div class="show-line"><br/></div>
    </div>
    <div class="aceit-copyright" style="background: {footerCopyrightColor}; color: #dfdfdf; padding: 20px 30px; font-size: 10pt;">
        <div style="margin: auto; max-width: 1400px;">
            Copyright &copy; 2024-{currentYear} <span class="aceit-d-desktop">—</span><span class="aceit-d-mobile"><br/></span> The Pascack Pi-oneers [FRC Team 1676]<span class="aceit-d-desktop">.&ensp;All Rights Reserved.</span>
        </div>
    </div>
</main>

<style>

.show-line {
    display: none;
}

.aceit-footer-follow-1 {
    display: none;
}

.aceit-footer-follow-2 {
    display: flex;
}

@media only screen and (min-width: 501px) and (max-width: 1100px) {
    .aceit-footer-container {
        display: flex;
    }
    .aceit-footer-section {
        flex-basis: 50% !important;
    }
    .show-line {
        display: block;
    }
    .aceit-footer-follow-1 {
        display: flex;
    }
    .aceit-footer-follow-2 {
        display: none;
    }
}

@media only screen and (max-width: 650px) {
    .aceit-footer-section {
        flex-basis: 100% !important;
    }
}

@media only screen and (max-width: 500px) {
    .aceit-footer-container {
        padding: 25px 20px !important;
    }
    .aceit-copyright {
        padding: 12px !important;
        text-align: center;
    }
    .show-line {
        display: block;
    }
    .aceit-d-desktop {
        display: none;
    }
    .aceit-footer-follow-1 {
        display: flex;
    }
    .aceit-footer-follow-2 {
        display: none;
    }
}

</style>