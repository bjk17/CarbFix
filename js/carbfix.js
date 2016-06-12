//~ First the window is ready.
$(document).ready(function(){
    //~ Top canvas variable initializing.
    var ctxTop = document.getElementById("layerTop").getContext("2d");
    
    //~ Display "loading message".
    ctxTop.fillStyle = "#bed62f";
    ctxTop.fillRect(0,0,1024,768);
    ctxTop.fillStyle = "white";
    ctxTop.font = "bold 48px helvetica"; //~ sans-serif
    ctxTop.textAlign = "center";
    ctxTop.textBaseline = "middle"; 
    if (english) ctxTop.fillText("Loading...", 514, 384);
    else         ctxTop.fillText("Hleður...",  514, 384);
    
    console.log("Document ready.");
});

//~ The window is loaded only when EVERYTHING is loaded and ready.
$(window).load(function() {
    
        //~ Developing phase shortcuts.
        //~ english=true;
        //~ level=5;
    
    //~ Loading default text/backgrounds for interchangable objects.
    $("#repeat").css('background-image', 'url(' + iconRepeat.src + ')');
    $("#next").css('background-image', 'url(' + iconNext.src + ')');
    $("#is").css('background-image', 'url(' + iconIs.src + ')');
    $("#en").css('background-image', 'url(' + iconEn.src + ')');
    $("#time_num").text("0s");
    $("#score_num").text("0");
    
    //~ Preparing and loading level 0.
    lvlReload();
    language();
    
    //~ Warning the player if the browser's window is not big enough.
    if ( $(this).width()<1024 || $(this).height()<768 ) {
        alert(welcomeWarning);
    }
    
    //~ Everyting is loaded so we remove the "loading message".
    $('#layerTop').remove();
    console.log("Document loaded.");
});

//~ This will only run once, loading all graphics an' stuff.
function init() {
    console.log("init");
    
    //~ Disable's double clicking to select text on canvases.
    var temp1 = document.getElementsByTagName('canvas');
    for (var i=0; i<temp1.length; i++) {
        temp1[i].addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    }
        
    //~ Disable's double clicking to select text on all objects from top left.
    var temp2 = document.getElementsByClassName('fromTopLeft');
    for (var i=0; i<temp2.length; i++) {
        temp2[i].addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
    }
    
    //~ When hovering over class="silence" iframe Vimeo videos Fix and Carrie will shut up.
    //~ Syntax: $(selector).hover(handlerIn, handlerOut)
    $(".silence").hover(LVLjourney_silenceThem, undefined);
    
    //~ Assigning variables to elements.
    audioEn = document.getElementById("talk_en");
    audioIs = document.getElementById("talk_is");
    elementNext = document.getElementById("next");
    
    //~ Level 3 basalt land Array. 'True' means the square is occupied.
    //~ The "fence" around the land and the "barriers" between squares
    //~ are array entries. Hence the array size of (2*8+1)x(2*12+1) = 17x25
    basaltMap = [
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,  true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false, true ],
            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ]
        ];
    
    //~ Initializing post3 variables (for dev purposes only).
    countCalcite=countSideride=countMagnecite=0;
    
    //~ Loading backgrounds.
    bg0      = new Image(); bg0.src      = 'images/background/level_0.png';
    bg1      = new Image(); bg1.src      = 'images/background/level_1.png';
    bg2      = new Image(); bg2.src      = 'images/background/level_2.png';
    bg3      = new Image(); bg3.src      = 'images/background/level_3.png';
    bg_class = new Image(); bg_class.src = 'images/background/level_class.png';
    
    //~ Loading titles.
    t1_en = new Image(); t1_en.src = 'images/titles/t1_en_GAS-SEPERATION.png';
    t1_is = new Image(); t1_is.src = 'images/titles/t1_is_GASSKILJUSTOD.png';
    t2_en = new Image(); t2_en.src = 'images/titles/t2_en_INJECTION.png';
    t2_is = new Image(); t2_is.src = 'images/titles/t2_is_NIDURDAELING.png';
    t3    = new Image(); t3.src    = 'images/titles/t3_BASALTLAND.png';
    
    //~ Loading icons.
    iconIs         = new Image(); iconIs.src = 'images/icons/is.png';
    iconEn         = new Image(); iconEn.src = 'images/icons/en.png';
    iconNext       = new Image(); iconNext.src = 'images/icons/next.png';
    iconNextGlow   = new Image(); iconNextGlow.src = 'images/icons/next_glow.png';
    iconRepeat     = new Image(); iconRepeat.src = 'images/icons/repeat.png';
    iconRepeatGlow = new Image(); iconRepeatGlow.src = 'images/icons/repeat_glow.png';
    timeScoreEn    = new Image(); timeScoreEn.src = 'images/icons/timeScore_en.png';
    timeScoreIs    = new Image(); timeScoreIs.src = 'images/icons/timeScore_is.png';
    
    //~ Loading navigation buttons.
    nav1_en = new Image(); nav1_en.src = 'images/icons/nav1_en_TheCarbonCycle.png';
    nav1_is = new Image(); nav1_is.src = 'images/icons/nav1_is_Kolefnishringrasin.png';
    nav2_en = new Image(); nav2_en.src = 'images/icons/nav2_en_TheCarbFixJourney.png';
    nav2_is = new Image(); nav2_is.src = 'images/icons/nav2_is_CarbFixleidin.png';
    nav3_en = new Image(); nav3_en.src = 'images/icons/nav3_en_AdditionalResources.png';
    nav3_is = new Image(); nav3_is.src = 'images/icons/nav3_is_Kennslugogn.png';
    
    //~ Loading smoke.
    sm0 = new Image(); sm0.src = 'images/smoke/smoke0.png';
    sm1 = new Image(); sm1.src = 'images/smoke/smoke1.png';
    sm2 = new Image(); sm2.src = 'images/smoke/smoke2.png';
    sm3 = new Image(); sm3.src = 'images/smoke/smoke3.png';
    sm4 = new Image(); sm4.src = 'images/smoke/smoke4.png';
    
    //~ Loading pressure bar.
    p0 = new Image(); p0.src = 'images/pressureBar/000.png';
    p1 = new Image(); p1.src = 'images/pressureBar/025.png';
    p2 = new Image(); p2.src = 'images/pressureBar/050.png';
    p3 = new Image(); p3.src = 'images/pressureBar/075.png';
    p4 = new Image(); p4.src = 'images/pressureBar/100.png';
    p_x = p_x/2; p_y = p_y/2;
    
    //~ Loading pipes.
    stNwh  = new Image(); stNwh.src  = 'images/pipes/st-N-white.png';
    stEwh  = new Image(); stEwh.src  = 'images/pipes/st-E-white.png';
    cuNEwh = new Image(); cuNEwh.src = 'images/pipes/cu-NE-white.png';
    cuNWwh = new Image(); cuNWwh.src = 'images/pipes/cu-NW-white.png';
    cuSWwh = new Image(); cuSWwh.src = 'images/pipes/cu-SW-white.png';
    cuSEwh = new Image(); cuSEwh.src = 'images/pipes/cu-SE-white.png';
    stEbl  = new Image(); stEbl.src  = 'images/pipes/st-E-blue.png';
    stNbl  = new Image(); stNbl.src  = 'images/pipes/st-N-blue.png';
    cuNEbl = new Image(); cuNEbl.src = 'images/pipes/cu-NE-blue.png';
    cuNWbl = new Image(); cuNWbl.src = 'images/pipes/cu-NW-blue.png';
    cuSWbl = new Image(); cuSWbl.src = 'images/pipes/cu-SW-blue.png';
    cuSEbl = new Image(); cuSEbl.src = 'images/pipes/cu-SE-blue.png';
    
    //~ Loading Carbon Cycle questions images.
    bin             = new Image(); bin.src = 'images/carbonCycleQuestions/Bin.jpg';
    bus             = new Image(); bus.src = 'images/carbonCycleQuestions/Bus.jpg';
    extensionCable  = new Image(); extensionCable.src = 'images/carbonCycleQuestions/ExtensionCable.jpg';
    megaphone       = new Image(); megaphone.src = 'images/carbonCycleQuestions/Megaphone.jpg';
    renewableEnergy = new Image(); renewableEnergy.src = 'images/carbonCycleQuestions/RenewableEnergy.jpg';
    tree            = new Image(); tree.src = 'images/carbonCycleQuestions/Tree.jpg';
    tomato          = new Image(); tomato.src = 'images/carbonCycleQuestions/Tomato.jpg';
    waterTap        = new Image(); waterTap.src = 'images/carbonCycleQuestions/WaterTap.jpg';
    
    //~ Setting CCQ images as background in appropriate divs.
    $("#divBin").css('background-image', 'url(' + bin.src + ')');
    $("#divBus").css('background-image', 'url(' + bus.src + ')');
    $("#divExtensionCable").css('background-image', 'url(' + extensionCable.src + ')');
    $("#divMegaphone").css('background-image', 'url(' + megaphone.src + ')');
    $("#divRenewableEnergy").css('background-image', 'url(' + renewableEnergy.src + ')');
    $("#divTree").css('background-image', 'url(' + tree.src + ')');
    $("#divTomato").css('background-image', 'url(' + tomato.src + ')');
    $("#divWaterTap").css('background-image', 'url(' + waterTap.src + ')');
    
    //~ Loading atoms.
    C     = new Image(); C.src = 'images/characters/C.png';
    CO2   = new Image(); CO2.src = 'images/characters/CO2.png';
    H2    = new Image(); H2.src = 'images/characters/H2.png';
    H2CO3 = new Image(); H2CO3.src = 'images/characters/H2CO3.png';
    H2O   = new Image(); H2O.src = 'images/characters/H2O.png';
    H2S   = new Image(); H2S.src = 'images/characters/H2S.png';
    carry_x*=(4/9); carry_y*=(4/9); fix_x*=(4/9); fix_y*=(4/9);
    
    //~ Loading Carry.
        //~ carry02 = new Image(); carry02.src = 'images/characters/CARRY02.png';
        //~ carry03 = new Image(); carry03.src = 'images/characters/CARRY03.png';
        //~ carry04 = new Image(); carry04.src = 'images/characters/CARRY04.png';
        //~ carry05 = new Image(); carry05.src = 'images/characters/CARRY05.png';
        //~ carry06 = new Image(); carry06.src = 'images/characters/CARRY06.png';
        //~ carry07 = new Image(); carry07.src = 'images/characters/CARRY07.png';
        //~ carry08 = new Image(); carry08.src = 'images/characters/CARRY08.png';
        //~ carry09 = new Image(); carry09.src = 'images/characters/CARRY09.png';
        //~ carry10 = new Image(); carry10.src = 'images/characters/CARRY10.png';
    
    //~ Loading Fix.
        //~ fix01 = new Image(); fix01.src = 'images/characters/FIX01.png';
        //~ fix02 = new Image(); fix02.src = 'images/characters/FIX02.png';
        //~ fix03 = new Image(); fix03.src = 'images/characters/FIX03.png';
        //~ fix04 = new Image(); fix04.src = 'images/characters/FIX04.png';
        //~ fix05 = new Image(); fix05.src = 'images/characters/FIX05.png';
        //~ fix06 = new Image(); fix06.src = 'images/characters/FIX06.png';
        //~ fix07 = new Image(); fix07.src = 'images/characters/FIX07.png';
        //~ fix08 = new Image(); fix08.src = 'images/characters/FIX08.png';
        //~ fix09 = new Image(); fix09.src = 'images/characters/FIX09.png';
        //~ fix10 = new Image(); fix10.src = 'images/characters/FIX10.png';
        //~ fix11 = new Image(); fix11.src = 'images/characters/FIX11.png';
    
    carry = new Image(); carry.src = 'images/characters/CARRY04.png';
    fix   = new Image(); fix.src   = 'images/characters/FIX01.png';
}


