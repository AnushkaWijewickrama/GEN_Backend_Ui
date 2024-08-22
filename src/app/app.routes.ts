import { Routes } from '@angular/router';
import { CreateBannerComponent } from './components/banner/create-banner/create-banner.component';
import { AuthGuardService } from './util/authgurd';
import { AllBannerComponent } from './components/banner/all-banner/all-banner.component';
import { AuthComponent } from './components/auth/auth.component';
import { AllProductComponent } from './components/product/all-product/all-product.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';


export const routes: Routes = [
    {
        path: '',
        component: AuthComponent


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
];
