    $(document).ready(function () {

        // STORE ANIMATIONS & CLASSES

        let body = $("body");
        let d = "darken-image";
        let zoomInDown = "animate__animated animate__zoomInDown";
        let backInLeft = "animate__animated animate__backInLeft";
        let flipInX = "animate__animated animate__flipInX";
        let rotateIn = "animate__animated animate__rotateIn";
        let pulse = "animate__animated animate__pulse";

        // t = DURATION OF SLIDETOGGLE METHOD

        let t = 600;

        // FUN CALC VAR DECLARED GLOBALLY TO AVOID COLOUR CLASH IN LATER FUNCTION

        let outputSign1 = $("#output-sign1");
        let ampersand = $("#amp");
        let outputSign2 = $("#output-sign2");

        // LANDIING PAGE ANIMATION SEQUENCE W. EVENT LISTENER

        $(".landing-title").addClass(zoomInDown).css("--animate-duration", "2.5s");

        $(".landing-title").on("animationend", () => {
            $("#landing-btn").addClass(pulse);
        });

        // TARGET HEADINGS WITH ASSIGNED ANIMATIONS

        $("#target-zodiac-title").addClass(rotateIn).css("--animate-duration", "1.5s");
        $(".target-comp-title").addClass(backInLeft).css("--animate-duration", "1.5s");
        $(".target-comp2-title").addClass(flipInX).css("--animate-duration", "2s");

        // STORE ZODIAC CLASSES FOR DARK MODE ITERATION & STYLING 

        const ZODIAC_CLASSLIST = [".hide-aries", ".hide-taurus", ".hide-gemini", ".hide-cancer", ".hide-leo", ".hide-virgo", ".hide-libra", ".hide-scorpio", ".hide-sag", ".hide-cap", ".hide-aquarius", ".hide-pisces"
    ];

        // STORE ZODIAC NAMES FOR USE IN CONDITIONAL CHECKS AND COMPAT. CALCULATION

        const ZODIAC_NAME_ARRAY = ["ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO", "LIBRA", "SCORPIO", "SAGITTARIUS", "CAPRICORN", "AQUARIUS", "PISCES"
    ];

        let z = $(ZODIAC_NAME_ARRAY);

        // BS4 DOESN'T ALLOW HEADER OF INDEX PAGE TO STRETCH FULL SCREEN - jQUERY FIX

        $(".full-screen-header").height($(window).height());

        // TOGGLE DARK MODE ONCLICK (CLIENT SIDE) - ITERATE ARRAY & STYLE
        // ENSURE FUN CALCULATOR COLOUR VALUES DON'T CLASH IN DARK MODE

        // DECLARE KEY FOR LOCALSTORAGE & CHECK FOR VALUE

        let mode = localStorage.getItem("mode");

        if (mode) {
            body.toggleClass(mode);
        }

        // TOGGLE DARK MODE (CLIENT SIDE) & SAVE PREFERENCES TO BROWSER

        $(".mode").click(function () {

            body.toggleClass("dark-mode");
            if (body.hasClass("dark-mode")) {
                ZODIAC_CLASSLIST.forEach(a => {
                    $(a).css("color", "#008000");
                    outputSign1.css("color", "inherit");
                    ampersand.css("color", "inherit");
                    outputSign2.css("color", "inherit");
                    localStorage.setItem("mode", "dark-mode");
                });
            } else {
                ZODIAC_CLASSLIST.forEach(a => {
                    $(a).css("color", "inherit");
                    localStorage.setItem("mode", null);
                });
            }
        });

        /* TEST CODE 

        let img = $("img");
        console.log(img.hasClass("bull"));
        let header = $("#target-title");
        console.log(header.hasClass("gtr")); */

        // TOGGLE ASTROLOGICAL INFO ON CLICK (CLIENT SIDE)

        $(".content").click(function (e) {
            let vanishID = e.target.id;
            $("." + vanishID + "vanish").slideToggle(t);
            $("." + vanishID + "date").slideToggle(t);
            $("." + vanishID + "darken").toggleClass(d);
        });

        // FOOTER BUTTON FOR USER TO SCROLL TO TOP

        $("#scroll").click(function () {
            $('html, body').animate({
                scrollTop: $("#scroll-target").offset().top
            }, 1000);
        });

        // ZODIAC COMPATIBILITY CALCULATOR

        // STORE SELECTOR FOR NEW P TAG DISPLAY

        let result = $("#compatibility-result");

        // ENSURE USER TEXT IS ENTERED (THUS STORED) IN CORRECT FORMAT: UPPERCASE

        $("#sign1, #sign2").focusout(function () {
            $("#sign1").val($("#sign1").val().toUpperCase());
            $("#sign2").val($("#sign2").val().toUpperCase());
        });

        // CALCULATE THE COMPATIBILITY VIA USER INPUT & BUTTON CLICK

        $("#calculate").click(function () {

            // STORE USER INPUTS

            let getSign1Value = $("#sign1").val();
            let getSign2Value = $("#sign2").val();

            /* STORE CONDITIONALS FOR CLEANER CONDITIONAL CHECKING (L:128)
             LOGIC HERE DOESN'T FIT & WON'T ALLOW ERROR CODE TO RUN IN SWITCH:
             CODE IS JUST FOR PRACTICE BUT ALL SIGN COMBOS WORK IF INPUTTED CORRECTLY */

            let taurusScorpio = getSign1Value === z[1] && getSign2Value === z[7] || getSign1Value === z[7] && getSign2Value === z[1];
            let virgoScorpio = getSign1Value === z[5] && getSign2Value === z[7] || getSign1Value === z[7] && getSign2Value === z[5];
            let alt_condition_1 = getSign1Value.length < getSign2Value.length;
            let alt_condition_2 = getSign1Value.length > getSign2Value.length;
            let alt_condition_3 = getSign1Value.length === getSign2Value.length;

            // DISPLAY CHOSEN SIGNS IN H2 TAG

            $("#user-values").text(`${getSign1Value} and ${getSign2Value}`).addClass(backInLeft);

            // EVALUATE DATA ENTERED FROM USER & OUTPUT RESULT AS HEART EMOJI
            // HEART RATING IS FROM 1 - 5s

            switch (true) {

                case taurusScorpio:
                    result.html(String.fromCodePoint(10084, 10084, 10084, 10084, 10084));
                    break;
                case virgoScorpio:
                    result.html(String.fromCodePoint(10084, 10084, 10084, 10084));
                    break;
                case alt_condition_1:
                    result.html(String.fromCodePoint(10084, 10084, 10084));
                    break;
                case alt_condition_2:
                    result.html(String.fromCodePoint(10084, 10084));
                    break;
                case alt_condition_3:
                    result.html(String.fromCodePoint(10084));
                    break;
                default:
                    result.html("Sorry, we can't see your signs. Please enter your signs again and check you have no typos!");
            }

        });

        // FUN COMPATIBILITY CALCULATOR

        // ARRAY OF STORED RESPONSES, READY TO BE SELECTED AT RANDOM 

        const OUTPUT_ARRAY = ["happy", "emotional", "shameful", "synonymous", "wary", "hellish", "warlike", "impressive", "useless", "perpetual", "lovely", "unadvised", "redundant", "combative", "feeble", "short-lived", "heavenly", "demonic", "trashy", "wet", "lamentable", "stupid", "kaput", "nutty", "groovy"
    ];

        // CALL FUNCTION ON CLICK TO OUTPUT RANDOM RESULT

        $("#alt-calc-btn").click(function () {

            let userVal1 = $("#track1").val();
            let userVal2 = $("#track2").val();
            let displayResult = $("#display-result");

            /* DISPLAY ZODIAC OUTPUT VALUES IN ELEMENTAL COLOURS:
            ARIES, LEO, SAG = FIRE & RED
            CANCER, SCORPIO, PISCES = WATER & BLUE
            GEMINI, LIBRA, AQUARIUS = AIR & GREEN
            TAURUS, VIRGO, CAPRICORN = EARTH & BROWN */

            switch (userVal1) {
                case z[0]:
                case z[4]:
                case z[8]:
                    outputSign1.css("color", "#FF0000");
                    break;
                case z[3]:
                case z[7]:
                case z[11]:
                    outputSign1.css("color", "#1E90FF");
                    break;
                case z[2]:
                case z[6]:
                case z[10]:
                    outputSign1.css("color", "#008000");
                    break;
                case z[1]:
                case z[5]:
                case z[9]:
                    outputSign1.css("color", "#993333");
                    break;
                default:
                    alert("error");
            }

            switch (userVal2) {
                case z[0]:
                case z[4]:
                case z[8]:
                    outputSign2.css("color", "#FF0000");
                    break;
                case z[3]:
                case z[7]:
                case z[11]:
                    outputSign2.css("color", "#1E90FF");
                    break;
                case z[2]:
                case z[6]:
                case z[10]:
                    outputSign2.css("color", "#008000");
                    break;
                case z[1]:
                case z[5]:
                case z[9]:
                    outputSign2.css("color", "#993333");
                    break;
                default:
                    alert("error");
            }

            outputSign1.text(`${userVal1}`).addClass(rotateIn);
            ampersand.text("&").addClass(rotateIn);
            outputSign2.text(`${userVal2}`).addClass(rotateIn);

            // TWO SPECIFIC 'TEST' RESULTS, OTHERWISE OUTPUT IS RANDOMISED  

            if (userVal1 === z[1] && userVal2 === z[7] || userVal1 === z[7] && userVal2 === z[1]) {
                displayResult.text("Their relationship is a connection of deepest emotions and sexuality that no other couple in the zodiac is privileged to have. When they click, they are impossible to separate.");
            } else if (userVal1 === z[5] && userVal2 === z[7] || userVal1 === z[7] && userVal2 === z[5]) {
                displayResult.text("The bond between a Scorpio and a Virgo is intense and deep. They are dependable and are loyal to their friends and lovers and to each other. They know that they can learn from one another and that's why this beautifully unexpected pair works so well.");
            } else {
                displayResult.text(`This relationship is ${OUTPUT_ARRAY[Math.floor(Math.random() * OUTPUT_ARRAY.length)]}`);
            }

        });

    });