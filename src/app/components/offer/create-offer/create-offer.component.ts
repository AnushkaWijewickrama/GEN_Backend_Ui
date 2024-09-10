import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { OfferService } from "../../../services/offer.service";
import { Offer } from "../../../models/offer";


@Component({
  selector: "app-create-offer",
  templateUrl: "./create-offer.component.html",
  styleUrls: ["./create-offer.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, MatButtonModule]
})
export class CreateOfferComponent implements OnInit {
  form!: FormGroup;
  offer!: Offer;
  imageData!: any;

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      image: new FormControl(null),
      discount: new FormControl(null, Validators.required),

    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.offerService.addoffer(this.form.value.title, this.form.value.image, this.form.value.discount);
    this.form.reset();
    this.imageData = null;

  }
}