//~ Score functions
function scoreReset() {
    scoreTotal=0;
    $("#score_num").text(scoreTotal);
}
function scoreAdd(inc) {
    scoreTotal += inc;
    $("#score_num").text(scoreTotal);
}
function scoreUpdateLive() {
    $("#score_num").text(scoreTotal+scoreCurrentLevel);
}

//~ Timer functions.
function timerStart(sec) {
    timerStop();
    secondsLeft = sec;
    $("#time_num").text(secondsLeft-- + "s");
    theTimer = setInterval(timerRunning, 1000); // will run the function every 1000ms = 1 second
}
function timerRunning() {
    $("#time_num").text(secondsLeft--  + "s");
    if (secondsLeft < 0) {
        timerStop();
        switch (level) {
            case 3: //Level 1
                $("#repeat").css('background-image', 'url(' + iconRepeatGlow.src + ')');
                document.getElementById("lvl1_gameOver").style.display = 'inline';
                break;
            case 6: //Level 2
                $("#repeat").css('background-image', 'url(' + iconRepeatGlow.src + ')');
                document.getElementById("lvl2_gameOver").style.display = 'inline';
                break;
            case 9: //Level 3
                LVL3_solved();
                break;
            default:
                console.log("Time up with bad level value (level: "+level+").");
                break;
        }
        //~ alert("Time's up!");
    }
}
function timerPause() {
    if (theTimer) {
        clearInterval(theTimer);
        theTimer = undefined;
    }
}    
function timerStop() {
    timerPause();
    secondsLeft = 0;
    $("#time_num").text(secondsLeft+"s");
}


//~ Called in load time and on flag-click to switch language.
function language() {
    if (english) { //~ English
        
        //~ Additional resources
        $("#extra_header").text("Extra material");
        $("#teachersGuideText").text("Teacher's Guide");
        //~ $("a#teachersGuideLink").attr('href', 'docs/Teachers guide.docx');
        $("a#teachersGuideLink").hide();
        $("#manuscript").text("Manuscript");
        $("#illustrations").text("Illustrations for videos");
        $("#voices").text("Voices");
        $("#graphic").text("Graphic design and illustrations");
        $("#programmer").text("Programming");
        
        //~ Carbon Cycle video & questions
        $("#ccqHeader").text("What can I do?");
        $("#ccqText").text("Click on a picture and see what you can do to save your environment!");
        
        //~ Navigation buttons
        $("#cycleButton").css('background-image', 'url(' + nav1_en.src + ')');
        $("#startJourney").css('background-image', 'url(' + nav2_en.src + ')');
        $("#additionalResources").css('background-image', 'url(' + nav3_en.src + ')');
        $("#score-time").css('background-image', 'url(' + timeScoreEn.src + ')');
        
        //~ Post3 names of minerals
        $("#imageOfCalcite").text("Calcite");
        $("#imageOfSideride").text("Sideride");
        $("#imageOfMagnecite").text("Magnecite");
        
        //~ Other
        welcomeWarning = "This game needs a minimum screen resolution of 1024x768 pixels. Please resize your browser window or hit the <F11> button on your keyboard.";
        goodbyeMessage = "You will now be taken to a Google Form page (in Icelandic) to answer a few questions about your experience playing the game. If you do not wish to answer them you can simply close the page. But I would be delighted if you'd give yourself some time to carefully answer them.";
    
    } else { //~ Icelandic
        //~ Kennslugögn
        $("#extra_header").text("Aukaefni");
        $("#teachersGuideText").text("Kennsluleidbeiningar");
        $("a#teachersGuideLink").attr('href', 'docs/Kennsluleidbeiningar.pdf');
        $("a#teachersGuideLink").show();
        $("#manuscript").text("Handrit");
        $("#illustrations").text("Teikningar í myndbönd");
        $("#voices").text("Talsetning");
        $("#graphic").text("Grafísk hönnun");
        $("#programmer").text("Forritun");
        
        //~ Kolefnishringrásin: myndband & spurningar
        $("#ccqHeader").text("Hvað get ég gert?");
        $("#ccqText").text("Smelltu á mynd og sjáðu hvað þú getur gert til að bjarga umhverfinu!");
        
        //~ Navigation takkar
        $("#cycleButton").css('background-image', 'url(' + nav1_is.src + ')');
        $("#startJourney").css('background-image', 'url(' + nav2_is.src + ')');
        $("#additionalResources").css('background-image', 'url(' + nav3_is.src + ')');
        $("#score-time").css('background-image', 'url(' + timeScoreIs.src + ')');
        
        //~ Post3 nöfn á steindum
        $("#imageOfCalcite").text("Kalsít");
        $("#imageOfSideride").text("Síderít");
        $("#imageOfMagnecite").text("Magnesít");
        
        //~ Annað
        welcomeWarning = "Þessi leikur þarf skjástærð upp á a.m.k. 1024x768 pixla. Vinsamlegast stækkaðu vafragluggan eða smelltu á <F11> takkann á lyklaborðinu þínu.";
        goodbyeMessage = "Þér verður núna beint á Google Form síðu til að svara nokkrum spurningum um upplifunina þína á leiknum. Ef þú vilt ekki svara þeim þá einfaldlega lokar þú síðunni. En mér þætti afar vænt um ef þú gæfir þér tíma til að svara spurningunum.";
    }
}

