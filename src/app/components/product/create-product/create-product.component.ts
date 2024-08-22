import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../../models/product";
import { ProductService } from "../../../services/product.service";
import { subCategoty } from "../../../models/subCategoty";


@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, MatButtonModule]
})
export class CreateProductComponent implements OnInit {
  form!: FormGroup;
  product!: Product;
  imageData!: any;
  latest: any = ["YES", "NO"];
  modelList: any = [];
  bannerSubscription: any;
  isedit: boolean = false;

  constructor(private poductService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      latest: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      id: new FormControl(null)
    });
    // this.getModelList();
    this.activatedRoute.params.subscribe(data => {
      this.isedit = data['id'] ? true : false
      if (this.isedit) {
        this.poductService.getSingleData(data['id']).subscribe((res: HttpResponse<any>) => {
          let x = res.body
          this.form.get('title')?.patchValue(x.title)
          this.form.get('description')?.patchValue(x.description)
          this.form.get('image')?.patchValue(x.imagePath)
          this.form.get('id')?.patchValue(x._id)
          this.form.get('price')?.patchValue(x.price)
          this.form.get('latest')?.patchValue(x.latest)
        });

      }
    })

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
    if (!this.isedit) {
      this.poductService.addProduct(this.form.value.title, this.form.value.image, this.form.value.description, this.form.value.latest, this.form.value.price);
      this.form.reset();
      this.imageData = null;
    }
    else {
      console.log(this.form.value.model)
      this.poductService.updateSingleData(this.form.value.title, this.form.value.image, this.form.value.description, this.form.value.id, this.form.value.latest, this.form.value.price);
      this.form.reset();
      this.imageData = null;
    }

  }
}
