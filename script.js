(function () {
    const spinner = document.querySelector('.spinner');
    const fortunes = ['./0.gif', './1.gif', './2.gif', './3.gif', './4.gif', './5.gif', './6.gif', './7.gif']
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    console.log('hi')

    window.addEventListener('scroll', () => {
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

    async function getFile(filepath) {
        const response = await fetch(filepath);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        return audioBuffer;
      }
      
      async function loadFile(filePath) {
        const track = await getFile(filePath);
        return track;
      }

    let offset = 0;

    function playTrack(audioBuffer) {
        const trackSource = audioCtx.createBufferSource();
        trackSource.buffer = audioBuffer;
        trackSource.connect(audioCtx.destination)

        if (offset == 0) {
            trackSource.start();
            offset = audioCtx.currentTime;
        } else {
            trackSource.start(0, audioCtx.currentTime - offset);
        }

        return trackSource;
    }


    spinner.addEventListener('click', () => {
        spinner.style.pointerEvents = 'none';
        spinner.style.visibility = 'hidden';
        let img = document.createElement('img');
        img.id = 'spinning';
        img.src = randomNumber(fortunes);
        document.getElementById('app').insertBefore(img, spinner);

        if (audioCtx != null) {
            return;
    }
        audioCtx = new AudioContext();
        
        const tracks = './a.mp3';

        loadFile(tracks)
        .then((track)=>{
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
              }
              playTrack(track);
        })    

        setTimeout(() => {
            let junk = document.getElementById('spinning');
            junk.parentNode.removeChild(junk);
            spinner.style.visibility = 'visible';
            spinner.style.pointerEvents = 'auto';
        }, 30000)
    })
})();
