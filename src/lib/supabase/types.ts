export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      gallery_images: {
        Row: {
          id: string;
          url: string;
          storage_path: string;
          alt: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          storage_path: string;
          alt?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          storage_path?: string;
          alt?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          duration_min: number;
          active: boolean;
          sort_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          duration_min?: number;
          active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          duration_min?: number;
          active?: boolean;
          sort_order?: number;
        };
        Relationships: [];
      };
      content: {
        Row: {
          id: string;
          section: string;
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section: string;
          key: string;
          value: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section?: string;
          key?: string;
          value?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type GalleryImage =
  Database["public"]["Tables"]["gallery_images"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type Content = Database["public"]["Tables"]["content"]["Row"];
