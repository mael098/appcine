-- drop all tables
drop table if exists function_seats;
drop table if exists movie_sales;
drop table if exists function_seats;
drop table if exists seats;
drop table if exists movie_sales;
drop table if exists functions;
drop table if exists room;
drop table if exists product_sales;
drop table if exists products;
drop table if exists transaction_sales;
drop table if exists employees;
drop table if exists memberships;
drop table if exists registers;
drop table if exists users;
drop table if exists cinemas;
drop table if exists movie_formats;
drop table if exists movies;

-- drop function get_available_functions_by_movie
drop function get_available_functions_by_movie(text, timestamp without time zone);

-- create tables
create table
  movies (
    id text not null,
    created_at timestamp without time zone not null default now(),
    name text not null,
    duration smallint not null,
    classification text not null,
    sinopsis text not null,
    director text not null,
    image text not null,
    cover text not null,
    dubbed boolean not null default false,
    constraint movies_pkey primary key (id),
    constraint movies_name_key unique (name),
    constraint movies_duration_check check (duration > 0)
  );

create table
  movie_formats (
    id text not null,
    movie_id text not null,
    format bigint not null,
    constraint movie_formats_pkey primary key (id),
    constraint movie_formats_movie_id_fkey foreign key (movie_id) references movies (id) on update cascade on delete cascade,
    constraint movie_formats_format_check check (format >= 0)
  );

create table
  cinemas (
    id text not null,
    created_at timestamp without time zone not null default now(),
    name text not null,
    latitude real not null,
    longitude real not null,
    active boolean not null default true,
    constraint cinemas_pkey primary key (id),
    constraint cinemas_name_key unique (name)
  );

create table
  users (
    id text not null,
    username text not null,
    constraint users_pkey primary key (id)
  );

create table
  registers (
    id text not null,
    created_at timestamp without time zone not null default now(),
    email text not null,
    password text not null,
    user_id text null,
    constraint registers_pkey primary key (id),
    constraint registers_user_id_fkey foreign key (user_id) references users (id) on update cascade on delete set null,
    constraint registers_email_key unique (email),
    constraint registers_email_check check (position('@' in email) > 0)
  );

create table
  memberships (
    curp text not null,
    created_at timestamp without time zone not null default now(),
    name text not null,
    card text not null,
    user_id text null,
    constraint memberships_pkey primary key (curp),
    constraint memberships_card_key unique (card),
    constraint memberships_user_id_fkey foreign key (user_id) references users (id) on update cascade on delete set null,
    constraint memberships_curp_check check (length(curp) = 18),
    constraint memberships_card_check check (length(card) = 16)
  );

create table
  employees (
    id text not null,
    created_at timestamp without time zone not null default now(),
    cinema_id text not null,
    name text not null,
    email text not null,
    password text not null,
    constraint employees_pkey primary key (id),
    constraint employees_email_key unique (email),
    constraint employees_cinema_id_fkey foreign key (cinema_id) references cinemas (id) on update cascade on delete cascade
  );

create table
  transaction_sales (
    id text not null,
    created_at timestamp without time zone not null default now(),
    employee_id text null,
    user_id text null,
    cinema_id text null,
    constraint transaction_sales_pkey primary key (id),
    constraint transaction_sales_employee_id_fkey foreign key (employee_id) references employees (id) on update cascade on delete restrict,
    constraint transaction_sales_user_id_fkey foreign key (user_id) references users (id) on update cascade on delete set null,
    constraint transaction_sales_cinema_id_fkey foreign key (cinema_id) references cinemas (id) on update cascade on delete cascade
  );

create table
  products (
    id text not null,
    name text not null,
    price real not null,
    cinema_id text not null,
    stock smallint not null,
    constraint products_pkey primary key (id),
    constraint products_stock_check check (stock >= 0),
    constraint products_cinema_id_fkey foreign key (cinema_id) references cinemas (id) on update cascade on delete cascade,
    constraint products_price_check check (price >= 0)
  );

create table
  product_sales (
    id text not null,
    product_id text not null,
    transaction_id text not null,
    quantity smallint not null,
    constraint product_sales_pkey primary key (id),
    constraint product_sales_product_id_fkey foreign key (product_id) references products (id) on update cascade on delete restrict,
    constraint product_sales_transaction_id_fkey foreign key (transaction_id) references transaction_sales (id) on update cascade on delete cascade,
    constraint product_sales_quantity_check check (quantity > 0)
  );

create table
  room (
    id text not null,
    adults_price real not null,
    kids_price real not null,
    name text not null,
    cinema_id text not null,
    description text not null,
    constraint room_pkey primary key (id),
    constraint room_cinema_id_fkey foreign key (cinema_id) references cinemas (id) on update cascade on delete cascade,
    constraint room_adults_price_check check (adults_price >= 0),
    constraint room_kids_price_check check (kids_price >= 0)
  );

