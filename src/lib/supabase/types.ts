export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      certification_partners: {
        Row: {
          created_at: string
          display_order: number
          id: string
          logo_url: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          logo_url: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          logo_url?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      culture_values: {
        Row: {
          created_at: string
          description_en: string
          description_es: string
          details_en: string[]
          details_es: string[]
          display_order: number
          id: string
          title_en: string
          title_es: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en: string
          description_es: string
          details_en?: string[]
          details_es?: string[]
          display_order?: number
          id?: string
          title_en: string
          title_es: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_es?: string
          details_en?: string[]
          details_es?: string[]
          display_order?: number
          id?: string
          title_en?: string
          title_es?: string
          updated_at?: string
        }
        Relationships: []
      }
      education_partners: {
        Row: {
          created_at: string
          display_order: number
          id: string
          logo_url: string
          name: string
          partner_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          logo_url: string
          name: string
          partner_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          logo_url?: string
          name?: string
          partner_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      hackathons: {
        Row: {
          created_at: string
          display_order: number
          end_date: string | null
          id: string
          logo_url: string
          name: string
          start_date: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number
          end_date?: string | null
          id?: string
          logo_url: string
          name: string
          start_date?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number
          end_date?: string | null
          id?: string
          logo_url?: string
          name?: string
          start_date?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      hackers: {
        Row: {
          created_at: string
          discord: string | null
          display_order: number
          github: string
          id: string
          image_url: string
          linkedin: string
          name: string
          profile_en: string
          profile_es: string
          telegram: string | null
          university: string | null
          updated_at: string
          website: string | null
          x: string
        }
        Insert: {
          created_at?: string
          discord?: string | null
          display_order?: number
          github?: string
          id?: string
          image_url: string
          linkedin?: string
          name: string
          profile_en: string
          profile_es: string
          telegram?: string | null
          university?: string | null
          updated_at?: string
          website?: string | null
          x?: string
        }
        Update: {
          created_at?: string
          discord?: string | null
          display_order?: number
          github?: string
          id?: string
          image_url?: string
          linkedin?: string
          name?: string
          profile_en?: string
          profile_es?: string
          telegram?: string | null
          university?: string | null
          updated_at?: string
          website?: string | null
          x?: string
        }
        Relationships: []
      }
      product_hackers: {
        Row: {
          hacker_id: string
          product_id: string
        }
        Insert: {
          hacker_id: string
          product_id: string
        }
        Update: {
          hacker_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_hackers_hacker_id_fkey"
            columns: ["hacker_id"]
            isOneToOne: false
            referencedRelation: "hackers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_hackers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          app_url: string | null
          categories: string[]
          created_at: string
          description_en: string
          description_es: string
          display_order: number
          hackathon_id: string | null
          hackathon_link: string | null
          id: string
          image_url: string
          name: string
          repo_backend: string | null
          repo_contracts: string | null
          repo_frontend: string | null
          status: Database["public"]["Enums"]["product_status"]
          technologies: string[]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          app_url?: string | null
          categories?: string[]
          created_at?: string
          description_en: string
          description_es: string
          display_order?: number
          hackathon_id?: string | null
          hackathon_link?: string | null
          id?: string
          image_url: string
          name: string
          repo_backend?: string | null
          repo_contracts?: string | null
          repo_frontend?: string | null
          status?: Database["public"]["Enums"]["product_status"]
          technologies?: string[]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          app_url?: string | null
          categories?: string[]
          created_at?: string
          description_en?: string
          description_es?: string
          display_order?: number
          hackathon_id?: string | null
          hackathon_link?: string | null
          id?: string
          image_url?: string
          name?: string
          repo_backend?: string | null
          repo_contracts?: string | null
          repo_frontend?: string | null
          status?: Database["public"]["Enums"]["product_status"]
          technologies?: string[]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          content_en: Json
          content_es: Json
          created_at: string
          description_en: string
          description_es: string
          display_order: number
          id: string
          slug: string
          title_en: string
          title_es: string
          updated_at: string
        }
        Insert: {
          content_en?: Json
          content_es?: Json
          created_at?: string
          description_en: string
          description_es: string
          display_order?: number
          id?: string
          slug: string
          title_en: string
          title_es: string
          updated_at?: string
        }
        Update: {
          content_en?: Json
          content_es?: Json
          created_at?: string
          description_en?: string
          description_es?: string
          display_order?: number
          id?: string
          slug?: string
          title_en?: string
          title_es?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          key: string
          updated_at: string
          value_en: string
          value_es: string
        }
        Insert: {
          key: string
          updated_at?: string
          value_en: string
          value_es: string
        }
        Update: {
          key?: string
          updated_at?: string
          value_en?: string
          value_es?: string
        }
        Relationships: []
      }
      tech_categories: {
        Row: {
          created_at: string
          display_order: number
          id: string
          logos: string[]
          name_en: string
          name_es: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          logos?: string[]
          name_en: string
          name_es: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          logos?: string[]
          name_en?: string
          name_es?: string
          slug?: string
          updated_at?: string
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
      product_status: "MVP" | "BETA" | "LAUNCHED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      product_status: ["MVP", "BETA", "LAUNCHED"],
    },
  },
} as const

// ============================================
// Convenience row types
// ============================================
export type Hacker = Tables<'hackers'>
export type Hackathon = Tables<'hackathons'>
export type Product = Tables<'products'>
export type ProductHacker = Tables<'product_hackers'>
export type Service = Tables<'services'>
export type EducationPartner = Tables<'education_partners'>
export type CertificationPartner = Tables<'certification_partners'>
export type CultureValue = Tables<'culture_values'>
export type TechCategory = Tables<'tech_categories'>
export type SiteContent = Tables<'site_content'>
export type ProductStatus = Database['public']['Enums']['product_status']

// Product with joined hackathon + hackers
export type ProductWithRelations = Product & {
  hackathon: Hackathon | null
  hackers: Hacker[]
}

// Hackathon with derived status
export type HackathonStatus = 'incoming' | 'ongoing' | 'past'
export type HackathonWithStatus = Hackathon & { hackathonStatus: HackathonStatus }