function audioPlay(startEn, startIs, durationEn, durationIs) {
    //~ Playing the audio file from sec. 'start' for 'duration' seconds.
    if (english) {
        //~ Playing english sound.
        audioEn.currentTime = startEn;
        audioEn.play();
        audioTimeout = setTimeout(audioStop,durationEn*1000);
    } else {
        //~ Playing icelandic sound.
        audioIs.currentTime = startIs;
        audioIs.play();
        audioTimeout = setTimeout(audioStop,durationIs*1000);
    }
}

function audioStop() {
    if (audioTimeout) {
        clearTimeout(audioTimeout);
        audioTimeout = undefined;
    }
    audioEn.pause();
    audioIs.pause();
}

function audioResume() {
    if (english) audioEn.play();
    else         audioIs.play();
}


/* Level functions
 *  -3: Extra material
 *  -2: Carbon Cycle Video
 *  -1: Questions from CCV
 *   0: start screen
 *   1: Journey Video
 *   2: pre-lvl 1
 *   3: LEVEL 1
 *   4: post-lvl 1
 *   5: pre-lvl 2
 *   6: LEVEL 2
 *   7: post-lvl 2
 *   8: pre-lvl 3
 *   9: LEVEL 3
 *  10: post-lvl 3
 */
function lvlComplete() {
    audioStop();
    scoreAdd(+scoreCurrentLevel);
    scoreCurrentLevel=0;
    switch (level) {
        case -3: level=0; clearLayer(ctx2); hide('lvlExtra'); break;
        case -2: level++; clearLayer(ctx2); $('iframe#ccv').attr('src',''); hide('lvlCarbonCycle'); break;
        case -1: level++; clearLayer(ctx2); hide('lvlCarbonQuestions'); break;
        case  0: level++; clearSmoke(); hide('lvl0'); break;
        case  1: level++; clearLayer(ctx2); sm = undefined; $('iframe#jv').attr('src',''); hide('lvlJourney'); break;
        case  2: level++; clearLayer(ctx2); hide('pre1'); break;
        case  3: level++; hide('lvl1'); clearLayer(ctx3); timerStop(); clearInterval(stepIntervalTimer); break; //~ LEVEL 1
        case  4: level++; hide('post1'); wb=undefined; break;
        case  5: level++; clearLayer(ctx2); hide('pre2'); break;
        case  6: level++; hide('lvl2'); clearInterval(stepIntervalTimer); timerStop(); break; //~ LEVEL 2
        case  7: level++; hide('post2'); wb=undefined; break;
        case  8: level++; clearLayer(ctx2); hide('pre3'); break;
        case  9: level++; hide('lvl3'); clearLayer(ctx3); clearLayer(ctx4); clearInterval(stepIntervalTimer); timerStop(); break; //~ LEVEL 3
        case 10: level=0; clearLayer(ctx2); wb=undefined; hide('post3');
            //~ alert(goodbyeMessage); window.location.href = "https://docs.google.com/forms/d/1Hx3XpnNLp07GzNuRLXqddkVTQeBP3mSXoyYGek1D0fA/viewform";
            break;
        default: level=0; break;
    } lvlReload();
}

function lvlReload() {
    audioStop();
    scoreCurrentLevel=0;
    scoreUpdateLive();
    $("#next").css('background-image', 'url(' + iconNext.src + ')');
    $("#repeat").css('background-image', 'url(' + iconRepeat.src + ')');
    switch (level) {
        case -3: loadLvlExtra(); allowNextLevel = true; break;
        case -2: loadLvlCarbonCycle(); allowNextLevel = true; break;
        case -1: loadLvlCarbonQuestions(); allowNextLevel = true; break;
        case  0: loadLvl0(); allowNextLevel = true; break;
        case  1: loadLvlJourney(); allowNextLevel = true; break;
        case  2: loadPre1(); allowNextLevel = true; break;
        case  3: loadLvl1(); allowNextLevel = false; break;
        case  4: loadPost1(); allowNextLevel = true; break;
        case  5: loadPre2(); allowNextLevel = true; break;
        case  6: loadLvl2(); allowNextLevel = false; break;
        case  7: loadPost2(); allowNextLevel = true; break;
        case  8: loadPre3(); allowNextLevel = true; break;
        case  9: loadLvl3(); allowNextLevel = false; break;
        case 10: loadPost3(); allowNextLevel = true; break;
        default:
            console.log("Bad level call.");
            allowNextLevel = true;
            loadLvl0();
            break;
    }
    if (allowNextLevel) elementNext.style.display = 'inline';
    else                elementNext.style.display = 'none';
}

function loadLvlExtra() {
    //~ Coming from lvl0 -- lvlComplete() NOT incoked.
    clearSmoke();
    hide('lvl0');
    level = -3; // This is 'lvlExtra'.
    
    //~ Changing background variables.
    bg = bg_class;
    t  = undefined;
    wb = undefined;
    
    //~ Drawing background and objects.
    show('lvlExtra');
    refreshLayer1();
    refreshLayer2();
}

function loadLvlCarbonCycle() {
    //~ Coming from lvl0 -- lvlComplete() NOT invoked.
    clearSmoke();
    hide('lvl0');
    level = -2; // This is 'lvlCarbonCycle'.
    
    //~ Setting Vimeo iframe source regarding to language.
    if (english) $('iframe#ccv').attr('src','//player.vimeo.com/video/72343748?byline=0&amp;portrait=0&amp;color=89302f');
    else         $('iframe#ccv').attr('src','//player.vimeo.com/video/72343750?byline=0&amp;portrait=0&amp;color=89302f');
    
    //~ Update background and title variables.
    bg = bg_class;
    t  = undefined;
    wb = undefined;
    
    //~ Drawing background and objects.
    show('lvlCarbonCycle');
    refreshLayer1();
    refreshLayer2();
}

function loadLvlCarbonQuestions() {
    //~ Update background and title variables.
    bg = bg_class;
    t  = undefined;
    wb = undefined;
    
    //~ Drawing background and objects.
    show('lvlCarbonQuestions');
    refreshLayer1();
    refreshLayer2();
}

