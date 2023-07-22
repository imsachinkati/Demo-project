export class ResponseModel<T> {
  message: string = ''; // Assign a default value
  totalRecords: number = 0; // Assign a default value
}

export declare class ApiResponse<T> {
  type: string;
  code: number;
  message: string;
  token?: string;
  totalRecords?: number;
  data: T | null;
}

export class ObjectResponseModel<T> extends ResponseModel<T> {
  data: T = {} as T;
  constructor() {
    super();
  }
}