create table
  functions (
    id text not null,
    movie_format_id text not null,
    room_id text not null,
    start_at timestamp without time zone not null,
    kids_price real, 
    adults_price real,
    constraint functions_pkey primary key (id),
    constraint functions_movie_format_id_fkey foreign key (movie_format_id) references movie_formats (id) on update cascade on delete cascade,
    constraint functions_room_id_fkey foreign key (room_id) references room (id) on update cascade on delete cascade,
    constraint functions_start_at_check check (start_at > now()),
    constraint functions_kids_price_check check (kids_price >= 0),
    constraint functions_adults_price_check check (adults_price >= 0)
  );

create table
  seats (
    id text not null,
    room_id text not null,
    x smallint not null,
    y smallint not null,
    size smallint not null,
    disponible boolean not null default true,
    constraint seats_pkey primary key (id),
    constraint seats_room_id_fkey foreign key (room_id) references room (id) on update cascade on delete cascade,
    constraint seats_size_check check (size > 0)
  );

create table
  movie_sales (
    id text not null,
    function_id text not null,
    transaction_id text not null,
    adults smallint not null,
    kids smallint not null,
    constraint movie_sales_pkey primary key (id),
    constraint movie_sales_function_id_fkey foreign key (function_id) references functions (id) on update cascade on delete restrict,
    constraint movie_sales_transaction_id_fkey foreign key (transaction_id) references transaction_sales (id) on update cascade on delete cascade,
    constraint movie_sales_adults_check check (adults >= 0),
    constraint movie_sales_kids_check check (kids >= 0)
  );

create table
  function_seats (
    id text not null,
    seat_id text not null,
    movie_sale_id text not null,
    disponible boolean not null default true,
    constraint function_seats_pkey primary key (id),
    constraint function_seats_seat_id_fkey foreign key (seat_id) references seats (id) on update cascade on delete restrict,
    constraint function_seats_movie_sale_id_fkey foreign key (movie_sale_id) references movie_sales (id) on update cascade on delete cascade
  );

-- test movies inserts
insert into movies (id, name, duration, classification, director, image, cover, sinopsis) values ('4776477102968832', 'The Dark Knight', 152, 'PG-13', 'Christopher Nolan', 'the_dark_knight.jpg', 'the_dark_knightc.jpg', 'Batman, Gordon and Harvey Dent are forced to deal with the chaos unleashed by an anarchist mastermind known only as the Joker, as it drives each of them to their limits.');
insert into movies (id, name, duration, classification, director, image, cover, sinopsis) values ('4776654085820416', 'The Dark Knight Rises', 164, 'PG-13', 'Christopher Nolan', 'the_dark_knight_rises.jpg', 'the_dark_knight_risesc.jpg', 'Eight years after the Joker''s reign of anarchy, Batman, with the help of the enigmatic Catwoman');
insert into movies (id, name, duration, classification, director, image, cover, sinopsis) values ('4777586638983168', 'Inception', 148, 'PG-13', 'Christopher Nolan', 'inception.jpg', 'inceptionc.jpg', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.');
insert into movies (id, name, duration, classification, director, image, cover, sinopsis) values ('4777759704354816', 'Interstellar', 169, 'PG-13', 'Christopher Nolan', 'interestelar.jpg', 'interestelarc.jpg', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.');

-- test movies_formats inserts
insert into movie_formats (id, movie_id, format) values ('4776477102968833', '4776477102968832', 0);
insert into movie_formats (id, movie_id, format) values ('4776477102968834', '4776477102968832', 1);

-- test cinemas inserts
insert into cinemas (id, name, latitude, longitude) values ('4776477102968837', 'Cinemex', 19.4326, -99.1332);
insert into cinemas (id, name, latitude, longitude) values ('4776654085820411', 'Cinepolis', 19.4346, -99.1335);

-- test room inserts
insert into room (id, adults_price, kids_price, name, cinema_id, description) values ('4776477102968842', 100, 50, 'Sala 1', '4776477102968837', 'Sala 1 normal');

-- test functions inserts
insert into functions (id, movie_format_id, room_id, start_at) values ('4776477102968835', '4776477102968833', '4776477102968842', '2024-03-05 23:59:59');
insert into functions (id, movie_format_id, room_id, start_at) values ('4776477102968836', '4776477102968834', '4776477102968842', '2024-03-06 05:00:00');

-- get functions by movie
select f.id, f.start_at, m.name, m.duration, r.name as room, r.adults_price, r.kids_price, mf.format from functions 
  f join movie_formats mf on f.movie_format_id = mf.id 
  join movies m on mf.movie_id = m.id 
  join room r on f.room_id = r.id 
  where m.id = '4776477102968832' and f.start_at > now();

-- function get_available_functions_by_movie
create or replace function get_available_functions_by_movie (movie text, date timestamp without time zone) 
returns table (
  id text,
  start_at timestamp without time zone,
  name text,
  duration smallint,
  room text,
  adults_price real,
  kids_price real,
  format bigint
) as $$
  begin
    return query
      select f.id, f.start_at, m.name, m.duration, r.name as room, r.adults_price, r.kids_price, mf.format 
      from functions f
      join movie_formats mf on f.movie_format_id = mf.id 
      join movies m on mf.movie_id = m.id 
      join room r on f.room_id = r.id 
      where m.id = movie
      and f.start_at > date;
  end;
$$ language plpgsql;