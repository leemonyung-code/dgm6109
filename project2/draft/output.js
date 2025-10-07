(function(){
  window.output = function(content, htmlFlag){
    var out = document.getElementById('output');
    if(!out){ console.warn('No #output element'); return; }
    if(content === undefined){ console.log('WARNING: You did not provide anything to output'); return; }
    var p = document.createElement('p');
    if(htmlFlag === true){ p.innerHTML = content; } else { p.textContent = content; }
    out.appendChild(p);
  };
})();