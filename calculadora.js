    <script>
        function insert(num)
        {
            var numero = document.getElementById('resultado').innerHTML;
            document.getElementById('resultado').innerHTML = numero + num;
        }
        function clean()
        {
            document.getElementById('resultado').innerHTML = "";
        }
        function back()
        {
            var resultado = document.getElementById('resultado').innerHTML;
            document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length -1);
        }
        function calcular()
        {
            var resultado = document.getElementById('resultado').innerHTML;
            if(resultado)
            {
                document.getElementById('resultado').innerHTML = eval(resultado);
            }
            else
            {
                document.getElementById('resultado').innerHTML = "Nada..."
            }
        }

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
