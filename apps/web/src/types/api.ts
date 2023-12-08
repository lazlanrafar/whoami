export type IApiPagination = {
  total_records: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
};
