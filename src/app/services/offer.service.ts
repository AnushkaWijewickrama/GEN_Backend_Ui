import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { SERVER_API_URL } from "../util/common-util";
import { createRequestOption } from "../util/request-util";
import { Router } from "@angular/router";
import { Offer } from "../models/offer";

@Injectable({
  providedIn: "root",
})
export class OfferService {
  private offers: any = [];
  private offers$ = new Subject<Offer[]>();
  readonly url = SERVER_API_URL + "/api/offer";
  readonly offerUrl = SERVER_API_URL + "/api/offer";

  constructor(private http: HttpClient, private route: Router) { }

  getOffer() {
    this.http
      .get<{ profiles: any }>(this.url)
      .pipe(
        map((offerData) => {
          return offerData;
        })
      )
      .subscribe((offers) => {
        this.offers = offers;
        this.offers$.next(this.offers);
      });
  }

  getofferStream() {
    return this.offers$.asObservable();
  }

  addoffer(title: string, image: File, discount: string): void {
    const offerData = new FormData();
    offerData.append("title", title);
    offerData.append("image", image);
    offerData.append("discount", discount);
    this.http
      .post<{ profile: Offer }>(this.offerUrl, offerData)
      .subscribe((offerData: any) => {
        const offer: Offer = {
          _id: offerData?._id,
          title: offerData?.title,
          discount: offerData?.discount,
          imagePath: offerData?.imagePath
        };
        this.offers.push(offer);

        this.offers$.next(this.offers);
        this.route.navigate(['/offer'])
      });
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.url}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.url, { params: options, observe: 'response' });
  }

}
