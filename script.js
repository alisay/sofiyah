(function() {
    const spinner = document.querySelector('.spinner');
    const fortunes = ['./0.gif', './1.gif','./2.gif','./3.gif','./4.gif','./5.gif','./6.gif','./7.gif']
    console.log('hi')

    window.addEventListener('scroll', () =>{
        window.scrollTo(0, 0);
    });

    const randomNumber = (array) => {
        let index = Math.floor(Math.random() * (Math.floor(7) - Math.ceil(0) + 1));
        return array[index];
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
      }

    spinner.addEventListener('click', () => {
        spinner.style.pointerEvents = 'none';
        spinner.style.visibility = 'hidden';
        let img = document.createElement('img');
        img.id = 'spinning';
        img.src = randomNumber(fortunes);
        document.getElementById('app').insertBefore(img, spinner);

        setTimeout(() => {
            let junk = document.getElementById('spinning');
            junk.parentNode.removeChild(junk);
            spinner.style.visibility = 'visible';
            spinner.style.pointerEvents = 'auto';
        }, 30000)
    })
})();
