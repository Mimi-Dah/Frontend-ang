import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL ,url} from './base/base_url';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {



  constructor(private http: HttpClient) { }
// get Marchet 
  getMarchet(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.get<any>(`${url}marche/` ,{ headers });
  }
  //getppm
  getppm(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.get<any>(`${url}ppm/` ,{ headers });
  }
  //getsoumission
  getsoumission(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.get<any>(`${url}soumission/` ,{ headers });
  }

  getAgentById(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.get<any>(`${API_BASE_URL}agent/${id}/` ,{ headers });
  }

  getDirectionById(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.get<any>(`${API_BASE_URL}direction/${id}/` ,{ headers });
  }

  getDocumentById(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.get<any>(`${API_BASE_URL}document/${id}/` ,{ headers });
  }

  getGerantById(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.get<any>(`${API_BASE_URL}gerant/${id}/` ,{ headers });
  }

  getDocuments(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access_token_agent'));

    return this.http.get<any[]>(`${API_BASE_URL}get_documents_by_agent_direction/`, { headers });
  }

 

  getArchives(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.get<any[]>(`${API_BASE_URL}archives/`, { headers });
  }
  getAvis(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.get<any[]>(`${API_BASE_URL}avis-by-admin/${localStorage.getItem('id')}/`, { headers });
  }
 
  getDirection(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));

    return this.http.get<any[]>(`${API_BASE_URL}get_all_direction/`, { headers });
  }

  getRoles(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));

    return this.http.get<any[]>(`${API_BASE_URL}roles/`, { headers });
  }

  getAllDocuments(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));

    return this.http.get<any[]>(`${API_BASE_URL}chart-by-admin/${localStorage.getItem('id')}/`, { headers });
  }

  // getAllNotes(): Observable<any[]> {
  //   // Vous devez ajouter le jeton d'authentification ici si nécessaire
  //   const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));

  //   return this.http.get<any[]>(`${API_BASE_URL}note-by-admin/${localStorage.getItem('id')}/`, { headers });
  // }
  getAllNotes(page: number, pageSize: number): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', 'JWT ' + localStorage.getItem('access'));
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    
    return this.http.get<any[]>(`${API_BASE_URL}note-by-admin/${localStorage.getItem('id')}/`, { headers, params });
}

getAllplotique(page: number, pageSize: number): Observable<any[]> {
  const headers = new HttpHeaders().set('Authorization', 'JWT ' + localStorage.getItem('access'));
  const params = new HttpParams()
  .set('page', page.toString())
  .set('pageSize', pageSize.toString());

  return this.http.get<any[]>(`${API_BASE_URL}plotique-by-admin/${localStorage.getItem('id')}/`, { headers, params });
}

getAllDecision(page: number, pageSize: number): Observable<any[]> {
  const headers = new HttpHeaders().set('Authorization', 'JWT ' + localStorage.getItem('access'));
  const params = new HttpParams()
  .set('page', page.toString())
  .set('pageSize', pageSize.toString());

  return this.http.get<any[]>(`${API_BASE_URL}decision-by-admin/${localStorage.getItem('id')}/`, { headers, params });
}

  getAllProcedure(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    
    return this.http.get<any[]>(`${API_BASE_URL}procedure-by-admin/${localStorage.getItem('id')}/`, { headers });
  }
  
  getAllAget(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));

    return this.http.get<any[]>(`${API_BASE_URL}get-agents/`, { headers });
  }

  getAllgerant(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));

    return this.http.get<any[]>(`${API_BASE_URL}get-gerant/`, { headers });
  }

  createDocument(formData: FormData): Observable<any> {
    // You can add an authorization token to the headers if required
    // Replace 'your-auth-token' with your actual authorization token
    const headers = new HttpHeaders({
      Authorization: 'JWT '+localStorage.getItem('access')
    });

    // Make a POST request to create the document
    return this.http.post(`${API_BASE_URL}create-chart/`, formData, {
      headers: headers
    });
  }
  //create decision 
  createDecision(formData: FormData): Observable<any> {
    // You can add an authorization token to the headers if required
    // Replace 'your-auth-token' with your actual authorization token
    const headers = new HttpHeaders({
      Authorization: 'JWT '+localStorage.getItem('access')
    });

    // Make a POST request to create the document
    return this.http.post(`${API_BASE_URL}create-decision/`, formData, {
      headers: headers
    });
  }
  demanderMarche(formData: FormData): Observable<any> {
    // You can add an authorization token to the headers if required
    // Replace 'your-auth-token' with your actual authorization token
    const headers = new HttpHeaders({
      Authorization: 'JWT '+localStorage.getItem('access')
    });

    // Make a POST request to create the document
    return this.http.post(`${url}marche/`, formData, {
      headers: headers
    });
  }
  
  //create note
  createNote(formData: FormData): Observable<any> {
    // You can add an authorization token to the headers if required
    // Replace 'your-auth-token' with your actual authorization token
    const headers = new HttpHeaders({
      Authorization: 'JWT '+localStorage.getItem('access')
    });

    // Make a POST request to create the document
    return this.http.post(`${API_BASE_URL}create-note/`, formData, {
      headers: headers
    });
  }
    //create politique
    createPolitique(formData: FormData): Observable<any> {
      // You can add an authorization token to the headers if required
      // Replace 'your-auth-token' with your actual authorization token
      const headers = new HttpHeaders({
        Authorization: 'JWT '+localStorage.getItem('access')
      });
  
      // Make a POST request to create the document
      return this.http.post(`${API_BASE_URL}create-plotique/`, formData, {
        headers: headers
      });
    }
  /////create avis 
  createAvis(formData: FormData): Observable<any> {
    // You can add an authorization token to the headers if required
    // Replace 'your-auth-token' with your actual authorization token
    const headers = new HttpHeaders({
      Authorization: 'JWT '+localStorage.getItem('access')
    });

    // Make a POST request to create the document
    return this.http.post(`${API_BASE_URL}create-avis/`, formData, {
      headers: headers
    });
  }
  /////create procedur 
  createProcedur(formData: FormData): Observable<any> {
    // You can add an authorization token to the headers if required
    // Replace 'your-auth-token' with your actual authorization token
    const headers = new HttpHeaders({
      Authorization: 'JWT '+localStorage.getItem('access')
    });

    // Make a POST request to create the document
    return this.http.post(`${API_BASE_URL}create-procedure/`, formData, {
      headers: headers
    });
  }

  createDirection(formData: FormData): Observable<any> {
    // You can add an authorization token to the headers if required
    // Replace 'your-auth-token' with your actual authorization token
    const headers = new HttpHeaders({
      Authorization: 'JWT '+localStorage.getItem('access')
    });
    // Make a POST request to create the document
    return this.http.post(`${API_BASE_URL}create_direction/`, formData, {
      headers: headers
    });
  }

  createArchive(formData: FormData): Observable<any> {
    // You can add an authorization token to the headers if required
    // Replace 'your-auth-token' with your actual authorization token
    const headers = new HttpHeaders({
      Authorization: 'JWT '+localStorage.getItem('access_token')
    });
    // Make a POST request to create the document
    return this.http.post(`${API_BASE_URL}archives/`, formData, {
      headers: headers
    });
  }


  
}
