import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/HTTP";
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class RepositoryService {
  constructor(private http: HttpClient) {}

  get(url: string, params?: any) {
    var requestUrl = this.generateUrl(`${environment.serverUrl + url}`, params);
    return this.http.get(requestUrl);
  }

  delete(url: string, params?: any) {
    var requestUrl = this.generateUrl(`${environment.serverUrl + url}`, params);
    return this.http.delete(requestUrl);
  }

  post(url: string, entity?: any, params?: any) {
    var requestUrl = this.generateUrl(`${environment.serverUrl + url}`, params);
    return this.http.post(requestUrl, entity, httpOptions);
  }

  upload(url: string, entity?: any, params?: any) {
    var requestUrl = this.generateUrl(`${environment.serverUrl + url}`, params);
    return this.http.post(requestUrl, entity);
  }

  put(url: string, entity?: any, params?: any) {
    var requestUrl = this.generateUrl(`${environment.serverUrl + url}`, params);
    return this.http.put(requestUrl, entity, httpOptions);
  }

  private generateUrl(url: string, params: any) {
    var requestUrl: string;
    requestUrl = `${url}?`;
    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        const value = params[param];
        requestUrl += `${param}=${value}&`;
      }
    }
    requestUrl = requestUrl.slice(0, -1);
    return requestUrl;
  }
}