function CCQ_imageClicked(number) {
    /* 1: bin
     * 2: bus
     * 3: extensionCable
     * 4: megaphone
     * 5: renewableEnergy
     * 6: tree
     * 7: tomato
     * 8: waterTap
     */
    if (english) switch(number) {
        case 1:
            $("#ccqHeader").text("Reduce, reuse and recycle");
            $("#ccqText").html("<p><u>Reduce:</u> Sometimes we buy things we really don´t need or use or doesn’t last so it ends up in the garbage. If we make our choices with great care and buy fewer and well made things we reduce the amount of waste in the world. If it is absolutely needed, remember to buy things that last longer and have less packaging.</p> <p><u>Reuse:</u> When you reuse things you already have, you save money and help take care of the environment. Give to others things you no longer need, so they can use them, and borrow things you only need for a certain time. Many people use their own reusable bag instead of plastic bags when they go shopping and you can buy used furniture and clothes. Can you think of something else?</p> <p><u>Recycle:</u> separate and recycle whatever materials you can, like plastic and glass bottles, cans, and paper, so they can be collected and remade into new products.</p> <p>When something is recycled it gets a new meaning and purpose. Plastic bottles are recycled and used for making fleece, used in sweaters and you can get recycled paper. It´s possible to use broken plates for mosaic, make bowls out of old vinyl records, cut nylon socks and use them as hair bands or hang your old skateboard up on you wall and use it as a shelf. <br> The possibilities are endless and you can use the internet, books and you own imaginations to get a brilliant idea! </p>");
            break; //OK long ago
        case 2:
            $("#ccqHeader").text("Transportation");
            $("#ccqText").html("There are many ways you can help our planet. The more cars we have driving in the streets the more carbon dioxide is released in to the atmosphere. When you walk, bike or take a bus you are helping our planet by reducing pollution. The exercise is also good for your body. <br> If your parents have a car, encourage them to combine many small trips in to one bigger and all their errands at once. <br> Sharing car rides with others and using public transportation like buses or trains whenever you can also makes a big change.");
            break; //OK 2013-08-28
        case 3:
            $("#ccqHeader").text("Save energy ");
            $("#ccqText").html("Power down and unplug all appliances and electronics you are not using whenever you can. When you keep them plugged into an outlet, they still use power, even when they're turned off. We often forget to unplug our rechargers for phones and computers after we have charged them. Some electricity will leak out of them, wasting money and energy. <br> Use natural light whenever it is possible. In buildings and homes with glass windows, there is no need of lighting during sunny days. <br> If you and your family are shopping new electronics or appliances, remember to look for the Energy Star label. This means that they are energy efficient and typically use less energy than regular models.");
            break; //OK 2013-08-28
        case 4:
            $("#ccqHeader").text("Share your knowledge. ");
            $("#ccqText").html("Now that you know a lot about the climate change and how to find solutions to it /respond to /deal with /react to it you can influence others. You can give advices to friends and families and give a presentation to your school or community group. Many artist make art that gets people to think about the environment and their influence on it, or create the art with recycled or sustainable material like wood or snow. A group of people can get more done than one person so if you have a passion to change something in the world to the better, get involved with others that share the same interest and take action.");
            break; //OK 2013-08-28
        case 5:
            $("#ccqHeader").text("Renewable energy");
            $("#ccqText").html("Most of the energy used in the world we get from burning fossil fuels like coal and oil, emitting large amounts of gases causing climate change. <br> Renewable energy resources won´t run out or they can be replenished/refilled/renewed within a few years or decades. These include wind, sunshine, water and the earth’s heat (geothermal energy). By using these clean energy sources we can produce the electricity needed for our daily lives avoiding the carbon dioxide emissions to the atmosphere, hence slowing down climate change.");
            break; //OK long time ago
        case 6:
            $("#ccqHeader").text("Plant a tree ");
            $("#ccqText").html("Planting trees benefits our planet in many ways. They help to slow climate change because they absorb carbon dioxide during photosynthesis. Flowers, bushes and other plants also play the same role, but on a smaller scale. <br> In our neighborhood, trees provide shade, which helps keep streets and houses cooler in summertime and protect us from wind and snow in winter time. They also provide shelter for birds and small animals living in parks and the field.");
            break; //OK 2013-08-28
        case 7:
            $("#ccqHeader").text("Eat fresh");
            $("#ccqText").html("<p>Consider buying locally grown food. The further your food travels, the more pollution follows in transporting the food from the farm to your plate. You can find locally grown food at a farmers market and even at some grocery stores and perhaps you can grow your own.</p> <b>Just remember not to waste food.</b>");
            break; //OK 2013-08-28
        case 8:
            $("#ccqHeader").text("Save water ");
            $("#ccqText").html("When you save water, you are saving energy too. It takes a lot of energy to deliver the water you use at home every day. It takes even more energy to turn it into hot water. <br> By turning the water off while brushing your teeth and try taking shorter showers you are turning the world into a better place. You can also buy low-flow shower heads or keep the pressure at minimum. <br> Did you know that a faucet that leaks at a rate of one drip per second can waste more than 3,000 gallons of water in a year? It pays off to fix that dripping faucet.");
            break; //OK 2013-08-28
        default:
            $("#ccqHeader").text("What can I do?");
            $("#ccqText").text("Click on a picture and see what you can do to save your environment!");
            break;
    }
    else switch(number) { //Icelandic text
        case 1:
            $("#ccqHeader").text("Endurnota og endurvinna");
            $("#ccqText").html("<p><u>Sparsemi:</u> Oft kaupum við eitthvað sem við svo þurfum ekki á að halda eða endist stutt og endar því í ruslinu. Ef við vöndum valið og kaupum færri og vandaðri hluti þá minnkum við ruslið í heiminum. Það má líka velja hluti sem eru ekki margpakkaðir inni í plast og pappa.</p> <p><u>Endurnota:</u> Ef við endurnýtum hluti spörum við peninga og hjálpum til við að hugsa vel um umhverfið. Við getum gefið öðrum hluti eða föt sem við þurfum ekki lengur á að halda og fengið lánaða hluti sem þú þarft að nota í stuttan tíma. Sumir taka með sér poka úr efni þegar þeir fara að versla og sleppa því að kaupa plastpoka. Það er líka hægt að kaupa notuð húsgögn og  föt. Dettur þér eitthvað fleira í hug?</p> <p><u>Endurvinna:</u> Þegar eitthvað er endurunnið þá getur það öðlast nýjan tilgang. Plastflöskur eru endurunnar og notaðar í föt úr flísefni og hægt er að fá keyptan endurunninn pappír. Eru endurvinnslutunnur á þínu heimili eða í skólanum?</p> <p>Sumir hafa gaman af því að taka gamla hluti og gera nýja úr þeim. Það er hægt að nýta brotna diska í mósaík, gera skálar úr gömlum vínylplötum, klippa nælonsokka niður í hárteygjur og hengja gamla hjólabrettið upp sem hillu. <br> Möguleikarnir eru óþrjótandi og þú getur notað internetið, bækur og eigið ímyndunarafl til að fá snilldarhugmynd!</p>"); // OK 2013-08-16
            break;
        case 2:
            $("#ccqHeader").text("Samgöngur");
            $("#ccqText").html("Því fleiri bílar sem keyra um göturnar því meiri verður útblástur koltvíoxíðs. Ef þú ákveður að ganga, hjóla eða ferðast með strætó þá hjálpar þú Jörðinni og dregur úr mengun. Svo er það líka svo gott fyrir líkamann að fá hreyfingu. Þú getur hvatt foreldra þína til að sameina margar ökuferðir í eina og með því að deila bíl og nota almenningssamgöngur eins og strætisvagna leggjum við mikið af mörkum. Færð þú einhvern tíma far með vinum/vinkonum þínum á æfingar eða þeir/þær með þér? Foreldrar ykkar geta sparað tíma og peninga með því að skiptast á að aka ykkur og svo verður mengunin minni. Hefur þú prófað að taka strætó?"); // OK 2013-08-16
            break;
        case 3:
            $("#ccqHeader").text("Sparaðu rafmagn");
            $("#ccqText").html("Þú sparar rafmagn t.d. með því að taka raftæki úr sambandi þegar þau eru ekki í notkun. Þau eyða rafmagni jafnvel þó slökkt sé á þeim. Oft gleymum við að taka hleðslutæki fyrir síma og tölvur úr sambandi eftir notkun. Þá lekur svolítið af rafmagni út til einskis og við sóum orku og peningum.  Sumrin á Íslandi eru björt og óþarfi að hafa öll ljós kveikt. Munum líka eftir því að slökkva ljósin þegar farið er út úr herbergi. Margir gleyma til dæmis að slökkva ljósin inni á baðherbergi eða á ganginum heima hjá sér. <br> Þegar þú og fjölskyldan verslið rafmagnstæki þá getið þið athugað hvort þau séu orkusparandi. Mörg tæki eins og ísskápar og þvottavélar hafa sérstaka gæðastimpla um orkusparnað sem kemur sér vel fyrir ykkur og umhverfið."); // OK 2013-08-16
            break;
        case 4:
            $("#ccqHeader").text("Deildu þekkingu þinni");
            $("#ccqText").html("Nú veistu heilmikið um loftslagsbreytingar og hvernig er hægt að draga úr þeim og finna lausnir á þeim. Þú getur gefið fjölskyldu og vinum  ráðleggingar og haldið fyrirlestur í skólanum eða félagshópum. Margir listamenn skapa list sem fær fólk til að hugsa um umhverfið og áhrif þeirra á það. Sumir nýta sér endurunnið efni eða náttúruleg efni eins og hey og snjó í listaverkin. Hefur þú séð útilistaverk? Er skólinn þinn með grenndarskóg eða útikennslusvæði? <br> Hópur fólks getur haft meiri áhrif en ein manneskja. Ef þú átt þér eitthvað hjartans mál sem getur gert heiminn að betri stað finndu þá aðra sem deila sama áhuga og látið hendur standa fram úr ermum."); // OK 2013-08-16
            break;
        case 5:
            $("#ccqHeader").text("Endurnýtanleg orka");
            $("#ccqText").html("1. Flestallir orkugjafar heimsins koma frá bruna jarðefnaeldsneytis eins og kola og olíu. Við það losnar mikið af gasi út í andrúmsloftið sem veldur auknu magni koltvíoxíðs og loftslagsbreytingum. Endurnýtanlegir orkugjafar eins og vindur, sólskin, vatn og hiti jarðar (jarðvarmi) verða aldrei uppurnir eða búnir. Með því að nota þessar hreinu orkuuppsprettur getum við framleitt það rafmagn sem við þurfum í okkar daglega lífi án þess að menga og sleppa koltvíoxíði út í andrúmsloftið. Þar með hægjum við á loftslagsbreytingum. </br> Vð á Íslandi eigum mikið af vatni sem nýtist sem orkugjafi.  Húsin okkar eru því annað hvort hituð upp með vatni sem kemur úr jarðvarma virkjunum eða með rafmagni frá vatnsorkuverum. </br> Hvernig er það í öðrum löndum?");
            break;
        case 6:
            $("#ccqHeader").text("Gróðursettu tré");
            $("#ccqText").html("Gróðursetning trjáa er gagnlegt jörðinni okkar á marga vegu. Trén hjálpa til við að draga úr loftslagsbreytingum með ljóstillífun. Þau draga í sig koltvíoxíð og kolefnið er bundið í trénu (viðnum) og þannig minnkar magn koltvíoxíðs í andrúmsloftinu.  Aðrar plöntur eins og blóm og runnar gera slíkt hið sama en í minna magni. <br> Trjágróður gefur skjól fyrir veðri og vindum, myndar svala skugga fyrir dýr og fólk þegar heitt er í veðri og grípur snjóinn með greinum sínum á veturna. Tré eru líka híbýli fugla og annarra dýra. Hvaða dýr búa í trjágróðri á Íslandi? Þekkir þú ákveðnar trjátegundir í sjón?"); // OK 2013-08-16
            break;
        case 7:
            $("#ccqHeader").text("Fersk fæða");
            $("#ccqText").html("Matur sem framleiddur er í öðrum löndum og fluttur til Íslands þarf að ferðast um langan veg með skipum, lestum og bílum. Því lengri vegalengdir því meiri mengun hlýst af flutningunum. Auk þess taka pakkningar pláss og enda sem rusl sem þarf að farga. Hægt er að kaupa mat sem framleiddur er á Íslandi í búðum eða „beint frá býli“. Auk þess rækta margir sitt eigið grænmeti og jurtir. Hefur þú ræktað grænmeti, t.d. í skólagörðum? Þekkirðu einhverja sem eiga sínar eigin hænur sem sér þeim fyrir eggjum? "); // OK 2013-08-16
            break;
        case 8:
            $("#ccqHeader").text("Sparaðu vatn");
            $("#ccqText").html("Þegar þú sparar vatnsnotkun þá spararðu orku um leið. Það kostar mikla orku að koma vatninu heim til þín og það þarf enn meiri orku til að breyta því í heitt neysluvatn. <br> 6. Með því að skrúfa fyrir vatnið þegar þú burstar tennur og eyða styttri tíma í sturtunni stuðlarðu að hreinni veröld. <br> Vissir þú að ef vatnskrani lekur einum dropa á sekúndufresti þá tapar hann yfir 11 þúsund lítrum af vatni á ári. Það borgar sig að gera við lekann. Við á Íslandi erum heppin með hreina vatnið okkar. Hefur þú einhvern tíma þurft að kaupa vatn?"); // OK 2013-08-16
            break;
        default:
            $("#ccqHeader").text("Hvað get ég gert?");
            $("#ccqText").text("Smelltu á mynd og sjáðu hvað þú getur gert til að bjarga umhverfinu!");
            break;
    }
}

