var demoHTML = {
  cursor: [
    '<div class="white-space">',
    'typer(<span class="yellow">\'.someClass\'</span>, ',
    '<span class="purple">100</span>)</div>'
  ].join(''),
  line: [
    '<div class="white-space">  .cursor({<span ',
    'class="highlight block">block: <span class="purple">true</span></span>,',
    ' <span class="highlight blink">blink: <span class="yellow">\'hard\'',
    '</span></span>})</div>'
  ].join(''),
  continue: [
    '<div class="white-space">  .line(<span class="yellow">',
    '\'Typer.js is pure JS awesomeness!\'</span>)</div>',
    '<div class="white-space">  .back(<span class="yellow">\'empty\'</span>)</div>'
  ].join(''),
  emit: [
    '<div class="white-space">typer(<span class="yellow">\'',
    '.someClass\'</span>, <span class="purple">100</span>)</div>',
    '<div class="white-space">  .cursor({block: <span class="purple">true</span>,',
    ' blink: <span class="yellow">\'hard\'</span>})</div>',
    '<div class="white-space">  ',
    '.line(<span class="yellow">\'Typer.js rulez!\'</span>)</div>'
  ].join(''),
  empty: [
    '<div class="white-space">typer(<span class="yellow">\'.someClass\'</span>, ',
    '<span class="purple">100</span>)</div><div class="white-space">  ',
    '.cursor({block: <span class="purple">true</span>, blink: <span class="yellow">',
    '\'hard\'</span>})</div><div class="white-space">  .line(<span class="yellow">',
    '\'Typer.js rulez!\'</span>)</div><div class="white-space">  ',
    '.listen(<span class="yellow">\'boom\'</span>, <span class="yellow">',
    '\'.anotherClass\'</span>)</div>'
  ].join(''),
  run: '<div class="white-space">  .empty()</div>',
  end: [
    '<div class="white-space">  .run(<span class="aqua italic">function</span>',
    '(<span class="orange italic">el</span>) {<br>    <span class="gray italic">',
    '// el = the parent element Typer is typing in.</span><br>    el.',
    '<span class="aqua">style</span>.<span class="aqua">backgroundColor</span> ',
    '<span class="pink">=</span> <span class="yellow">\'#00C28C\'</span>;<br>  })</div>'
  ].join('')
};
