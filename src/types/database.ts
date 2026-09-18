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
          email: string
          full_name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          preview_image_url: string | null
          is_active: boolean
          config: Json
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          preview_image_url?: string | null
          is_active?: boolean
          config?: Json
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          preview_image_url?: string | null
          is_active?: boolean
          config?: Json
          created_at?: string
        }
      }
      plans: {
        Row: {
          id: string
          code: string
          name: string
          price: number
          features: Json
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          price: number
          features?: Json
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          price?: number
          features?: Json
          is_active?: boolean
          created_at?: string
        }
      }
      invitations: {
        Row: {
          id: string
          slug: string
          template_id: string | null
          customer_access_token: string
          title: string
          event_type: string
          bride_name: string | null
          bride_full_name: string | null
          bride_parent_names: string | null
          bride_social: string | null
          groom_name: string | null
          groom_full_name: string | null
          groom_parent_names: string | null
          groom_social: string | null
          event_date: string | null
          timezone: string
          akad_date: string | null
          akad_start_time: string | null
          akad_end_time: string | null
          reception_date: string | null
          reception_start_time: string | null
          reception_end_time: string | null
          venue_name: string | null
          venue_address: string | null
          latitude: number | null
          longitude: number | null
          maps_url: string | null
          opening_text: string | null
          cover_image_url: string | null
          music_url: string | null
          status: 'draft' | 'pending_payment' | 'paid' | 'published' | 'unpublished' | 'cancelled' | 'expired'
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          template_id?: string | null
          customer_access_token: string
          title: string
          event_type?: string
          bride_name?: string | null
          bride_full_name?: string | null
          bride_parent_names?: string | null
          bride_social?: string | null
          groom_name?: string | null
          groom_full_name?: string | null
          groom_parent_names?: string | null
          groom_social?: string | null
          event_date?: string | null
          timezone?: string
          akad_date?: string | null
          akad_start_time?: string | null
          akad_end_time?: string | null
          reception_date?: string | null
          reception_start_time?: string | null
          reception_end_time?: string | null
          venue_name?: string | null
          venue_address?: string | null
          latitude?: number | null
          longitude?: number | null
          maps_url?: string | null
          opening_text?: string | null
          cover_image_url?: string | null
          music_url?: string | null
          status?: 'draft' | 'pending_payment' | 'paid' | 'published' | 'unpublished' | 'cancelled' | 'expired'
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          template_id?: string | null
          customer_access_token?: string
          title?: string
          event_type?: string
          bride_name?: string | null
          bride_full_name?: string | null
          bride_parent_names?: string | null
          bride_social?: string | null
          groom_name?: string | null
          groom_full_name?: string | null
          groom_parent_names?: string | null
          groom_social?: string | null
          event_date?: string | null
          timezone?: string
          akad_date?: string | null
          akad_start_time?: string | null
          akad_end_time?: string | null
          reception_date?: string | null
          reception_start_time?: string | null
          reception_end_time?: string | null
          venue_name?: string | null
          venue_address?: string | null
          latitude?: number | null
          longitude?: number | null
          maps_url?: string | null
          opening_text?: string | null
          cover_image_url?: string | null
          music_url?: string | null
          status?: 'draft' | 'pending_payment' | 'paid' | 'published' | 'unpublished' | 'cancelled' | 'expired'
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      invitation_media: {
        Row: {
          id: string
          invitation_id: string
          media_url: string
          media_type: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          media_url: string
          media_type?: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          media_url?: string
          media_type?: string
          sort_order?: number
          created_at?: string
        }
      }
      invitation_stories: {
        Row: {
          id: string
          invitation_id: string
          year: string | null
          title: string
          story: string
          image_url: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          year?: string | null
          title: string
          story: string
          image_url?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          year?: string | null
          title?: string
          story?: string
          image_url?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      invitation_gifts: {
        Row: {
          id: string
          invitation_id: string
          gift_type: string
          provider_name: string
          account_number: string
          account_name: string
          created_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          gift_type: string
          provider_name: string
          account_number: string
          account_name: string
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          gift_type?: string
          provider_name?: string
          account_number?: string
          account_name?: string
          created_at?: string
        }
      }
      guests: {
        Row: {
          id: string
          invitation_id: string
          name: string
          phone: string | null
          category: string
          token: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          name: string
          phone?: string | null
          category?: string
          token: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          name?: string
          phone?: string | null
          category?: string
          token?: string
          created_at?: string
          updated_at?: string
        }
      }
      rsvps: {
        Row: {
          id: string
          invitation_id: string
          guest_id: string | null
          name: string
          attendance: 'hadir' | 'tidak_hadir' | 'masih_ragu'
          guest_count: number
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          guest_id?: string | null
          name: string
          attendance: 'hadir' | 'tidak_hadir' | 'masih_ragu'
          guest_count?: number
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          guest_id?: string | null
          name?: string
          attendance?: 'hadir' | 'tidak_hadir' | 'masih_ragu'
          guest_count?: number
          message?: string | null
          created_at?: string
        }
      }
      wishes: {
        Row: {
          id: string
          invitation_id: string
          name: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          invitation_id: string
          name: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          invitation_id?: string
          name?: string
          message?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          invitation_id: string
          plan_id: string
          customer_name: string
          customer_email: string
          customer_phone: string
          amount: number
          currency: string
          status: 'draft' | 'pending_payment' | 'paid' | 'cancelled' | 'expired' | 'refunded'
          payment_provider: string
          provider_transaction_id: string | null
          created_at: string
          updated_at: string
          paid_at: string | null
        }
        Insert: {
          id?: string
          order_number: string
          invitation_id: string
          plan_id: string
          customer_name: string
          customer_email: string
          customer_phone: string
          amount: number
          currency?: string
          status?: 'draft' | 'pending_payment' | 'paid' | 'cancelled' | 'expired' | 'refunded'
          payment_provider?: string
          provider_transaction_id?: string | null
          created_at?: string
          updated_at?: string
          paid_at?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          invitation_id?: string
          plan_id?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          amount?: number
          currency?: string
          status?: 'draft' | 'pending_payment' | 'paid' | 'cancelled' | 'expired' | 'refunded'
          payment_provider?: string
          provider_transaction_id?: string | null
          created_at?: string
          updated_at?: string
          paid_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          provider_transaction_id: string
          payment_type: string | null
          gross_amount: number
          payment_status: string
          raw_response: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          provider_transaction_id: string
          payment_type?: string | null
          gross_amount: number
          payment_status: string
          raw_response?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          provider_transaction_id?: string
          payment_type?: string | null
          gross_amount?: number
          payment_status?: string
          raw_response?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
