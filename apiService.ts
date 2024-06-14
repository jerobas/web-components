import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiService {
  private apiClient: AxiosInstance;
  private token: string | null;

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.token = null;

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.apiClient.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private initializeResponseInterceptor() {
    this.apiClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              this.handleUnauthorized();
              break;
            case 403:
              // Acesso negado
              break;
            case 404:
              // Recurso não encontrado
              break;
            case 500:
              // Erro no servidor
              break;
            default:
              // Outros erros
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private handleUnauthorized() {
    this.token = null;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public async login(username: string, password: string): Promise<void> {
    const response = await this.apiClient.post("/auth/login", {
      username,
      password,
    });
    this.token = response.data.token;
  }

  public async validateToken(): Promise<boolean> {
    try {
      await this.apiClient.get("/auth/validate");
      return true;
    } catch (error) {
      this.token = null;
      return false;
    }
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.post<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.put<T>(url, data, config);
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.apiClient.delete<T>(url, config);
  }
}

export default new ApiService();
