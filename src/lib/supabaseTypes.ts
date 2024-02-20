export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
    graphql_public: {
        Tables: {
            [_ in never]: never
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            graphql: {
                Args: {
                    operationName?: string
                    query?: string
                    variables?: Json
                    extensions?: Json
                }
                Returns: Json
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
    pgbouncer: {
        Tables: {
            [_ in never]: never
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_auth: {
                Args: {
                    p_usename: string
                }
                Returns: {
                    username: string
                    password: string
                }[]
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
    public: {
        Tables: {
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
                    cinema_id: string
                    created_at: string
                    email: string
                    id: string
                    name: string
                    password: string
                }
                Insert: {
                    cinema_id: string
                    created_at?: string
                    email: string
                    id: string
                    name: string
                    password: string
                }
                Update: {
                    cinema_id?: string
                    created_at?: string
                    email?: string
                    id?: string
                    name?: string
                    password?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'employees_cinema_id_fkey'
                        columns: ['cinema_id']
                        referencedRelation: 'cinemas'
                        referencedColumns: ['id']
                    }
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
                        foreignKeyName: 'functions_movie_format_id_fkey'
                        columns: ['movie_format_id']
                        referencedRelation: 'movie_formats'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'functions_room_id_fkey'
                        columns: ['room_id']
                        referencedRelation: 'room'
                        referencedColumns: ['id']
                    }
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
                        foreignKeyName: 'memberships_user_id_fkey'
                        columns: ['user_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
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
                        foreignKeyName: 'movie_formats_movie_id_fkey'
                        columns: ['movie_id']
                        referencedRelation: 'movies'
                        referencedColumns: ['id']
                    }
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
                        foreignKeyName: 'movie_sales_function_id_fkey'
                        columns: ['function_id']
                        referencedRelation: 'functions'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'movie_sales_sale_id_fkey'
                        columns: ['sale_id']
                        referencedRelation: 'sales'
                        referencedColumns: ['id']
                    }
                ]
            }
            movies: {
                Row: {
                    classification: string
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
                    classification: string
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
                    classification?: string
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
                        foreignKeyName: 'product_sales_product_id_fkey'
                        columns: ['product_id']
                        referencedRelation: 'products'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'product_sales_sale_id_fkey'
                        columns: ['sale_id']
                        referencedRelation: 'sales'
                        referencedColumns: ['id']
                    }
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
                        foreignKeyName: 'products_cinema_id_fkey'
                        columns: ['cinema_id']
                        referencedRelation: 'cinemas'
                        referencedColumns: ['id']
                    }
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
                        foreignKeyName: 'registers_user_id_fkey'
                        columns: ['user_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            room: {
                Row: {
                    adults_price: number
                    cinema_id: string
                    description: string
                    id: string
                    kids_price: number
                    name: string
                }
                Insert: {
                    adults_price: number
                    cinema_id: string
                    description: string
                    id: string
                    kids_price: number
                    name: string
                }
                Update: {
                    adults_price?: number
                    cinema_id?: string
                    description?: string
                    id?: string
                    kids_price?: number
                    name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'room_cinema_id_fkey'
                        columns: ['cinema_id']
                        referencedRelation: 'cinemas'
                        referencedColumns: ['id']
                    }
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
                        foreignKeyName: 'sale_seats_sale_id_fkey'
                        columns: ['sale_id']
                        referencedRelation: 'sales'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'sale_seats_seat_id_fkey'
                        columns: ['seat_id']
                        referencedRelation: 'seats'
                        referencedColumns: ['id']
                    }
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
                        foreignKeyName: 'sales_employee_id_fkey'
                        columns: ['employee_id']
                        referencedRelation: 'employees'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'sales_user_id_fkey'
                        columns: ['user_id']
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            seats: {
                Row: {
                    disponible: boolean
                    id: string
                    room_id: string
                    size: number
                    x: number
                    y: number
                }
                Insert: {
                    disponible?: boolean
                    id: string
                    room_id: string
                    size: number
                    x: number
                    y: number
                }
                Update: {
                    disponible?: boolean
                    id?: string
                    room_id?: string
                    size?: number
                    x?: number
                    y?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'seats_room_id_fkey'
                        columns: ['room_id']
                        referencedRelation: 'room'
                        referencedColumns: ['id']
                    }
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
            get_available_functions_by_movie: {
                Args: {
                    movie: string
                    date: string
                }
                Returns: {
                    id: string
                    start_at: string
                    name: string
                    duration: number
                    room: string
                    adults_price: number
                    kids_price: number
                    format: number
                }[]
            }
            get_movie_listings: {
                Args: Record<PropertyKey, never>
                Returns: {
                    classification: string
                    cover: string
                    created_at: string
                    director: string
                    duration: number
                    id: string
                    image: string
                    name: string
                    sinopsis: string
                }[]
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
    storage: {
        Tables: {
            buckets: {
                Row: {
                    allowed_mime_types: string[] | null
                    avif_autodetection: boolean | null
                    created_at: string | null
                    file_size_limit: number | null
                    id: string
                    name: string
                    owner: string | null
                    owner_id: string | null
                    public: boolean | null
                    updated_at: string | null
                }
                Insert: {
                    allowed_mime_types?: string[] | null
                    avif_autodetection?: boolean | null
                    created_at?: string | null
                    file_size_limit?: number | null
                    id: string
                    name: string
                    owner?: string | null
                    owner_id?: string | null
                    public?: boolean | null
                    updated_at?: string | null
                }
                Update: {
                    allowed_mime_types?: string[] | null
                    avif_autodetection?: boolean | null
                    created_at?: string | null
                    file_size_limit?: number | null
                    id?: string
                    name?: string
                    owner?: string | null
                    owner_id?: string | null
                    public?: boolean | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            migrations: {
                Row: {
                    executed_at: string | null
                    hash: string
                    id: number
                    name: string
                }
                Insert: {
                    executed_at?: string | null
                    hash: string
                    id: number
                    name: string
                }
                Update: {
                    executed_at?: string | null
                    hash?: string
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            objects: {
                Row: {
                    bucket_id: string | null
                    created_at: string | null
                    id: string
                    last_accessed_at: string | null
                    metadata: Json | null
                    name: string | null
                    owner: string | null
                    owner_id: string | null
                    path_tokens: string[] | null
                    updated_at: string | null
                    version: string | null
                }
                Insert: {
                    bucket_id?: string | null
                    created_at?: string | null
                    id?: string
                    last_accessed_at?: string | null
                    metadata?: Json | null
                    name?: string | null
                    owner?: string | null
                    owner_id?: string | null
                    path_tokens?: string[] | null
                    updated_at?: string | null
                    version?: string | null
                }
                Update: {
                    bucket_id?: string | null
                    created_at?: string | null
                    id?: string
                    last_accessed_at?: string | null
                    metadata?: Json | null
                    name?: string | null
                    owner?: string | null
                    owner_id?: string | null
                    path_tokens?: string[] | null
                    updated_at?: string | null
                    version?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'objects_bucketId_fkey'
                        columns: ['bucket_id']
                        referencedRelation: 'buckets'
                        referencedColumns: ['id']
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            can_insert_object: {
                Args: {
                    bucketid: string
                    name: string
                    owner: string
                    metadata: Json
                }
                Returns: undefined
            }
            extension: {
                Args: {
                    name: string
                }
                Returns: string
            }
            filename: {
                Args: {
                    name: string
                }
                Returns: string
            }
            foldername: {
                Args: {
                    name: string
                }
                Returns: unknown
            }
            get_size_by_bucket: {
                Args: Record<PropertyKey, never>
                Returns: {
                    size: number
                    bucket_id: string
                }[]
            }
            search: {
                Args: {
                    prefix: string
                    bucketname: string
                    limits?: number
                    levels?: number
                    offsets?: number
                    search?: string
                    sortcolumn?: string
                    sortorder?: string
                }
                Returns: {
                    name: string
                    id: string
                    updated_at: string
                    created_at: string
                    last_accessed_at: string
                    metadata: Json
                }[]
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
        Row: infer R
    }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
        ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
            ? R
            : never
        : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Insert: infer I
    }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
        ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I
        }
            ? I
            : never
        : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Update: infer U
    }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
        ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U
        }
            ? U
            : never
        : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
        ? Database['public']['Enums'][PublicEnumNameOrOptions]
        : never
