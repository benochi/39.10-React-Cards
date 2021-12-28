import { useState } from 'react';
import axios from "axios";
import { v4 as uuid} from 'uuid';

//useflip function called by PokemonCard and PlayingCard
function useFlip(initialState=true){
  const [isFlipped, setIsFlipped] = useState(initialState);
  //toggle state of isFlipped
  const flip = () => { 
    setIsFlipped(isUp => !isUp);
  };
  return [isFlipped, flip];
}

const useAxios = (url) => {
  const [cards, setCards] = useState([]);
  //send async axios get call to appropriate API(hardcoded in PlayingCardList and Pokedex)
  const getData = async (name) => {    
    //check for pokemon name and update URL accordingly
      if(name){url = url + name}
      //make API call
      const response = await axios.get(url);
      //populate array with response data. 
      setCards(cards => [...cards, { ...response.data, id: uuid() }]);
  }
return [cards, getData]
}

export { useFlip, useAxios };