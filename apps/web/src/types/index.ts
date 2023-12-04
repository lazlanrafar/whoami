export type ISkill = {
  id?: string;
  title: string;
  year: number;
  level?: number;
  created_by: string | null;
  created_at?: Date;
  updated_at?: Date;
};
