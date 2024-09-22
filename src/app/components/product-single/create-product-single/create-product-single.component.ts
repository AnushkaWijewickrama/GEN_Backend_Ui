import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, FormArray, FormBuilder } from "@angular/forms";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { HttpClientModule, HttpResponse } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../../models/product";
import { ProductSingleService } from "../../../services/productsingle.service";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { ProductService } from "../../../services/product.service";


@Component({
  selector: "app-create-product",
  templateUrl: "./create-product-single.component.html",
  styleUrls: ["./create-product-single.component.css"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, NgFor, HttpClientModule, MatButtonModule, AngularEditorModule]
})
export class CreateProductSingleComponent implements OnInit {
  form!: FormGroup;
  product!: Product;
  imageData!: any;
  brandList: any = [];
  bannerSubscription: any;
  isedit: boolean = false;

  constructor(private productSingleService: ProductSingleService, private productService: ProductService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      longDescription: new FormControl(null),
      image: this.fb.array([]),
      id: new FormControl(null),
      carat: new FormControl(null),
      clarity: new FormControl(null),
      cut: new FormControl(null),
      price: new FormControl('unavailable')
    });
    this.activatedRoute.params.subscribe(data => {
      this.isedit = data['id'] ? true : false
      if (this.isedit) {
        this.productSingleService.getSingleData(data['id']).subscribe((productSingleRes: HttpResponse<any>) => {
          this.productService.query().subscribe((res: any) => {
            let x = productSingleRes.body
            let y = res.body
            this.form.get('title')?.patchValue(x.title)
            this.form.get('description')?.patchValue(x.description)
            this.form.get('longDescription')?.patchValue(x.longDescription)
            this.form.get('model')?.patchValue(x.model)
            this.form.get('id')?.patchValue(x._id)
            this.form.get('carat')?.patchValue(x.carat)
            this.form.get('clarity')?.patchValue(x.clarity)
            this.form.get('cut')?.patchValue(x.cut)
            x?.imagePath?.forEach((image: string) => {
              this.image.push(this.newImage(image));
            });
            y.forEach((element: any) => {
              if (element.productDetails == x._id) {
                this.form.get('price')?.patchValue(element?.price)
              }
            });
          })

        })


      }
    })
  }

  onFileSelect(event: any, index: number) {
    const file = event.target.files[0];
    this.image.at(index).patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image.at(index).patchValue({ imagePreview: reader.result as string });

      };
      reader.readAsDataURL(file);
    }
  }
  onPdfFileSelect(event: any) {
    const file = event.target.files[0];
    const allowedMimeTypes = ["application/pdf"];
    if (file && allowedMimeTypes.includes(file.type)) {
      this.form.patchValue({ pdf: file });
    }
  }
  get image(): FormArray {
    return this.form.get("image") as FormArray
  }
  newImage(imagePreview?: any): FormGroup {
    return this.fb.group({
      image: imagePreview,
      imagePreview: imagePreview
    })
  }
  addImage() {
    this.image.push(this.newImage());
  }
  removeimage(i: number) {
    this.image.removeAt(i);
  }

  onSubmit() {
    if (!this.isedit) {
      this.productSingleService.addProduct(this.form.value.title, this.image.value, this.form.value.description, this.form.value.longDescription, this.form.value.carat, this.form.value.clarity, this.form.value.cut, this.form.value.price);
      this.form.reset()
      this.image.reset()
      this.imageData = null;
    }
    else {
      this.productSingleService.updateSingleData(this.form.value.title, this.image.value, this.form.value.description, this.form.value.longDescription, this.form.value.id, this.form.value.carat, this.form.value.clarity, this.form.value.cut, this.form.value.price);
      this.form.reset()
      this.image.reset()
      this.imageData = null;
    }



  }
}
