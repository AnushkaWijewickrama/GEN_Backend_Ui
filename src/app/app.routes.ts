import { Routes } from '@angular/router';
import { CreateBannerComponent } from './components/banner/create-banner/create-banner.component';
import { AuthGuardService } from './util/authgurd';
import { AllBannerComponent } from './components/banner/all-banner/all-banner.component';
import { AuthComponent } from './components/auth/auth.component';
import { AllProductComponent } from './components/product/all-product/all-product.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { AllOfferComponent } from './components/offer/all-offer/all-offer.component';
import { CreateOfferComponent } from './components/offer/create-offer/create-offer.component';
import { AllProductSingleComponent } from './components/product-single/all-product-single/all-product-single.component';
import { CreateProductSingleComponent } from './components/product-single/create-product-single/create-product-single.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';


export const routes: Routes = [
    {
        path: '',
        component: AuthComponent


    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'addBanner',
        component: CreateBannerComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'banner',
        component: AllBannerComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'products',
        component: AllProductComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'addProduct',
        component: CreateProductComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'editProduct/:id',
        component: CreateProductComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'offer',
        component: AllOfferComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'addoffer',
        component: CreateOfferComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'editoffer/:id',
        component: CreateOfferComponent,
        canActivate: [AuthGuardService]
    },

    {
        path: 'productSingle',
        component: AllProductSingleComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'addProductSingle',
        component: CreateProductSingleComponent,
        canActivate: [AuthGuardService]

    },
    {
        path: 'editProductSingle/:id',
        component: CreateProductSingleComponent,
        canActivate: [AuthGuardService]
    },
];