function loadLvlJourney() {
    //~ Update background and title variables.
    bg = bg_class;
    t  = undefined;
    wb = undefined;
    
    //~ Setting Vimeo iframe source regarding to language.
    if (english) $('iframe#jv').attr('src','//player.vimeo.com/video/72345186?byline=0&amp;portrait=0&amp;color=89302f');
    else         $('iframe#jv').attr('src','//player.vimeo.com/video/72343749?byline=0&amp;portrait=0&amp;color=89302f');
    
    //~ Drawing background and objects.
    show('lvlJourney');
    refreshLayer1();
    refreshLayer2();
    
    //~ Play sound from the characters.
    audioPlay(0,0, 16,18);
}

function LVLjourney_silenceThem() {
    audioStop();
    $("#repeat").css('background-image', 'url(' + iconRepeatGlow.src + ')');
}

function loadLvl0() {
    //~ Update background and title variables.
    bg = bg0;
    t  = undefined;
    wb = undefined;
    p  = undefined;
    scoreReset();
    
    //~ Drawing background and objects.
    clearLayer(ctx3);
    show('lvl0');
    refreshLayer1();
    
    //~ Fancy pants smoke effects.
    var smokeNr=0;
    function refreshSmoke() {
        var rand = Math.floor(Math.random()*5);
        switch(rand) {
            case 0: sm = sm0; break;
            case 1: sm = sm1; break;
            case 2: sm = sm2; break;
            case 3: sm = sm3; break;
            case 4: sm = sm4; smokeNr=0; break;
            default:sm = sm0; break;
        }
        refreshLayer3();
    }
    refreshSmoke();
    smokeTimer = setInterval(refreshSmoke,1500);
}

function loadPre1() {
    //~ Update background and title variables.
    bg = bg_class;
    t  = undefined;
    wb = bg1;
    
    //~ Drawing objects.
    show('pre1');
    refreshLayer1();
    refreshLayer2();
    
    //~ Playing sound.
    audioPlay(20,20, 22,20);
}

