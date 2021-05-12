(function () {
    const spinner = document.querySelector(".spinner")
    const fortunes = [
      "./0.gif",
      "./1.gif",
      "./2.gif",
      "./3.gif",
      "./4.gif",
      "./5.gif",
      "./6.gif",
      "./7.gif",
    ]
    console.log("hi")
  
    // keep image source for spinning gif in state
    let newImageSource
  
    window.addEventListener("scroll", () => {
      window.scrollTo(0, 0)
    })
  
    const randomNumber = (array) => {
      let index = Math.floor(Math.random() * (Math.floor(7) - Math.ceil(0) + 1))
      return array[index]
    }
  
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
    }
  
    // get new gif to display on click
    // checks that the new image is not the same as the last one
    const getNewImage = (oldImageSource, newImageSource) => {
      if (oldImageSource !== newImageSource) {
        return newImageSource
      }
      getNewImage(oldImageSource, randomNumber(fortunes))
    }
  
    spinner.addEventListener("click", () => {
      if (document.getElementById("spinning")) {
        document
          .getElementById("spinning")
          .parentNode.removeChild(document.getElementById("spinning"))
      }
  
      spinner.style.pointerEvents = "none"
      spinner.style.visibility = "hidden"
      spinner.style.position = "absolute"
  
      let img = document.createElement("img")
      img.id = "spinning"
  
      // use value in state and get new value only if newImageSource is undefined
      if (!newImageSource) {
        img.src = getNewImage(newImageSource, randomNumber(fortunes))
      } else {
        img.src = newImageSource
      }
  
      document.getElementById("app").insertBefore(img, spinner)
      document.body.style.pointerEvents = "none"
  
      // run when gif ends
      window.setTimeout(() => {
        let previousImageSource = document.getElementById("spinning").src
        newImageSource = getNewImage(previousImageSource, randomNumber(fortunes))
  
        let junk = document.getElementById("spinning")
        junk.parentNode.removeChild(junk)
        spinner.style.visibility = "visible"
        spinner.style.pointerEvents = "auto"
      }, 22000)
    })
  })()