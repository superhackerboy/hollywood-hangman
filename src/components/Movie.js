import React, { useState, useRef } from "react";
import Title from "./Title";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { useDispatch, useSelector } from "react-redux";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function Movie() {
  const { letters } = useSelector(state => state.movie);
  const { data } = useSelector(state => state.movie);
  const isMobile = useSelector(state => state.isMobile);
  const dispatch = useDispatch();

  const [layout] = useState("default");
  const keyboard = useRef();

  const onKeyPress = letter => {
    if (letter === "☕️") {
      window.open("http://2spacemilk.com", "_blank");
    } else letterCheck(letter.toLowerCase());
  };

  const letterCheck = letter => {
    // checks if letter has already been entered
    if (!letters.includes(letter)) {
      dispatch({ type: "ADD_LETTER", letter });
      const re = new RegExp(`${letter}`, "gi");

      if (re.test(data.title)) {
        // "tries" remains same if letter is in title

        dispatch({ type: "CORRECT_GUESS", letter });
      } else {
        // tries-- if letter is not in title

        dispatch({ type: "DECREMENT_TRIES" });
      }
    }
  };

  return (
    <div>
      <Title />

      <p>
        {data?.title}{" "}
        <span style={{ color: "rgba(0,0,0,.2)" }}> {data?.imdbID}</span>
      </p>
      <p>{data?.plot}</p>
      <p>Actors: {data?.actors}</p>
      <p>Director: {data?.director}</p>

      {isMobile && (
        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          layoutName={layout}
          onKeyPress={onKeyPress}
          theme={"hg-theme-default hg-layout-default myTheme"}
          layout={{
            default: [
              "Q W E R T Y U I O P",
              "A S D F G H J K L",
              "Z X C V B N M ☕️",
            ],
          }}
          className='pin-bottom'
        />
      )}

      <KeyboardEventHandler
        handleKeys={[..."qwertyuiopasdfghjklzxcvbnm"]}
        onKeyEvent={letter => letterCheck(letter)}
      />
    </div>
  );
}

export default Movie;