function loadLvl1() {
    //~ Update background and title variables.
    bg = bg1;
    if (english) t = t1_en; else t = t1_is;
    wb = undefined;
    
    //~ Initializing pressure bar.
    p = p0;
    pressure = 0;
    
    //~ Resetting values (in case of level reload).
    timerStart(20);
    stepIntervalCounter=0;
    
    //~ Hides and shows the right elements for level 1.
    show('lvl1');
    document.getElementById("lvl1_gameOver").style.display = 'none';
    refreshLayer1();
    refreshLayer3(); // Smoke & pressure bar.
    
    /* Ratio of gases
     *  70% CO2
     *  20-25% H2S
     *  5-10% H2
     */
    var maxMolecules = 20;
    var extraMolecules = 3;
    for (var i=0; i<maxMolecules+extraMolecules; i++) {
        var s;
        if (i<maxMolecules*0.1) {
            s = "clH2  fromTopLeft";
        } else if (i<maxMolecules*0.3) {
            s = "clH2S fromTopLeft";
        } else if (i<maxMolecules) {
            s = "clCO2 fromTopLeft draggable";
        } else if (i<maxMolecules+extraMolecules/3) {
            s = "clH2  fromTopLeft";
        } else {
            s = "clH2S fromTopLeft";
        }
        var id = "lvl1_id" + (i+10);
        
        //~ In case of level reload an object with this ID may already exist.
        if (!$("#"+id).length) {
            //~ Object does NOT already exist.
            $("#lvl1_frame").append("<div class='" + s + "' id='" + id + "'></div>");
        } else {
            //~ The object do exist but we may have modified it's classes.
            $("#"+id).addClass(s);
        }
        
        if (i<maxMolecules) {
            $("#"+id).css('top', rand(0,464));
            $("#"+id).css('left', rand(0,460));
        } else {
            //~ Extra molecules in the lower (wrong) pipe for demenstration purposes.
            $("#"+id).css('top', rand(335,360));
            $("#"+id).css('left', rand(535,772));
        }
    }
    
    $(".draggable").draggable({
        obstacle: ".lvl1_obstacles",
        preventCollision: true,
        containment: "#lvl1_frame",
        disabled: false
    });
    
    $(".droppable").droppable({
        over: function( event, ui ) {
            LVL1_updatePressure(+1);
        },
        out: function( event, ui ) {
            LVL1_updatePressure(-1);
        },
        drop: function( event, ui ) {
            ui.draggable.removeClass("draggable");
            ui.draggable.draggable( "disable" );
            scoreCurrentLevel=5*pressure;
            console.log(scoreCurrentLevel);
            scoreUpdateLive();
            if (pressure>=8) {
                //~ Level solved!
                LVL1_solved();
            }
        }
    });
}

function LVL1_updatePressure(diff) {
    pressure+=diff;
    if (pressure<0) pressure=0;
    if (pressure>8) pressure=8;
    switch (pressure) {
        case 0: p = p0; break;
        case 1: p = p0; break;
        case 2: p = p1; break;
        case 3: p = p1; break;
        case 4: p = p2; break;
        case 5: p = p2; break;
        case 6: p = p3; break;
        case 7: p = p3; break;
        case 8: p = p4; break;
        default:p = p0; break;
    } refreshLayer3();
}

function LVL1_solved() {
    timerPause();
    allowNextLevel=true;
    scoreCurrentLevel+=100+10*secondsLeft;
    scoreUpdateLive();
    $("#next").css('background-image', 'url(' + iconNextGlow.src + ')');
    elementNext.style.display = 'inline';
    document.getElementById("lvl1_gameOver").style.display = 'inline';
}

function loadPost1() {
    //~ Update background and title variables.
    bg = bg_class;
    t  = undefined;
    wb = bg1;
    
    //~ Hides and shows the right elements for post 1.
    show('post1');
    refreshLayer1();
    refreshLayer2();
    
    //~ Playing sound.
    audioPlay(40.5,39.5, 7.5,7);
}

function loadPre2() {
    //~ Update background and title variables.
    bg = bg_class;
    t  = undefined;
    wb = bg2;
    
    //~ Hides and shows the right elements for pre 2.
    show('pre2');
    refreshLayer1();
    refreshLayer2();
    
    //~ Playing sound.
    audioPlay(47,46, 36,34);
}

function loadLvl2() {
    //~ Update background and title variables.
    bg = bg2;
    if (english) t = t2_en; else t = t2_is;
    wb = undefined;
    
    //~ Cleaning up if level is re-played.
    $("#lvl2_fuserCO2").css('left', 110);
    $("#lvl2_fuserCO2").css('top', 155);
    $("#lvl2_fuserH2O").css('left', 881);
    $("#lvl2_fuserH2O").css('top', 305);
    $("#lvl2_outcomeH2CO3").css('left', 240);
    $("#lvl2_outcomeH2CO3").css('top', 300);
    
    //~ Resetting values (in case of level reload).
    timerStart(60);
    stepIntervalCounter=0;
    clearInterval(stepIntervalTimer);
    
    //~ Hides and shows the right elements for level 2.
    show('lvl2');
    document.getElementById("lvl2_gameOver").style.display = 'none';
    document.getElementById("lvl2_outcomeH2CO3").style.display = 'none';
    refreshLayer1();
    
    /* Creating the pipes.
     *  1: st-E
     *  2: st-N
     *  3: cu-NE
     *  4: cu-NW
     *  5: cu-SW
     *  6: cu-SE
     */
        //~ **Cheat solution for devolping purposes only**
        //~ pipes = [
                    //~ [rand(2,2),rand(5,5),rand(1,2),rand(3,6),rand(1,2),rand(3,6),rand(6,6),rand(1,1)],
                    //~ [rand(6,6),rand(4,4),rand(6,6),rand(1,1),rand(5,5),rand(2,2),rand(2,2),rand(3,6)],
                    //~ [rand(2,2),rand(3,6),rand(2,2),rand(3,6),rand(2,2),rand(3,3),rand(3,3),rand(5,5)],
                    //~ [rand(3,3),rand(1,1),rand(4,4),rand(1,2),rand(3,3),rand(1,1),rand(1,1),rand(4,4)]
        //~ ];
    pipes = [
                [rand(1,2),rand(3,6),rand(1,2),rand(3,6),rand(1,2),rand(3,6),rand(3,6),rand(1,2)],
                [rand(3,6),rand(3,6),rand(3,6),rand(1,2),rand(3,6),rand(1,2),rand(1,2),rand(3,6)],
                [rand(1,2),rand(3,6),rand(1,2),rand(3,6),rand(1,2),rand(3,6),rand(3,6),rand(3,6)],
                [rand(3,6),rand(1,2),rand(3,6),rand(1,2),rand(3,6),rand(1,2),rand(1,2),rand(3,6)]
    ];
    sP = [
            [0,7],[0,6],[1,6],[2,6],[2,7],[3,7],[3,6],[3,5],[3,4],[2,4],[1,4],
            [1,3],[1,2],[2,2],[3,2],[3,1],[3,0],[2,0],[1,0],[1,1],[0,1],[0,0]
    ];
    
    for (var i=0; i<4; i++) {
        for (var j=0; j<8; j++) {
            var id = 10*i + j;
            if (!$("#"+id).length) {
                $("#lvl2_frame").append("<div class='lvl2_pipes gameable' id='" + id + "' onClick='LVL2_changePipeBg(this);'></div>");
                $("#"+id).css('top', (64*i+301));
                $("#"+id).css('left', (64*j+362));
            }
            LVL2_setPipeBg(id,pipes[i][j],false);
        }
    }
}

