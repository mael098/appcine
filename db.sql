-- create tables
create table
  movies (
    id text not null,
    created_at timestamp with time zone not null default now(),
    name text not null,
    duration smallint not null,
    classification text not null,
    director text not null,
    image text not null,
    cover text not null,
    constraint movies_pkey primary key (id),
    constraint movies_name_key unique (name),
    constraint movies_duration_check check (duration > 0)
  );

create table
  cinemas (
    id text not null,
    created_at timestamp with time zone not null default now(),
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
    created_at timestamp with time zone not null default now(),
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
    created_at timestamp with time zone not null default now(),
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
    created_at timestamp with time zone not null default now(),
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
    created_at timestamp with time zone not null default now(),
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
    movie_id text not null,
    room_id text not null,
    start_at timestamp with time zone not null,
    kids_price real, 
    adults_price real,
    constraint functions_pkey primary key (id),
    constraint functions_movie_id_fkey foreign key (movie_id) references movies (id) on update cascade on delete cascade,
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

-- test inserts
insert into movies (id, name, duration, classification, director, image, cover) values ('4776477102968832', 'The Dark Knight', 152, 'PG-13', 'Christopher Nolan', 'the_dark_knight.jpg', '19837283782782');
insert into movies (id, name, duration, classification, director, image, cover) values ('4776654085820416', 'The Dark Knight Rises', 164, 'PG-13', 'Christopher Nolan', 'the_dark_knight_rises.jpg', '19837283782782');
insert into movies (id, name, duration, classification, director, image, cover) values ('4777586638983168', 'Inception', 148, 'PG-13', 'Christopher Nolan', 'inception.jpg.jpg', '19837283782782');
insert into movies (id, name, duration, classification, director, image, cover) values ('4777759704354816', 'Interstellar', 169, 'PG-13', 'Christopher Nolan', 'interestelar.jpg', '19837283782782');