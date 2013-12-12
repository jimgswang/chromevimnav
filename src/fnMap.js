/* Javascript keycodes can be up to 3 digits, so express every character's in 3 digits
 * pad 0's as needed
 * */

var fnMap = (function() {
    return {
        minCodeLength: 3,

        '072': scrollLeft,     // h
        '074': scrollDown,     // j
        '075': scrollUp,       // k
        '076': scrollRight     // l
    };

    function scrollLeft() {
        window.scrollBy(-50, 0);
    }

    function scrollDown() {
        window.scrollBy(0, 50);
    }

    function scrollUp() {
        window.scrollBy(0, -50);
    }

    function scrollRight() {
        window.scrollBy(50, 0);
    }
}()); 
        
