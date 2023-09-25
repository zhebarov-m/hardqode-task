import "./App.css";
import { Book, BookInformation, Review, User } from "./lib/types";
import { getBooks, getUsers, getReviews } from "./lib/api";
import { useEffect, useState, FC } from "react";
import Card from "./Card";

// Техническое задание:
// Доработать приложение App, чтобы в отрисованном списке
// были реальные отзывы, автор книги и автор отзыва.
// Данные об отзывах и пользователях можно получить при помощи асинхронных
// функций getUsers, getReviews

// функция getBooks возвращает Promise<Book[]>
// функция getUsers возвращает Promise<User[]>
// функция getReviews возвращает Promise<Review[]>

// В объектах реализующих интерфейс Book указаны только uuid
// пользователей и обзоров

// В объектах реализующих интерфейс BookInformation, ReviewInformation
// указана полная информация об пользователе и обзоре.

const toBookInformation = (
  book: Book,
  users: User[],
  reviews: Review[]
): BookInformation => {
  const author = users.find((user) => user.id === book.authorId) || {
    id: "",
    name: "Неизвестный автор",
  };
  const bookReviews = reviews
    .filter((review) => book.reviewIds.includes(review.id))
    .map((review) => ({
      id: review.id,
      text: review.text,
      user: users.find((user) => user.id === review.userId) || {
        id: "",
        name: "Неизвестный Рецезент",
      },
    }));

  return {
    id: book.id,
    name: book.name || "Книга без названия",
    author,
    reviews: bookReviews,
    description: book.description,
  };
};

const App: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedBooks = await getBooks();
        const fetchedUsers = await getUsers();
        const fetchedReviews = await getReviews();

        setBooks(fetchedBooks);
        setUsers(fetchedUsers);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: 'center' }}>
        {!isLoading &&
          books.map((b) => (
            <Card key={b.id} book={toBookInformation(b, users, reviews)} />
          ))}
      </div>
    </div>
  );
};

export default App;
