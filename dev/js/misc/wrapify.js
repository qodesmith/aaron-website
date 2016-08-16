// DESCRIPTION:
// Takes an parent element, finds all it's decsendants that are text nodes,
// and wraps them in a newly-created DOM element that is specified.

// ARGUMENTS:
// `parentEl`  : DOM node - the element to target its contents.
// `newEl`     : string   - type of DOM node to create as the wrapper.
// `className` : string   - class name to apply to all wrapped children.
function wrapify(parentEl, newEl, className) {
  [].map.call(parentEl.childNodes, function(node) {
    // Ignore new line characters.
    if (node.textContent.match(/\n/)) return;

    // Only wrap text nodes.
    if (node.nodeType === Node.TEXT_NODE /* 3 */) {
      var clone = node.cloneNode();
      var wrapper = document.createElement(newEl);

      if (className) wrapper.classList.add(className);
      wrapper.appendChild(clone);

      parentEl.replaceChild(wrapper, node);
    } else {
      wrapify(node, newEl, className);
    }
  });
}
