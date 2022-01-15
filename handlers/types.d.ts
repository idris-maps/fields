type Res = Promise<{ status: number; body?: any }>;

export interface FieldsHandlers {
  getAll: (query?: { [key: string]: string }) => Res;
  get: (id: string) => Res;
  put: (id: string, data: any) => Res;
  patch: (id: string, data: any) => Res;
  post: (data: any) => Res;
  delete: (id: string) => Res;
}
