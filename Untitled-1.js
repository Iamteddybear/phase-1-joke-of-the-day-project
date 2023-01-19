//nicks help

document.addEventListener("DOMContentLoaded", function () {
    const getJokeBtn = document.getElementById("getJokeBtn");
    const jokeContainer = document.getElementById("jokeContainer");
    const jokesList = document.getElementById("jokesList");
    let clicks = 0;
    let filteredJokes = [];
    let allJokes = [];
    let id = 0;
  
    getJokeBtn.addEventListener("click", function () {
      setTimeout(() => {
        document.getElementById("Jokeofday").classList.remove("hide");
      }, 1650);
      if (confirm("Do You Want Your Joke?")) {
        clicks++;
        setTimeout(() => {
          jokeContainer.classList.add("border");
        }, 820);
  
        fetch("https://v2.jokeapi.dev/joke/Any?safe-mode")
          .then(response => response.json())
          .then(joke => {
            function createJokeListItem(jokeObj) {
              const li = document.createElement("li");
              li.textContent = `${joke.setup}\n ${joke.delivery}`;
              li.addEventListener("click", function () {
                let jokeToShowInContainer = allJokes.find(joke => {
                  console.log(`inside eventlistener, joke.id=${joke.id}`);
                  console.log(`inside eventlistener, jokeObj.id=${joke,id}`);
                  joke.id === jokeObj.id
                })
                console.log(`jokeToShowInContainer=${jokeToShowInContainer}`);
                jokeContainer.innerHTML = "";
                const p = document.createElement("p");
                p.textContent = `${jokeToShowInContainer.setup}\n ${jokeToShowInContainer.delivery}`;
                jokeContainer.appendChild(p);
              });
              jokesList.appendChild(li);
            }
  
            function createJokeElements(joke) {
              console.log(`inside createJokeElements, joke=${JSON.stringify(joke)}`);
              jokeContainer.innerHTML = "";
              let jokeObj = {
                id: id + 1,
                setup: joke.setup,
                delivery: joke.delivery
              }
  
              const setup = document.createElement("p");
              setup.textContent = joke.setup;
              jokeContainer.appendChild(setup);
              createJokeListItem(jokeObj);
              filteredJokes.push(joke.setup)
              const delivery = document.createElement("p");
              delivery.textContent = joke.delivery;
              jokeContainer.appendChild(delivery);
  
              allJokes.push(jokeObj);
              // if (joke.joke) {
              //   const p = document.createElement("p");
              //   p.textContent = joke.joke;
              //   jokeContainer.appendChild(p);
              //   createJokeListItem(joke.joke);
              //   filteredJokes.push(joke.joke)
              // } else {
              //   let jokeObj = {
              //     id: id + 1,
              //     setup: joke.setup,
              //     delivery: joke.delivery
              //   }
  
              //   allJokes.push(jokeObj);
  
                
              //   const setup = document.createElement("p");
              //   setup.textContent = joke.setup;
              //   jokeContainer.appendChild(setup);
              //   createJokeListItem(jokeObj);
              //   filteredJokes.push(joke.setup)
              //   const delivery = document.createElement("p");
              //   delivery.textContent = joke.delivery;
              //   jokeContainer.appendChild(delivery);
              //   // createJokeListItem(joke.delivery);
              //   filteredJokes.push(joke.delivery)
              // }
            }
  
            filteredJokes = filteredJokes.filter(joke => joke.length <= 10);
            filteredJokes.forEach(joke => {
              const li = document.createElement("li");
              li.textContent = joke;
              li.addEventListener("click", function () {
                jokeContainer.innerHTML = "";
                const p = document.createElement("p");
                p.textContent = this.textContent;
                jokeContainer.appendChild(p);
              });
              jokesList.appendChild(li);
            });
  
            createJokeElements(joke);
            jokeContainer.classList.remove("hide");
  
            if (clicks > 5) {
              clicks--;
              jokesList.removeChild(jokesList.firstChild);
              filteredJokes.shift();
            }
          });
      };
    })
  });
  