function LVL2_setPipeBg(ID,number,blue) {
    if (!blue) {
        switch(number) {
            case 1: $("#"+ID).css('background-image', 'url(' + stEwh.src  + ')'); break;
            case 2: $("#"+ID).css('background-image', 'url(' + stNwh.src  + ')'); break;
            case 3: $("#"+ID).css('background-image', 'url(' + cuNEwh.src + ')'); break;
            case 4: $("#"+ID).css('background-image', 'url(' + cuNWwh.src + ')'); break;
            case 5: $("#"+ID).css('background-image', 'url(' + cuSWwh.src + ')'); break;
            case 6: $("#"+ID).css('background-image', 'url(' + cuSEwh.src + ')'); break;
            default: console.log("[LVL2_setPipeBg] number (white): "+number); break;
        }
    } else {
        switch(number) {
            case 1: $("#"+ID).css('background-image', 'url(' + stEbl.src  + ')'); break;
            case 2: $("#"+ID).css('background-image', 'url(' + stNbl.src  + ')'); break;
            case 3: $("#"+ID).css('background-image', 'url(' + cuNEbl.src + ')'); break;
            case 4: $("#"+ID).css('background-image', 'url(' + cuNWbl.src + ')'); break;
            case 5: $("#"+ID).css('background-image', 'url(' + cuSWbl.src + ')'); break;
            case 6: $("#"+ID).css('background-image', 'url(' + cuSEbl.src + ')'); break;
            default: console.log("[LVL2_setPipeBg] number (blue): "+number); break;
        }
    }
}

function LVL2_changePipeBg(item) {
    var id = parseInt($(item).attr("id"));
    var i = Math.floor(id/10);
    var j = id%10;
    switch(pipes[i][j]) {
        case 1: pipes[i][j]=2; LVL2_setPipeBg(id,2,false); break;
        case 2: pipes[i][j]=1; LVL2_setPipeBg(id,1,false); break;
        case 3: pipes[i][j]=4; LVL2_setPipeBg(id,4,false); break;
        case 4: pipes[i][j]=5; LVL2_setPipeBg(id,5,false); break;
        case 5: pipes[i][j]=6; LVL2_setPipeBg(id,6,false); break;
        case 6: pipes[i][j]=3; LVL2_setPipeBg(id,3,false); break;
        default: console.log("LVL2_changePipeBg: default"); break;
    }
    
    //~ Checks everytime whether or not the level is correctly solved.
    allowNextLevel = (pipes[0][7]==1 && pipes[0][6]==6 && pipes[1][6]==2 && pipes[2][6]==3 && pipes[2][7]==5 && pipes[3][7]==4 && pipes[3][6]==1 && pipes[3][5]==1 && pipes[3][4]==3 && pipes[2][4]==2 && pipes[1][4]==5 && pipes[1][3]==1 && pipes[1][2]==6 && pipes[2][2]==2 && pipes[3][2]==4 && pipes[3][1]==1 && pipes[3][0]==3 && pipes[2][0]==2 && pipes[1][0]==6 && pipes[1][1]==4 && pipes[0][1]==5 && pipes[0][0]==1);
    
    if (allowNextLevel) {
        //~ Level solved!
        LVL2_solved();
    }
}

function LVL2_waterStreaming() {
    var t=stepIntervalCounter++;
    if (stepIntervalCounter>sP.length) {
        clearInterval(stepIntervalTimer);
        stepIntervalCounter=0;
        stepIntervalTimer = setInterval(LVL2_combustion, 50);
    } else {
        var id = 10*sP[t][0] + sP[t][1];
        $("#lvl2_fuserH2O").css('top',  (64*sP[t][0]+305));
        $("#lvl2_fuserH2O").css('left', (64*sP[t][1]+370));
        LVL2_setPipeBg(id, pipes[ sP[t][0] ][ sP[t][1] ], true);
    }
}

function LVL2_combustion() {
    stepIntervalCounter++;
    
    if (stepIntervalCounter<25) {
        //~ 25 steps: move CO2 125px right
        $("#lvl2_fuserCO2").css('left', (5*(stepIntervalCounter-0)+110));
    } else if (stepIntervalCounter<30) {
        //~ 5 steps: Do nothing
    } else if (stepIntervalCounter<56) {
        //~ 26 steps: move H2O 130px left
        $("#lvl2_fuserH2O").css('left', (370 - 5*(stepIntervalCounter-30) ) );
        $("#lvl2_fuserCO2").css('top',  (155 + 6*(stepIntervalCounter-30) ) );
    } else if (stepIntervalCounter<71) {
        //~ 15 steps: Do nothing
    } else if (stepIntervalCounter==72) {
        //~ 1 step: Fusion
        document.getElementById("lvl2_fuserH2O").style.display = 'none';
        document.getElementById("lvl2_fuserCO2").style.display = 'none';
        document.getElementById("lvl2_outcomeH2CO3").style.display = 'inline';
    } else if (stepIntervalCounter<80) {
        //~ 8 steps: Do nothing
    } else if (stepIntervalCounter<160) {
        //~ 80 steps: move H2CO3 down
        $("#lvl2_outcomeH2CO3").css('top',  (300 + 5*(stepIntervalCounter-80) ) );
    } else {
        clearInterval(stepIntervalTimer);
        $("#next").css('background-image', 'url(' + iconNextGlow.src + ')');
    }
}

function LVL2_solved() {
    timerPause();
    document.getElementById("lvl2_gameOver").style.display = 'inline';
    scoreCurrentLevel=100+5*secondsLeft;
    scoreUpdateLive();
    $("#next").css('background-image', 'url(' + iconNextGlow.src + ')');
    elementNext.style.display = 'inline';
    document.getElementById("lvl2_fuserH2O").style.display = 'inline';
    stepIntervalTimer = setInterval(LVL2_waterStreaming, 200);
}


function loadPost2() {
    //~ Update background and title variables.
    bg = bg_class;
    t  = undefined;
    wb = bg2;
    
    //~ Hides and shows the right elements for post 2.
    show('post2');
    refreshLayer1();
    refreshLayer2();
    
    //~ Playing sound.
    audioPlay(83,80, 11,11);
}

function loadPre3() {
    //~ Update background and title variables.
    bg = bg_class;
    t  = undefined;
    wb = bg3;
    
    //~ Hides and shows the right elements for pre 3.
    show('pre3');
    refreshLayer1();
    refreshLayer2();
    
    //~ Playing sound.
    audioPlay(94.5,91, 13.5,11);
}

function loadLvl3() {
    //~ Update background and title variables.
    bg = bg3;
    t  = t3;
    wb = undefined;
    
    //~ Starting timer to complete level.
    timerStart(20);
    stepIntervalCounter=0;
    clearInterval(stepIntervalTimer);
    
    //~ Resetting values (in case of level reload).
    countCalcite=0;
    countSideride=0;
    countMagnecite=0;
    LVL3_resetFuser();
    LVL3_drawRandomBasaltland();
    allowMovement=true;
    
    //~ Hides and shows the right elements for level 3.
    show('lvl3');
    refreshLayer1();
}

function LVL3_getCord (pos) {
    if (pos%2==1) { //~ An visible square.
        return 128 + 64*(pos-1)/2;
    } else { //~ Unvisible barrier (taking 4px on each square).
        return 128 + 64*pos/2 - 2;
    }
}

function LVL3_resetFuser() {
    X=1,Y=1;
    $("#lvl3_fuserH2CO3").css('left', LVL3_getCord(X)+6);
    $("#lvl3_fuserH2CO3").css('top', LVL3_getCord(Y));
}

function LVL3_drawGrid() {
    for (var x = 0; x <= 768; x += 64) {
        ctxLVL3.moveTo(x,   0);
        ctxLVL3.lineTo(x, 512);
    }
    for (var y = 0; y <= 512; y += 64) {
        ctxLVL3.moveTo(  0, y);
        ctxLVL3.lineTo(768, y);
    }
    ctxLVL3.strokeStyle = "#eee";
    ctxLVL3.stroke();
}

