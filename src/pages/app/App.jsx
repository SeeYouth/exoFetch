import { useEffect, useState } from "react";

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=bordeaux&units=metric&lang=fr&appid=${apiKey}`;

  useEffect(() => {
    // Récupère les données depuis l'api avec url
    fetch(url)
      // Récupère les données depuis l'api et les inscrit dans un json
      .then((response) => response.json())
      // Lit les données du json et les stocke dans une variable
      .then((data) => {
        if (data.cod === 429) {
          // Si il y a eu trop de requête envoyé à l'api
          setErrorMessage(data.message);
          console.log("Erreur de if", data.message);
        } else if (data.cod === 200) {
          // Si l'on a bien reçu les données, on les inscrits dans setWeatherData
          setWeatherData(data);
          console.log("log elseIf", data);
        }
      })
      .catch((errorMessage) => {
        // Si une erreur est survenue, on l'affiche
        setErrorMessage("Une erreur est survenue.");
        console.error("Erreur de catch", errorMessage);
      });
    console.log("log fetch", weatherData);
    // On inscrit les données de useEffect dans un tableau, pour pouvoir s'en resservir
  }, [apiKey, url]);

  return (
    <main>
      <h1>Météo Fetch</h1>
      {/* Lien vers le json pour voir à quoi il ressemble */}
      <a className="apiLink" target="_blank" href={url}>
        {" "}
        Le JSON avec toutes les données dont tu peux te servir
      </a>
      <p className="important">
        Ouvrez vs code à coté pour avoir un aperçu du code que j'explique en
        dessous. <br />
        Toute la page n'est qu'un exemple du fonctionnement de fetch. <br />
        Chaque API à sa propre organisation, lire la doc est donc primordiale
        pour comprendre son fonctionnement.
      </p>
      {errorMessage && (
        <section>
          {/* S'il y a une erreur on affiche l'erreur sur la page */}
          <p>Erreur : {errorMessage}</p>
        </section>
      )}
      {/* Si l'on a bien reçu les informations, elles sont affichées directement sur la page */}
      {weatherData && (
        <section>
          <article>
            <div>
              <h2>Fontionnement de l'api Open Weather</h2>
              <p>
                Le lien vers la{" "}
                <a href="https://openweathermap.org/api/one-call-3">doc</a> de
                l'api que j'ai utilisé.
              </p>
              <h3>Le lien vers l'api : </h3>
              <p>{url}</p>
              <h4>https://api.openweathermap.org/data/2.5/weather?</h4>
              <p>Base du lien</p>
              <h4>q=bordeaux</h4>
              <p>
                Premier paramètre qui définis quelle ville est défini. <br />
              </p>
              <p>
                <span>{weatherData.name}</span> est le nom de la ville que l'on
                a récupérer avec fetch grâce à <span>"weatherData.name"</span>
              </p>
              <h4>units=metric</h4>
              <p>Ce qui permet d'avoir la température en Celsius</p>
              <p>
                <span>{weatherData.main.temp}°C</span> est la température que
                l'on a récupérer grâce à <span>"weatherData.main.temp"</span>.{" "}
                <br /> Mais il a fallu que l'on change un paramètre dans le lien
                vers l'api pour avoir la bonne formulation et des celsius.{" "}
                <br />
                Comme indiqué au-dessus avec <span>"units"</span> <br />
                Pour cela la
                <a href="https://openweathermap.org/api/one-call-3"> doc</a>,
                nous donne l'info.
              </p>
              <h4>lang=fr</h4>
              <p>Ce qui permet d'avoir la description en français</p>
              <p>
                <span>{weatherData.weather[0].description}</span> est la
                description de la météo que l'on a récupérer grâce à{" "}
                <span>"weatherData.weather[0].description"</span> et elle est
                bien en français. Comme on l'a indiqué au dessus avec{" "}
                <span>"lang"</span>
              </p>
              <h4>appid={apiKey}</h4>
              <p>Open Weather requière une clé api pour pouvoir être utilisé</p>
              <h4>&</h4>
              <p>Il permet d'ajouter des paramètres supplémentaire</p>
            </div>
            <h2>Fetch</h2>
            <h4>const [weatherData, setWeatherData] = useState(null);</h4>
            <p>
              C'est la constante qui permet de stocker les données et de pouvoir
              sans servir sur la page
            </p>
            <p>
              <span>weatherData & setWeatherData</span> sont deux variables qui
              permettent de stocker des données grâce à{" "}
              <span>"useState()"</span>. Leurs noms n'a pas d'importance si ce
              n'est représenter ce qu'elles contiennent
            </p>
            <h4>setWeatherData</h4>
            <p>Elle va être utilisé pour récuper les données de l'API</p>
            <h4>weatherData</h4>
            <p>
              Elle va servir à lire les données et les affichés à l'endroit
              souhaité. <br />
              Par exemple, <span>"weatherData.name"</span> qui permet de
              récupérer le nom de la ville ici <span>{weatherData.name}</span>
            </p>
            <h4>Fetch(url)</h4>
            <p>
              Fetch va utilisé l'adresse entre parenthèse pour envoyer une
              demande de données. <br />
              Cette demande va être reçu sous forme de <span>
                "promise"
              </span>{" "}
              qui va permettre de récupérer les données et de les envoyé vers un
              fichier json. <br />
              C'est le rôle de <span>"response"</span>A partir de là, on peut
              lire les données du fichier grâce à <span>"data"</span> qui sera
              du coup enregistrer dans <span>"setWeatherData"</span> pour être
              lu par <span>"weatherData"</span>
            </p>
          </article>
          <article className="cardWeather">
            <h2>{weatherData.name}</h2>
            <div className="dayWeather">
              <img
                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="Icone météo"
              />
              <p> {weatherData.main.temp}°C </p>
            </div>
            <p className="description">{weatherData.weather[0].description}</p>
          </article>
        </section>
      )}
    </main>
  );
};

export default App;
