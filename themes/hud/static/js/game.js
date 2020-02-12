// RobinWords Game code
const SWEAR_WORDS = ['fuck', 'shit', 'cunt', 'dick', 'damn', 'crap', 'mong', 'gook', 'kike', 'spic', 'dyke', 'arse', 'hell', 'wang', 'wank', 'muff', 'puss', 'shag', 'heck', 'slut', 'turd', 'jizz', 'piss', 'twat', 'tits', 'meth', 'porn', 'fags', 'shat'];
const MAX_WORD_LENGTH = 4;

const used_words = [];
let count = 0;

function elementInViewport(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {
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

function getOffset(el) {
  let _x = 0;
  let _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.parentNode;
  }
  return { top: _y, left: _x };
}

function mark_as_used(word) {
  used_words.push(word);
}

function add_to_screen(word, who) {
  count++;
  const el = new Element('p', {
    'class': 'word ' + who,
    'html': '<a href="http://dictionary.reference.com/browse/' + word + '" target="_blank">' + word + '</a>',
  });
  el.fade('hide').inject($('words'), 'top').fade(1);

  if (!elementInViewport($('entry'))) {
    window.scrollTo(0, getOffset($('entry')).top - 40);
  }
}

function check_if_unused(word) {
  return used_words.indexOf(word) === -1;
}

function check_if_exists(word) {
  return WORD_LIST.indexOf(word) !== -1;
}

function check_if_correct(current_word) {
  const previous = used_words[used_words.length - 1];
  let same_letters = 0;
  for (let i = 0; i < MAX_WORD_LENGTH; ++i) {
    if (current_word.charAt(i) === previous.charAt(i)) {
      same_letters = same_letters + 1;
    }
  }
  return same_letters === 3;
}

function show_error(type) {
  $('entry').set('disabled', 'disabled');
  $('entry_area').setStyle('display', 'none');
  $('errors').setStyle('display', 'block');
  if (type === 'notallowed') {
    $('errors').set('text', 'You can only change one letter at a time.');
  } else if (type === 'notreal') {
    $('errors').set('text', 'That is not a real four-letter word.');
  } else if (type === 'alreadyused') {
    $('errors').set('text', 'That word has already been used.');
  }
  $('errors').fade(1);
  setTimeout(function waiting() {
    $('errors').fade('hide');
    $('errors').setStyle('display', 'none');
    $('entry_area').setStyle('display', 'block');
    $('entry').set('value', '');
    $('entry').set('disabled', '');
    $('entry_area').fade(.0001);
    $('entry_area').fade(1);
    $('entry').focus();
  }, 2000);
}

function all_cuss_words(words) {
  let chosen_word = words[Math.floor(Math.random() * (words.length - 1))];
  for (let i = 0; i <= (2 * words.length); i++) {
    if (SWEAR_WORDS.indexOf(chosen_word) !== -1) {
      chosen_word = words[Math.floor(Math.random() * (words.length - 1))];
    } else {
      return false;
    }
  }
  return true;
}

function get_possible_words(previous_word) {
  const possible_words = [];
  for (let i = 0; i < WORD_LIST.length; ++i) {
    const word_to_check = WORD_LIST[i];
    let same_letters = 0;
    for (let j = 0; j < MAX_WORD_LENGTH; ++j) {
      if (previous_word.charAt(j) === word_to_check.charAt(j)) {
        same_letters = same_letters + 1;
      }
    }
    if (check_if_unused(word_to_check) && same_letters === 3) {
      possible_words.push(word_to_check);
    }
  }
  return possible_words;
}

window.addEvent('domready', function () {
  $('errors').fade('hide');
  $('entry').focus();

  let first_word = WORD_LIST[Math.floor(Math.random() * (WORD_LIST.length - 1))];
  for (let i = 0; i <= 50; i++) {
    if (SWEAR_WORDS.indexOf(first_word) !== -1) {
      first_word = WORD_LIST[Math.floor(Math.random() * (WORD_LIST.length - 1))];
    }
  }
  mark_as_used(first_word);
  add_to_screen(first_word, 'computer');
  $('entry_form').addEvent('submit', function (e) {
    e.stop();

    const entered_word = $('entry').get('value').toLowerCase();
    if (!check_if_unused(entered_word)) {
      show_error('alreadyused');
      return;
    }
    if (!check_if_exists(entered_word)) {
      show_error('notreal');
      return;
    }
    if (!check_if_correct(entered_word)) {
      show_error('notallowed');
      return;
    }

    // ADD PERSON WORD
    mark_as_used(entered_word);
    add_to_screen(entered_word, 'person');

    $('entry').set('value', '');
    $('entry').set('disabled', 'disabled');

    const possible_words = get_possible_words(entered_word);
    if (possible_words.length < 1 || all_cuss_words(possible_words)) {
      $('score_one').set('html', used_words.length);
      $('entry_area').dispose();
      $('win').fade(0);
      $('win').setStyle('display', 'block');
      $('win').fade(1);
      $('button_playagain').setStyle('display', 'block');
      $(document.body).setStyle('padding-bottom', 35);
      // scroll upon win
      scroll.toBottom();
      return 0;
    }

    let chosen_word = possible_words[Math.floor(Math.random() * (possible_words.length - 1))];
    for (let i = 0; i <= 50; i++) {
      if (SWEAR_WORDS.indexOf(chosen_word) !== -1) {
        chosen_word = possible_words[Math.floor(Math.random() * (possible_words.length - 1))];
      }
    }

    setTimeout(function waiting() {
      // ADD COMPUTER WORD
      mark_as_used(chosen_word);
      add_to_screen(chosen_word, 'computer');
      $('entry').set('disabled', '');
      $('entry').focus();
      const possible_words = get_possible_words(chosen_word);
      if (possible_words.length < 1) {
        $('score_two').set('html', used_words.length);
        $('entry_area').dispose();
        $('lose').fade(0);
        $('lose').setStyle('display', 'block');
        $('lose').fade(1);

        $('button_playagain').setStyle('display', 'block');
        $(document.body).setStyle('padding-bottom', 72);
        // scroll on lose
        scroll.toBottom();
        return 0;
      }
    }, 1500);
  });
});