function LVL3_drawRandomBasaltland() {
    ctxLVL3.clearRect(0,0,768,512);
    LVL3_drawGrid();
    ctxLVL3.fillStyle = "black";
    
    //~ Clearing the basalt boolean map
    for (var i=1; i<basaltMap.length-1; i++) {
        for (var j=1; j<basaltMap[0].length; j++) {
            basaltMap[i][j]=false;
        }
    } //max: basaltMap[16][24]
    
    //~ Drawing vertical obstacles
    for (var i=0; i<16; i++) {
        var r1 = rand(1,11)*2;
        var r2 = rand(1, 8)*2-1;
        ctxLVL3.fillRect( LVL3_getCord(r1)-128 , LVL3_getCord(r2)-128 , 4 , 64 );
        basaltMap[r2][r1] = true;
    }
    
    //~ Drawing horizontal obstacles
    for (var i=0; i<24; i++) {
        var r1 = rand(1,12)*2-1;
        var r2 = rand(1, 7)*2;
        ctxLVL3.fillRect( LVL3_getCord(r1)-128 , LVL3_getCord(r2)-128 , 64 , 4 );
        basaltMap[r2][r1] = true;
    }
    
    //~ Placing catajons.
    for (var i=1; i<=9; i++) {
        var ID;
        if (i<=3) {
            ID = "#fuseCalcite"+i;
            $(ID).removeClass("crystalOfCalcite").addClass("catajonOfCalcite");
        } else if (i<=6) {
            ID = "#fuseSideride"+(i-3);
            $(ID).removeClass("crystalOfSideride").addClass("catajonOfSideride");
        } else {
            ID = magneciteID = "#fuseMagnecite"+(i-6);
            $(ID).removeClass("crystalOfMagnecite").addClass("catajonOfMagnecite");
        }
        
        var r1 = 1;
        var r2 = 1;
        
        while ( (r1==1 && r2==1) || basaltMap[r2][r1] ) {
            //~ Not putting catajons on starting square nor on occupied squares.
            r1 = rand(0,11)*2+1;
            r2 = rand(0,7)*2+1;
        } basaltMap[r2][r1] = ID;
        
        $(ID).css('left', LVL3_getCord(r1)+2);
        $(ID).css('top',  LVL3_getCord(r2)+2);
    }
}

function LVL3_collision(tY,tX) {
    //~ Returns true if basaltMap[Y][X] is occupied.
    if (basaltMap[tY][tX]) { // yes, it's occupied
        if ( $(basaltMap[tY][tX]).hasClass('crystalOfCalcite') || $(basaltMap[tY][tX]).hasClass('crystalOfSideride') || $(basaltMap[tY][tX]).hasClass('crystalOfMagnecite') ) {
            console.log("Colliding with "+basaltMap[tY][tX]+".");
        } else {
            var s = basaltMap[tY][tX].charAt(5);
            switch (s) {
                case 'C':
                    $(basaltMap[tY][tX]).removeClass("catajonOfCalcite").addClass("crystalOfCalcite");
                    countCalcite++;
                    break;
                case 'S':
                    $(basaltMap[tY][tX]).removeClass("catajonOfSideride").addClass("crystalOfSideride");
                    countSideride++;
                    break;
                case 'M':
                    $(basaltMap[tY][tX]).removeClass("catajonOfMagnecite").addClass("crystalOfMagnecite");
                    countMagnecite++;
                    break;
                default: 
                    console.log("Bad charAt number.");
                    break;
            }
            scoreCurrentLevel+=5;
            scoreUpdateLive();
            LVL3_resetFuser();
            if (countCalcite+countSideride+countMagnecite==9) LVL3_solved();
        } return true;
    } else { // no, it's vacant
        return false;
    }
}

function LVL3_solved() {
    timerPause();
    allowMovement=false;
    allowNextLevel=true;
    scoreCurrentLevel=100+10*secondsLeft;
    scoreUpdateLive();
    $("#repeat").css('background-image', 'url(' + iconRepeatGlow.src + ')');
    elementNext.style.display = 'inline';
}


function loadPost3() {
    //~ Update background and title variables.
    bg = bg_class;
    t  = undefined;
    wb = undefined;
    
    //~ Hides and shows the right elements for post 3.
    show('post3');
    refreshLayer1();
    refreshLayer2();
    
    //~ How many crystals did you get?
    $("#numberOfCalcite").html(countCalcite+"x <img src='images/crystals/crystal_calcite.png'>");
    $("#numberOfSideride").html(countSideride+"x <img src='images/crystals/crystal_sideride.png'>");
    $("#numberOfMagnecite").html(countMagnecite+"x <img src='images/crystals/crystal_magnecite.png'>");
    
    //~ Playing sound.
    audioPlay(108,109, 20,18);
}


    /* Helper functions */


//~ Hide all elements by class name 's'.
function hide(s) {
    var temp = document.getElementsByClassName(s);
    for (var i=0; i<temp.length; i++) {
        temp[i].style.display = 'none';
    }
}

//~ Show all elements by class name 's'.
function show(s) {
    var temp = document.getElementsByClassName(s);
    for (var i=0; i<temp.length; i++) {
        temp[i].style.display = 'inline';
    }
}

function clearSmoke() {
    clearInterval(smokeTimer);
    clearLayer(ctx3);
    sm = undefined;
}

//~ Layer1: Background & title.
function refreshLayer1() {
    ctx1.clearRect(0, 0, 1024, 768);
    ctx1.drawImage(bg, 0, 0);
    if (t) {
        var offX, offY;
        switch (level) {
            case 3: offX=400-t.width/2; offY=100; break;
            case 6: offX=630-t.width/2; offY=220; break;
            case 9: offX=512-t.width/2; offY= 40; break;
            default: offX=512-t.width/2; offY=40; break;
        }
        ctx1.drawImage(t,offX,offY);
    }
}

//~ Layer2: Whiteboard, Fix & Carrie.
function refreshLayer2() {
    ctx2.clearRect(0, 0, 1024, 768);
    if (wb) ctx2.drawImage(wb,256,140,512,384); // (x,y,w,h)
    ctx2.drawImage(carry,  0, 710-carry_y, carry_x, carry_y);
    ctx2.drawImage(fix,  750, 720-fix_y,     fix_x,   fix_y);
}

//~ Layer3: Smoke & Pressure bar.
function refreshLayer3() {
    ctx3.clearRect(0, 0, 1024, 768);
    if (sm) ctx3.drawImage(sm,0,0);
    if (p)  ctx3.drawImage(p,665,353,p_x,p_y);
}

//~ Layer4: <unused>
function refreshLayer4() {
    ctx4.clearRect(0, 0, 1024, 768);
}

//~ Layer5: Movable H2CO3 character in LVL3. 
function refreshLayer5() {
    ctx5.clearRect(0, 0, 1024, 768);
    ctx5.drawImage(H2CO3,X+1,Y+1,64-2,64-2);
}

function clearLayer(context) {
    context.clearRect(0, 0, 1024, 768);
}


//~ Returns a random integer from the interval [x;y] where x,y are integers.
function rand(x,y) {
    return Math.floor( Math.random()*(y-x+1) + x );
}


//~ Keydown function.
$(document).keydown(function(e){
    if (level==9 && allowMovement) {
        switch (e.which) {
            case 37: //left
                if (X-2>=0 && !basaltMap[Y][X-1] && !LVL3_collision(Y,X-2) ) {
                    X-=2;
                    $("#lvl3_fuserH2CO3").css('left', LVL3_getCord(X)+6);
                } break;
            case 38: //up
                if (Y-2>=0 && !basaltMap[Y-1][X] && !LVL3_collision(Y-2,X) ) {
                    Y-=2;
                    $("#lvl3_fuserH2CO3").css('top', LVL3_getCord(Y));
                } break;
            case 39: //right
                if (X+2<=24 && !basaltMap[Y][X+1] && !LVL3_collision(Y,X+2) ) {
                    X+=2;
                    $("#lvl3_fuserH2CO3").css('left', LVL3_getCord(X)+6);
                } break;
            case 40: //down
                if (Y+2<=16 && !basaltMap[Y+1][X] && !LVL3_collision(Y+2,X) ) {
                    Y+=2;
                    $("#lvl3_fuserH2CO3").css('top', LVL3_getCord(Y));
                } break;
            default: return;
        }
        e.preventDefault();
    }
});