export interface PaginatedResponse<T> {
  data: T[];
  qty: number;
}

export interface PaginatedRequest<T> {
  limit: number;
  offset: number;
  filters?: T;
}
