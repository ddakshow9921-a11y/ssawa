export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type PublicTable<Row, Insert = Row, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type UserRole = "buyer" | "supplier" | "admin";

export type Database = {
  public: {
    Tables: {
      profiles: PublicTable<
        {
          id: string;
          name: string;
          email: string;
          role: UserRole;
          business_name: string | null;
          business_number: string | null;
          phone: string | null;
          region: string | null;
          is_test_user: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id: string;
          name?: string;
          email: string;
          role?: UserRole;
          business_name?: string | null;
          business_number?: string | null;
          phone?: string | null;
          region?: string | null;
          is_test_user?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      categories: PublicTable<
        {
          id: string;
          name: string;
          parent_id: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          name: string;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      supplier_profiles: PublicTable<
        {
          id: string;
          user_id: string;
          business_name: string;
          business_number: string;
          representative_name: string;
          phone: string;
          email: string | null;
          service_regions: string[];
          categories: string[];
          approval_status: "pending" | "approved" | "needs_revision" | "rejected" | "suspended";
          operational_status: "normal" | "warning" | "restricted" | "suspended" | "banned";
          tax_invoice_available: boolean;
          card_payment_available: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          user_id: string;
          business_name: string;
          business_number: string;
          representative_name: string;
          phone: string;
          email?: string | null;
          service_regions?: string[];
          categories?: string[];
          approval_status?: "pending" | "approved" | "needs_revision" | "rejected" | "suspended";
          operational_status?: "normal" | "warning" | "restricted" | "suspended" | "banned";
          tax_invoice_available?: boolean;
          card_payment_available?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      quote_requests: PublicTable<
        {
          id: string;
          buyer_id: string;
          title: string;
          category_id: string | null;
          category_name: string;
          delivery_region: string;
          delivery_address: string | null;
          desired_delivery_date: string | null;
          need_tax_invoice: boolean;
          card_payment_required: boolean;
          description: string | null;
          status: "open" | "quoted" | "selected" | "in_progress" | "completed" | "closed" | "cancelled";
          selected_quote_id: string | null;
          input_method: "manual" | "photo" | "invoice" | "text" | "template" | "repeat";
          urgent: boolean;
          budget_min: number | null;
          budget_max: number | null;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          buyer_id: string;
          title: string;
          category_id?: string | null;
          category_name: string;
          delivery_region: string;
          delivery_address?: string | null;
          desired_delivery_date?: string | null;
          need_tax_invoice?: boolean;
          card_payment_required?: boolean;
          description?: string | null;
          status?: "open" | "quoted" | "selected" | "in_progress" | "completed" | "closed" | "cancelled";
          selected_quote_id?: string | null;
          input_method?: "manual" | "photo" | "invoice" | "text" | "template" | "repeat";
          urgent?: boolean;
          budget_min?: number | null;
          budget_max?: number | null;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      quote_request_items: PublicTable<
        {
          id: string;
          quote_request_id: string;
          item_name: string;
          spec: string | null;
          quantity: number;
          unit: string;
          memo: string | null;
          is_required: boolean;
          allow_alternative: boolean;
          confidence_score: number | null;
          needs_review: boolean;
          created_at: string;
        },
        {
          id?: string;
          quote_request_id: string;
          item_name: string;
          spec?: string | null;
          quantity: number;
          unit?: string;
          memo?: string | null;
          is_required?: boolean;
          allow_alternative?: boolean;
          confidence_score?: number | null;
          needs_review?: boolean;
          created_at?: string;
        }
      >;
      quotes: PublicTable<{
        id: string;
        quote_request_id: string;
        supplier_id: string;
        total_amount: number;
        delivery_fee: number;
        final_amount: number;
        status: "submitted" | "selected" | "rejected" | "expired" | "cancelled";
        valid_until: string | null;
        created_at: string;
        updated_at: string;
      }>;
      deals: PublicTable<{
        id: string;
        quote_request_id: string;
        selected_quote_id: string;
        buyer_id: string;
        supplier_id: string;
        title: string;
        final_amount: number;
        status: string;
        created_at: string;
        updated_at: string;
      }>;
      notifications: PublicTable<
        {
          id: string;
          user_id: string;
          user_role: UserRole;
          type: string;
          title: string;
          body: string;
          link_url: string | null;
          related_entity_type: string | null;
          related_entity_id: string | null;
          priority: "low" | "normal" | "high" | "urgent";
          is_read: boolean;
          is_archived: boolean;
          created_at: string;
          read_at: string | null;
        },
        {
          id?: string;
          user_id: string;
          user_role: UserRole;
          type: string;
          title: string;
          body: string;
          link_url?: string | null;
          related_entity_type?: string | null;
          related_entity_id?: string | null;
          priority?: "low" | "normal" | "high" | "urgent";
          is_read?: boolean;
          is_archived?: boolean;
          created_at?: string;
          read_at?: string | null;
        }
      >;
      message_threads: PublicTable<{
        id: string;
        thread_type: "quote_request" | "deal" | "supplier" | "support";
        related_entity_id: string | null;
        buyer_id: string | null;
        supplier_id: string | null;
        admin_id: string | null;
        title: string;
        status: "open" | "closed" | "reported";
        last_message_at: string;
        created_at: string;
        updated_at: string;
      }>;
      messages: PublicTable<{
        id: string;
        thread_id: string;
        sender_id: string;
        sender_role: UserRole | "system";
        body: string;
        attachment_url: string | null;
        attachment_name: string | null;
        is_read: boolean;
        read_at: string | null;
        created_at: string;
      }>;
      feedbacks: PublicTable<
        {
          id: string;
          user_id: string;
          user_role: UserRole;
          feedback_type: "bug" | "usability" | "feature_request" | "supplier_issue" | "quote_issue" | "deal_issue" | "etc";
          title: string;
          description: string;
          page_url: string | null;
          screenshot_url: string | null;
          status: "submitted" | "reviewing" | "planned" | "in_progress" | "resolved" | "dismissed";
          admin_memo: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          user_id: string;
          user_role: UserRole;
          feedback_type: "bug" | "usability" | "feature_request" | "supplier_issue" | "quote_issue" | "deal_issue" | "etc";
          title: string;
          description: string;
          page_url?: string | null;
          screenshot_url?: string | null;
          status?: "submitted" | "reviewing" | "planned" | "in_progress" | "resolved" | "dismissed";
          admin_memo?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      >;
      invite_codes: PublicTable<
        {
          id: string;
          code: string;
          role_hint: "buyer" | "supplier" | "any";
          max_uses: number;
          used_count: number;
          expires_at: string | null;
          is_active: boolean;
          memo: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          code: string;
          role_hint?: "buyer" | "supplier" | "any";
          max_uses?: number;
          used_count?: number;
          expires_at?: string | null;
          is_active?: boolean;
          memo?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: {
      current_profile_role: { Args: Record<string, never>; Returns: UserRole | null };
      is_admin: { Args: Record<string, never>; Returns: boolean };
      is_approved_supplier: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
