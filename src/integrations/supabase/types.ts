export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent_lead_assignments: {
        Row: {
          agent_id: string
          assigned_at: string
          assigned_by: string | null
          id: string
          lead_id: string
          notes: string | null
          status: string
        }
        Insert: {
          agent_id: string
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          lead_id: string
          notes?: string | null
          status?: string
        }
        Update: {
          agent_id?: string
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          lead_id?: string
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_assignments_agent_id"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assignments_lead_id"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_workspaces: {
        Row: {
          agent_id: string
          assigned_at: string
          assigned_by: string
          created_at: string
          id: string
          workspace_id: string
        }
        Insert: {
          agent_id: string
          assigned_at?: string
          assigned_by: string
          created_at?: string
          id?: string
          workspace_id: string
        }
        Update: {
          agent_id?: string
          assigned_at?: string
          assigned_by?: string
          created_at?: string
          id?: string
          workspace_id?: string
        }
        Relationships: []
      }
      agents: {
        Row: {
          agent_code: string
          assigned_by: string | null
          assigned_leads_count: number
          created_at: string
          first_login_password_changed: boolean | null
          id: string
          performance_score: number | null
          permissions: Json
          status: string
          total_leads_handled: number
          updated_at: string
          user_id: string
          workspace_id: string | null
        }
        Insert: {
          agent_code: string
          assigned_by?: string | null
          assigned_leads_count?: number
          created_at?: string
          first_login_password_changed?: boolean | null
          id?: string
          performance_score?: number | null
          permissions?: Json
          status?: string
          total_leads_handled?: number
          updated_at?: string
          user_id: string
          workspace_id?: string | null
        }
        Update: {
          agent_code?: string
          assigned_by?: string | null
          assigned_leads_count?: number
          created_at?: string
          first_login_password_changed?: boolean | null
          id?: string
          performance_score?: number | null
          permissions?: Json
          status?: string
          total_leads_handled?: number
          updated_at?: string
          user_id?: string
          workspace_id?: string | null
        }
        Relationships: []
      }
      auto_assignment_rules: {
        Row: {
          agent_filters: Json
          assignment_method: string
          created_at: string
          created_by: string | null
          criteria: Json
          description: string | null
          enabled: boolean
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          agent_filters?: Json
          assignment_method: string
          created_at?: string
          created_by?: string | null
          criteria?: Json
          description?: string | null
          enabled?: boolean
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          agent_filters?: Json
          assignment_method?: string
          created_at?: string
          created_by?: string | null
          criteria?: Json
          description?: string | null
          enabled?: boolean
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      business_discovery_submissions: {
        Row: {
          advertising_platforms: string[]
          avg_revenue_per_customer: string
          company_name: string
          conversion_rate: string | null
          created_at: string
          current_challenges: string
          current_reach_methods: string[]
          desired_results: string
          full_name: string
          has_crm: boolean
          has_seasonal_peaks: string | null
          has_website: boolean
          id: string
          ideal_customer: string
          industry: string
          is_gst_registered: boolean
          issues_invoices: boolean
          lead_score: number | null
          lead_tier: string | null
          location: string
          main_product_service: string
          monthly_ad_spend: string
          posting_frequency: string
          primary_goals: string[]
          social_platforms: string[]
          status: string
          top_priorities: string
          website_url: string | null
        }
        Insert: {
          advertising_platforms?: string[]
          avg_revenue_per_customer: string
          company_name: string
          conversion_rate?: string | null
          created_at?: string
          current_challenges: string
          current_reach_methods?: string[]
          desired_results: string
          full_name: string
          has_crm: boolean
          has_seasonal_peaks?: string | null
          has_website: boolean
          id?: string
          ideal_customer: string
          industry: string
          is_gst_registered: boolean
          issues_invoices: boolean
          lead_score?: number | null
          lead_tier?: string | null
          location: string
          main_product_service: string
          monthly_ad_spend: string
          posting_frequency: string
          primary_goals?: string[]
          social_platforms?: string[]
          status?: string
          top_priorities: string
          website_url?: string | null
        }
        Update: {
          advertising_platforms?: string[]
          avg_revenue_per_customer?: string
          company_name?: string
          conversion_rate?: string | null
          created_at?: string
          current_challenges?: string
          current_reach_methods?: string[]
          desired_results?: string
          full_name?: string
          has_crm?: boolean
          has_seasonal_peaks?: string | null
          has_website?: boolean
          id?: string
          ideal_customer?: string
          industry?: string
          is_gst_registered?: boolean
          issues_invoices?: boolean
          lead_score?: number | null
          lead_tier?: string | null
          location?: string
          main_product_service?: string
          monthly_ad_spend?: string
          posting_frequency?: string
          primary_goals?: string[]
          social_platforms?: string[]
          status?: string
          top_priorities?: string
          website_url?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          ai_next_action: string | null
          ai_score: number | null
          assigned_agent_id: string | null
          category: string | null
          created_at: string
          email: string | null
          id: string
          last_message: string | null
          list: string | null
          name: string
          notes: string | null
          phone: string
          reminder_date: string | null
          reminder_note: string | null
          source: string
          status: string
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_next_action?: string | null
          ai_score?: number | null
          assigned_agent_id?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_message?: string | null
          list?: string | null
          name: string
          notes?: string | null
          phone: string
          reminder_date?: string | null
          reminder_note?: string | null
          source?: string
          status?: string
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_next_action?: string | null
          ai_score?: number | null
          assigned_agent_id?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_message?: string | null
          list?: string | null
          name?: string
          notes?: string | null
          phone?: string
          reminder_date?: string | null
          reminder_note?: string | null
          source?: string
          status?: string
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_leads_assigned_agent"
            columns: ["assigned_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workspaces: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "agent" | "user"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "agent", "user"],
    },
  },
} as const
