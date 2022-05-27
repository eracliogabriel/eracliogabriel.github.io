<script>
    var dragMe = document.getElementById("calcdrag"),
  dragOfX = 0,
  dragOfY = 0;
    
function dragStart(e) {
    dragOfX = e.pageX - dragMe.offsetLeft;
    dragOfY = e.pageY - dragMe.offsetTop;
    
    addEventListener("mousemove", dragMove);
    addEventListener("mouseup", dragEnd);
}
    
function dragMove(e) {
    /* atualiza a posição do elemento */
    dragMe.style.left = (e.pageX - dragOfX) + 'px';
    dragMe.style.top = (e.pageY - dragOfY) + 'px';
}
    
function dragEnd() {
    removeEventListener("mousemove", dragMove);
    removeEventListener("mouseup", dragEnd);
}
dragMe.addEventListener("mousedown", dragStart);
</script>