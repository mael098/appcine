export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            _prisma_migrations: {
                Row: {
                    applied_steps_count: number
                    checksum: string
                    finished_at: string | null
                    id: string
                    logs: string | null
                    migration_name: string
                    rolled_back_at: string | null
                    started_at: string
                }
                Insert: {
                    applied_steps_count?: number
                    checksum: string
                    finished_at?: string | null
                    id: string
                    logs?: string | null
                    migration_name: string
                    rolled_back_at?: string | null
                    started_at?: string
                }
                Update: {
                    applied_steps_count?: number
                    checksum?: string
                    finished_at?: string | null
                    id?: string
                    logs?: string | null
                    migration_name?: string
                    rolled_back_at?: string | null
                    started_at?: string
                }
                Relationships: []
            }
            cinemas: {
                Row: {
                    active: boolean
                    created_at: string
                    id: string
                    latitude: number
                    longitude: number
                    name: string
                }
                Insert: {
                    active?: boolean
                    created_at?: string
                    id: string
                    latitude: number
                    longitude: number
                    name: string
                }
                Update: {
                    active?: boolean
                    created_at?: string
                    id?: string
                    latitude?: number
                    longitude?: number
                    name?: string
                }
                Relationships: []
            }
            employees: {
                Row: {
                    active: boolean
                    cinema_id: string | null
                    cinemasId: string | null
                    created_at: string
                    email: string
                    id: string
                    name: string
                    password: string
                    role: Database["public"]["Enums"]["Role"]
                }
                Insert: {
                    active?: boolean
                    cinema_id?: string | null
                    cinemasId?: string | null
                    created_at?: string
                    email: string
                    id: string
                    name: string
                    password: string
                    role: Database["public"]["Enums"]["Role"]
                }
                Update: {
                    active?: boolean
                    cinema_id?: string | null
                    cinemasId?: string | null
                    created_at?: string
                    email?: string
                    id?: string
                    name?: string
                    password?: string
                    role?: Database["public"]["Enums"]["Role"]
                }
                Relationships: [
                    {
                        foreignKeyName: "employees_cinemasId_fkey"
                        columns: ["cinemasId"]
                        isOneToOne: false
                        referencedRelation: "cinemas"
                        referencedColumns: ["id"]
                    },
                ]
            }
            functions: {
                Row: {
                    adults_price: number | null
                    id: string
                    kids_price: number | null
                    max_seats: number | null
                    movie_format_id: string
                    room_id: string
                    start_at: string
                }
                Insert: {
                    adults_price?: number | null
                    id: string
                    kids_price?: number | null
                    max_seats?: number | null
                    movie_format_id: string
                    room_id: string
                    start_at: string
                }
                Update: {
                    adults_price?: number | null
                    id?: string
                    kids_price?: number | null
                    max_seats?: number | null
                    movie_format_id?: string
                    room_id?: string
                    start_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "functions_movie_format_id_fkey"
                        columns: ["movie_format_id"]
                        isOneToOne: false
                        referencedRelation: "movie_formats"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "functions_room_id_fkey"
                        columns: ["room_id"]
                        isOneToOne: false
                        referencedRelation: "room"
                        referencedColumns: ["id"]
                    },
                ]
            }
            memberships: {
                Row: {
                    card: string
                    created_at: string
                    curp: string
                    name: string
                    user_id: string | null
                }
                Insert: {
                    card: string
                    created_at?: string
                    curp: string
                    name: string
                    user_id?: string | null
                }
                Update: {
                    card?: string
                    created_at?: string
                    curp?: string
                    name?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "memberships_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            movie_formats: {
                Row: {
                    format: number
                    id: string
                    movie_id: string
                }
                Insert: {
                    format: number
                    id: string
                    movie_id: string
                }
                Update: {
                    format?: number
                    id?: string
                    movie_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "movie_formats_movie_id_fkey"
                        columns: ["movie_id"]
                        isOneToOne: false
                        referencedRelation: "movies"
                        referencedColumns: ["id"]
                    },
                ]
            }
            movie_sales: {
                Row: {
                    adults: number
                    function_id: string
                    kids: number
                    sale_id: string
                }
                Insert: {
                    adults: number
                    function_id: string
                    kids: number
                    sale_id: string
                }
                Update: {
                    adults?: number
                    function_id?: string
                    kids?: number
                    sale_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "movie_sales_function_id_fkey"
                        columns: ["function_id"]
                        isOneToOne: false
                        referencedRelation: "functions"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "movie_sales_sale_id_fkey"
                        columns: ["sale_id"]
                        isOneToOne: false
                        referencedRelation: "sales"
                        referencedColumns: ["id"]
                    },
                ]
            }
            movies: {
                Row: {
                    classification: Database["public"]["Enums"]["Classification"]
                    cover: string
                    created_at: string
                    director: string
                    duration: number
                    id: string
                    image: string
                    name: string
                    sinopsis: string
                }
                Insert: {
                    classification: Database["public"]["Enums"]["Classification"]
                    cover: string
                    created_at?: string
                    director: string
                    duration: number
                    id: string
                    image: string
                    name: string
                    sinopsis: string
                }
                Update: {
                    classification?: Database["public"]["Enums"]["Classification"]
                    cover?: string
                    created_at?: string
                    director?: string
                    duration?: number
                    id?: string
                    image?: string
                    name?: string
                    sinopsis?: string
                }
                Relationships: []
            }
            product_sales: {
                Row: {
                    product_id: string
                    quantity: number
                    sale_id: string
                }
                Insert: {
                    product_id: string
                    quantity: number
                    sale_id: string
                }
                Update: {
                    product_id?: string
                    quantity?: number
                    sale_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "product_sales_product_id_fkey"
                        columns: ["product_id"]
                        isOneToOne: false
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "product_sales_sale_id_fkey"
                        columns: ["sale_id"]
                        isOneToOne: false
                        referencedRelation: "sales"
                        referencedColumns: ["id"]
                    },
                ]
            }
            products: {
                Row: {
                    cinema_id: string
                    id: string
                    name: string
                    price: number
                    stock: number
                }
                Insert: {
                    cinema_id: string
                    id: string
                    name: string
                    price: number
                    stock: number
                }
                Update: {
                    cinema_id?: string
                    id?: string
                    name?: string
                    price?: number
                    stock?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "products_cinema_id_fkey"
                        columns: ["cinema_id"]
                        isOneToOne: false
                        referencedRelation: "cinemas"
                        referencedColumns: ["id"]
                    },
                ]
            }
            registers: {
                Row: {
                    created_at: string
                    email: string
                    id: string
                    password: string
                    user_id: string | null
                }
                Insert: {
                    created_at?: string
                    email: string
                    id: string
                    password: string
                    user_id?: string | null
                }
                Update: {
                    created_at?: string
                    email?: string
                    id?: string
                    password?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "registers_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            room: {
                Row: {
                    adults_price: number
                    cinema_id: string
                    description: string
                    id: string
                    kids_price: number
                    length: number
                    name: string
                    width: number
                }
                Insert: {
                    adults_price: number
                    cinema_id: string
                    description: string
                    id: string
                    kids_price: number
                    length: number
                    name: string
                    width: number
                }
                Update: {
                    adults_price?: number
                    cinema_id?: string
                    description?: string
                    id?: string
                    kids_price?: number
                    length?: number
                    name?: string
                    width?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "room_cinema_id_fkey"
                        columns: ["cinema_id"]
                        isOneToOne: false
                        referencedRelation: "cinemas"
                        referencedColumns: ["id"]
                    },
                ]
            }
            sale_seats: {
                Row: {
                    sale_id: string
                    seat_id: string
                }
                Insert: {
                    sale_id: string
                    seat_id: string
                }
                Update: {
                    sale_id?: string
                    seat_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "sale_seats_sale_id_fkey"
                        columns: ["sale_id"]
                        isOneToOne: false
                        referencedRelation: "sales"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "sale_seats_seat_id_fkey"
                        columns: ["seat_id"]
                        isOneToOne: false
                        referencedRelation: "seats"
                        referencedColumns: ["id"]
                    },
                ]
            }
            sales: {
                Row: {
                    created_at: string
                    employee_id: string | null
                    id: string
                    user_id: string | null
                }
                Insert: {
                    created_at?: string
                    employee_id?: string | null
                    id: string
                    user_id?: string | null
                }
                Update: {
                    created_at?: string
                    employee_id?: string | null
                    id?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "sales_employee_id_fkey"
                        columns: ["employee_id"]
                        isOneToOne: false
                        referencedRelation: "employees"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "sales_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            SeatGroup: {
                Row: {
                    disponible: boolean
                    id: string
                    room_id: string
                    x: number
                    y: number
                }
                Insert: {
                    disponible?: boolean
                    id: string
                    room_id: string
                    x: number
                    y: number
                }
                Update: {
                    disponible?: boolean
                    id?: string
                    room_id?: string
                    x?: number
                    y?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "SeatGroup_room_id_fkey"
                        columns: ["room_id"]
                        isOneToOne: false
                        referencedRelation: "room"
                        referencedColumns: ["id"]
                    },
                ]
            }
            seats: {
                Row: {
                    disponible: boolean
                    id: string
                    name: string
                    seatGroupId: string | null
                }
                Insert: {
                    disponible?: boolean
                    id: string
                    name: string
                    seatGroupId?: string | null
                }
                Update: {
                    disponible?: boolean
                    id?: string
                    name?: string
                    seatGroupId?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "seats_seatGroupId_fkey"
                        columns: ["seatGroupId"]
                        isOneToOne: false
                        referencedRelation: "SeatGroup"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users: {
                Row: {
                    id: string
                    username: string
                }
                Insert: {
                    id: string
                    username: string
                }
                Update: {
                    id?: string
                    username?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            Classification: "G" | "PG" | "PG13" | "R" | "NC17"
            Role: "MASTER" | "ADMIN" | "PROMOTER" | "SELLER"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
