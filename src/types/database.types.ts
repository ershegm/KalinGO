
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      routes: {
        Row: {
          id: string
          title: string
          description: string
          category: 'historical' | 'cultural' | 'nature' | 'gastronomy' | 'architectural' | 'entertainment'
          difficulty: 'easy' | 'medium' | 'hard'
          duration: number
          distance: number | null
          image_url: string | null
          start_point: string
          end_point: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: 'historical' | 'cultural' | 'nature' | 'gastronomy' | 'architectural' | 'entertainment'
          difficulty: 'easy' | 'medium' | 'hard'
          duration: number
          distance?: number | null
          image_url?: string | null
          start_point: string
          end_point: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'historical' | 'cultural' | 'nature' | 'gastronomy' | 'architectural' | 'entertainment'
          difficulty?: 'easy' | 'medium' | 'hard'
          duration?: number
          distance?: number | null
          image_url?: string | null
          start_point?: string
          end_point?: string
          created_at?: string
          updated_at?: string
        }
      }
      route_points: {
        Row: {
          id: string
          route_id: string
          title: string
          description: string
          image_url: string | null
          latitude: number
          longitude: number
          order_number: number
          created_at: string
        }
        Insert: {
          id?: string
          route_id: string
          title: string
          description: string
          image_url?: string | null
          latitude: number
          longitude: number
          order_number: number
          created_at?: string
        }
        Update: {
          id?: string
          route_id?: string
          title?: string
          description?: string
          image_url?: string | null
          latitude?: number
          longitude?: number
          order_number?: number
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          route_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          route_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          route_id?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          route_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          route_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          route_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      route_category: 'historical' | 'cultural' | 'nature' | 'gastronomy' | 'architectural' | 'entertainment'
      route_difficulty: 'easy' | 'medium' | 'hard'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
