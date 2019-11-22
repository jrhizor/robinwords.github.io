// RobinWords Game code
var used_words = new Array();
var swear_words = Array('fuck', 'shit', 'cunt', 'dick', 'damn', 'crap', 'mong', 'gook', 'kike', 'spic', 'dyke', 'arse', 'hell', 'wang', 'wank', 'muff', 'puss', 'shag', 'heck', 'slut', 'turd', 'jizz', 'piss', 'twat', 'tits', 'meth', 'porn', 'fags', 'shat');
var count = 0;


function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.parentNode;
    }
    return { top: _y, left: _x };
}
               
function mark_as_used(word) {
    if (used_words.length > 0) {
        used_words[used_words.length] = word
    } else {
        used_words[0] = word
    }
}
function add_to_screen(word, who) {
    count++;
    var el = new Element('p', {
        'class': 'word ' + who,
        'html': '<a href="http://dictionary.reference.com/browse/' + word + '" target="_blank">' + word + '</a>'
    });
    el.fade('hide').inject($('words'), 'bottom').fade(1)
    
    if(!elementInViewport($('entry')))
    {
        window.scrollTo(0,getOffset( $('entry') ).top - 40);
    }
}
function check_if_unused(word) {
    if (used_words.indexOf(word) == -1) {
        return 1
    } else {
        return 0
    }
}
function check_if_exists(word) {
    if (word_list.indexOf(word) == -1) {
        return 0
    } else {
        return 1
    }
}
function check_if_correct(current_word) {
    var previous = used_words[used_words.length - 1];
    var same_letters = 0;
    if (current_word.charAt(0) == previous.charAt(0)) {
        same_letters = same_letters + 1
    }
    if (current_word.charAt(1) == previous.charAt(1)) {
        same_letters = same_letters + 1
    }
    if (current_word.charAt(2) == previous.charAt(2)) {
        same_letters = same_letters + 1
    }
    if (current_word.charAt(3) == previous.charAt(3)) {
        same_letters = same_letters + 1
    }
    if (same_letters == 3) {
        return 1
    } else {
        return 0
    }
}
function show_error(type) {
    $('entry').set('disabled', 'disabled');
    $('entry_area').setStyle('display', 'none');
    if (type == 'notallowed') {
        $('errors').set('text', 'You can only change one letter at a time.')
    } else if (type == 'notreal') {
        $('errors').set('text', 'That is not a real four-letter word.')
    } else if (type == 'alreadyused') {
        $('errors').set('text', 'That word has already been used.')
    }
    $('errors').fade(1);
    var s = setTimeout(function waiting() {
        $('errors').fade('hide');
        $('entry_area').setStyle('display', 'block');
        $('entry').set('value', '');
        $('entry').set('disabled', '');
        $('entry_area').fade(.0001);
        $('entry_area').fade(1);
        $('entry').focus()
    }, 2000)
}
function all_cuss_words(words) {

    var chosen_word = words[Math.floor(Math.random() * (words.length - 1))];
    var all_cuss = true;
    var i = 0;
    for (i = 0; i <= (2 * words.length); i++) {
        if (swear_words.indexOf(chosen_word) != -1) {
            chosen_word = words[Math.floor(Math.random() * (words.length - 1))]
        } else {
            return false
        }
    }
    return true
}
window.addEvent('domready', function () {
    $('errors').fade('hide');
    $('entry').focus();
    
    
    var first_word = word_list[Math.floor(Math.random() * (word_list.length - 1))];
	var i = 0;
    for(i = 0; i <= 50; i++) {
        if (swear_words.indexOf(first_word) != -1) {
            first_word = word_list[Math.floor(Math.random() * (word_list.length - 1))]
        }
    }
    mark_as_used(first_word);
    add_to_screen(first_word, 'computer');
    $('entry_form').addEvent('submit', function (e) {
        e.stop();
        
        var entered_word = $('entry').get('value').toLowerCase();
        if (check_if_unused(entered_word)) {
            if (check_if_exists(entered_word)) {
                if (check_if_correct(entered_word)) {
					// ADD PERSON WORD
                    mark_as_used(entered_word);               
 					add_to_screen(entered_word, 'person');

                   	$('entry').set('value', '');
		            $('entry').set('disabled', 'disabled');

                    var possible_words = new Array();
                    var i;
                    for (i = 0; i <= (word_list.length - 1); i = i + 1) {
                        var previous = used_words[used_words.length - 1];
                        var same_letters = 0;
                        if (previous.charAt(0) == word_list[i].charAt(0)) {
                            same_letters = same_letters + 1
                        }
                        if (previous.charAt(1) == word_list[i].charAt(1)) {
                            same_letters = same_letters + 1
                        }
                        if (previous.charAt(2) == word_list[i].charAt(2)) {
                            same_letters = same_letters + 1
                        }
                        if (previous.charAt(3) == word_list[i].charAt(3)) {
                            same_letters = same_letters + 1
                        }
                        if (check_if_unused(word_list[i]) == 0) {
                            same_letters = same_letters - 5
                        }
                        if (same_letters == 3) {
                            possible_words[possible_words.length] = word_list[i]
                        }
                    }
                    if (possible_words.length < 1 || all_cuss_words(possible_words)) {
                        $('score_one').set('html', used_words.length);
                        $('entry_area').dispose();
                        $('win').fade(0);
                        $('win').setStyle('display', 'block');
                        $('win').fade(1);
						$('button_playagain').setStyle('display', 'block')
						$(document.body).setStyle('padding-bottom', 35);
						// scroll upon win
						scroll.toBottom();
                        return 0
                    }

                    var chosen_word = possible_words[Math.floor(Math.random() * (possible_words.length - 1))];
                    var i = 0;
                    for(i = 0; i <= 50; i++) {
                        if (swear_words.indexOf(chosen_word) != -1) {
                            chosen_word = possible_words[Math.floor(Math.random() * (possible_words.length - 1))]
                        }
                    }
                    var t = setTimeout(function waiting() {
						// ADD COMPUTER WORD
                        mark_as_used(chosen_word);
                        add_to_screen(chosen_word, 'computer');
                        $('entry').set('disabled', '');
					    $('entry').focus();
                        var possible_words = new Array();
                        var i;
                        for (i = 0; i <= (word_list.length - 1); i = i + 1) {
                            var previous = used_words[used_words.length - 1];
                            var same_letters = 0;
                            if (previous.charAt(0) == word_list[i].charAt(0)) {
                                same_letters = same_letters + 1
                            }
                            if (previous.charAt(1) == word_list[i].charAt(1)) {
                                same_letters = same_letters + 1
                            }
                            if (previous.charAt(2) == word_list[i].charAt(2)) {
                                same_letters = same_letters + 1
                            }
                            if (previous.charAt(3) == word_list[i].charAt(3)) {
                                same_letters = same_letters + 1
                            }
                            if (check_if_unused(word_list[i]) == 0) {
                                same_letters = same_letters - 5
                            }
                            if (same_letters == 3) {
                                possible_words[possible_words.length] = word_list[i]
                            }
                        }
                        if (possible_words.length < 1) {
                            $('score_two').set('html', used_words.length);
                            $('entry_area').dispose();
                            $('lose').fade(0);
                            $('lose').setStyle('display', 'block');
                            $('lose').fade(1);

							$('button_playagain').setStyle('display', 'block')
							$(document.body).setStyle('padding-bottom', 72);
                            // scroll on lose
                            scroll.toBottom();
                            return 0
                        }
                        
                           
                        
                    }, 1500)
                } else {
                    show_error('notallowed')
                }
            } else {
                show_error('notreal')
            }
        } else {
            show_error('alreadyused')
        }
    })
});