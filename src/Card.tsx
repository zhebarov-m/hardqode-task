import { FC } from "react";
import { BookInformation } from "./lib/types";

const Card: FC<{ book: BookInformation }> = ({ book }) => {
  return (
    <div className="card" style={{border: '2px solid wheat', borderRadius: 10, width: 450, backgroundColor: '#33333399', padding: 10, cursor: 'pointer'}}>
      <h1>{book.name}</h1>
      <h3>
        <b>Автор</b>: {book.author.name}
      </h3>
      <p>
        <b>Описание</b>: {book.description}
      </p>
      <p>
        <b>Отзывы:</b>
        {book.reviews.length > 0 ? (
          <ul>
            {book.reviews.map((review) => (
              <li key={review.id}>
                {review.text} (Отзыв от: {review.user.name})
              </li>
            ))}
          </ul>
        ) : (
          "Отзывов нет"
        )}
      </p>
    </div>
  );
};


export default Card;
