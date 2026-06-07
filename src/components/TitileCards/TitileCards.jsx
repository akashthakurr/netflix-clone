import React, {useRef,useEffect, useState} from 'react'
import './TitileCards.css'
import cards_data from '../../assets/cards/Cards_Data'
import { Link } from 'react-router-dom';


const TitileCards = ({title,category}) => {
  const [apiData,setApiData] = useState([]);
  const cardsRef = React.useRef()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjQ5OTNmNjI3NzRjMzYzYmJiOThmMTE3NjRhZjI3ZSIsIm5iZiI6MTc3Mjk1MTY5MC42OCwic3ViIjoiNjlhZDE4OGEyNTNmM2RlYmE0ODBlNGQ5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.RUeaAR67cAGpHhqI8A4ox8mIINUhKJEE8NaO9nnoC3o'
    }
  };


  const handleWheel = (e) => {
    e.preventDefault()
    cardsRef.current.scrollLeft += e.deltaY
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w780`+ card.backdrop_path} alt=""/>
            <p>{card.title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitileCards

