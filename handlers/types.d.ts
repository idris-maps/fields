type Res = Promise<{ status: number; body?: any }>;

export interface FieldsTableHandlers {
  delete: (name: string, id: string) => Res;
  get: (name: string, id: string) => Res;
  getAll: (name: string, query?: { [key: string]: string }) => Res;
  patch: (name: string, id: string, data: any) => Res;
  post: (name: string, data: any) => Res;
  put: (name: string, id: string, data: any) => Res;
}

export interface FieldsMetaHandlers {
  delete: (name: string) => Res;
  getFields: (name: string) => Res;
  getAll: () => Res;
  getSchema: (name: string) => Res;
  post: (data: any) => Res;
}
