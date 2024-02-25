-- CreateTable
CREATE TABLE "cinemas" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cinemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cinema_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "role" SMALLINT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "functions" (
    "id" TEXT NOT NULL,
    "movie_format_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "start_at" TIMESTAMP(6) NOT NULL,
    "kids_price" REAL,
    "adults_price" REAL,
    "max_seats" SMALLINT,

    CONSTRAINT "functions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "curp" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "card" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("curp")
);

-- CreateTable
CREATE TABLE "movie_formats" (
    "id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "format" BIGINT NOT NULL,

    CONSTRAINT "movie_formats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_sales" (
    "function_id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "adults" SMALLINT NOT NULL,
    "kids" SMALLINT NOT NULL,

    CONSTRAINT "movie_sales_pkey" PRIMARY KEY ("function_id","sale_id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "duration" SMALLINT NOT NULL,
    "classification" TEXT NOT NULL,
    "sinopsis" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_sales" (
    "product_id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "quantity" SMALLINT NOT NULL,

    CONSTRAINT "product_sales_pkey" PRIMARY KEY ("product_id","sale_id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "cinema_id" TEXT NOT NULL,
    "stock" SMALLINT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "registers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "adults_price" REAL NOT NULL,
    "kids_price" REAL NOT NULL,
    "name" TEXT NOT NULL,
    "cinema_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_seats" (
    "seat_id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,

    CONSTRAINT "sale_seats_pkey" PRIMARY KEY ("seat_id","sale_id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "x" SMALLINT NOT NULL,
    "y" SMALLINT NOT NULL,
    "size" SMALLINT NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cinemas_name_key" ON "cinemas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_card_key" ON "memberships"("card");

-- CreateIndex
CREATE UNIQUE INDEX "movies_name_key" ON "movies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "registers_email_key" ON "registers"("email");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_cinema_id_fkey" FOREIGN KEY ("cinema_id") REFERENCES "cinemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "functions" ADD CONSTRAINT "functions_movie_format_id_fkey" FOREIGN KEY ("movie_format_id") REFERENCES "movie_formats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "functions" ADD CONSTRAINT "functions_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_formats" ADD CONSTRAINT "movie_formats_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_sales" ADD CONSTRAINT "movie_sales_function_id_fkey" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_sales" ADD CONSTRAINT "movie_sales_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_sales" ADD CONSTRAINT "product_sales_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_sales" ADD CONSTRAINT "product_sales_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cinema_id_fkey" FOREIGN KEY ("cinema_id") REFERENCES "cinemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registers" ADD CONSTRAINT "registers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_cinema_id_fkey" FOREIGN KEY ("cinema_id") REFERENCES "cinemas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_seats" ADD CONSTRAINT "sale_seats_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_seats" ADD CONSTRAINT "sale_seats_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
