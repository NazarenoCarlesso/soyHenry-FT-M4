/* 1. Birthyear */
SELECT * FROM movies WHERE year=2001;

/* 2. 1982 */
SELECT COUNT(*) FROM movies WHERE year=1982;

/* 3. Stacktors */
SELECT * FROM actors WHERE last_name LIKE '%stack%';

/* 4. Fame Name Game */
SELECT first_name, COUNT(first_name)
FROM actors GROUP BY first_name
ORDER BY COUNT(first_name) DESC LIMIT 10;

SELECT last_name, COUNT(last_name)
FROM actors GROUP BY last_name
ORDER BY COUNT(last_name) DESC LIMIT 10;

SELECT first_name, last_name, COUNT(*)
FROM actors GROUP BY first_name, last_name
ORDER BY COUNT(*) DESC LIMIT 10;

/* 5. Prolific */
SELECT actor_id, COUNT(*) FROM roles GROUP BY actor_id ORDER BY COUNT(*) DESC LIMIT 10;

SELECT actors.first_name, actors.last_name, COUNT(*)
FROM actors JOIN roles ON actors.id = roles.actor_id
GROUP BY actors.id ORDER BY COUNT(*) DESC LIMIT 100;

/* 6. Bottom of the Barrel */
SELECT genre, COUNT(*)
FROM movies_genres GROUP BY genre
ORDER BY COUNT(*) ASC;

/* 7. Braveheart */
SELECT id FROM movies WHERE name='Braveheart' AND year=1995;

SELECT actors.first_name, actors.last_name
FROM actors
JOIN roles ON actors.id = roles.actor_id
JOIN movies ON roles.movie_id = movies.id
WHERE movies.name='Braveheart' AND movies.year=1995
ORDER BY actors.last_name ASC;

/* 8. Leap Noir */
SELECT first_name, name, year
FROM directors
JOIN directors_genres
ON directors.id = directors_genres.director_id
JOIN movies_directors
ON directors.id = movies_directors.director_id
JOIN movies
ON movies.id = movies_directors.movie_id
WHERE genre='Film-Noir' AND year%4=0
ORDER BY movies.name ASC;

/* 9. ° Bacon */
SELECT * FROM directors WHERE first_name='Kevin' AND last_name='Bacon';

SELECT actors.first_name, actors.last_name, movies.name
FROM actors
JOIN roles ON actors.id = roles.actor_id
JOIN movies ON movies.id = roles.movie_id
JOIN movies_directors
ON movies.id = movies_directors.movie_id
JOIN directors
ON directors.id = movies_directors.director_id
JOIN movies_genres
ON movies_genres.movie_id = movies.id
WHERE directors.first_name='Kevin' AND directors.last_name='Bacon'
AND movies_genres.genre='Drama';

/* 10. Immortal Actors */
SELECT actors.first_name, actors.last_name,
COUNT(CASE WHEN movies.year<'1900' THEN 1 ELSE NULL END) AS old,
COUNT(CASE WHEN movies.year>'2000' THEN 1 ELSE NULL END) AS new
FROM actors
JOIN roles ON actors.id = roles.actor_id
JOIN movies ON movies.id = roles.movie_id
GROUP BY actors.id
HAVING old>=1 AND new>=1;

/* 11. Busy Filming */

/* 12. ♀ */
SELECT movies.name, COUNT(CASE WHEN actors.gender='M' THEN 1 ELSE NULL END) AS M
FROM movies
JOIN roles ON movies.id = roles.movie_id
JOIN actors ON actors.id = roles.actor_id
GROUP BY movies.id
HAVING M=0;

SELECT year, COUNT(*) FROM movies
WHERE id IN (SELECT movies.id
FROM movies
JOIN roles ON movies.id = roles.movie_id
JOIN actors ON actors.id = roles.actor_id
GROUP BY movies.id
HAVING COUNT(CASE WHEN actors.gender='M' THEN 1 ELSE NULL END)=0)
GROUP BY year;