import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { OfferService } from "../../../services/offer.service";
import { Offer } from "../../../models/offer";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
@Component({
  selector: "app-create-offer",
  templateUrl: "./all-offer.component.html",
  styleUrls: ["./all-offer.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, TableModule, MatButtonModule, RouterLink]
})
export class AllOfferComponent implements OnInit, OnDestroy {
  offer: Offer[] = [];
  private offerSubscription!: Subscription;

  constructor(private offersService: OfferService) { }

  ngOnInit(): void {
    this.offersService.getOffer();
    this.offerSubscription = this.offersService
      .getofferStream()
      .subscribe((offer: Offer[]) => {
        this.offer = offer;
      });
  }

  ngOnDestroy() {
    this.offerSubscription.unsubscribe();
  }
  deleteData(id: string): void {
    if (confirm("Do you want to save the changes?") == true) {
      this.offersService.delete(id).subscribe(res => {
        this.offersService.getOffer();
      })
    }
  }

}
