import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './board-admin/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UsersComponent } from './users/users.component';
import { BoardLogisticsComponent } from './board-logistics/board-logistics.component';
import { BoardFleetComponent } from './board-fleet/board-fleet.component';
import { BoardWarehouseComponent } from './board-warehouse/board-warehouse.component';
import { WarehousesComponent } from './board-warehouse/get-warehouses/get-warehouses.component';
import { UpdateWarehouseComponent } from './board-warehouse/update-warehouse/update-warehouse.component';
import { CreateWarehouseComponent } from './board-warehouse/create-warehouse/create-warehouse.component';
import { PatchTruckComponent } from './board-fleet/patch-truck/patch-truck.component';
import { PutTruckComponent } from './board-fleet/put-truck/put-truck.component';
import { GetTruckComponent } from './board-fleet/get-truck/get-truck.component';
import { CreateTruckComponent } from './board-fleet/create-truck/create-truck.component';
import { CreatePathComponent } from './board-logistics/create-path/create-path.component';
import { GetPathsComponent } from './board-logistics/get-path/get-paths.component';

import {DeliveriesComponent} from "./board-warehouse/get-deliveries/get-deliveries.component";
import {CreateDeliveryComponent} from "./board-warehouse/create-delivery/create-delivery.component";
import {UpdateDeliveryComponent} from "./board-warehouse/update-delivery/update-delivery.component";
import { GetPlanningComponent } from './board-logistics/get-planning/get-planning.component';
import { GetTrucksComponent } from './board-fleet/get-trucks/get-trucks.component';

import { GetPackagingComponent } from './board-logistics/get-packaging/get-packaging.component';
import { GetPackagingsComponent } from './board-logistics/get-packagings/get-packagings.component';
import { PutPackagingComponent } from './board-logistics/put-packaging/put-packaging.component';
import { CreatePackagingComponent } from './board-logistics/create-packaging/create-packaging.component';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import {SocialLoginModule,SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import { GetGeneticplanningComponent } from './board-logistics/get-geneticplanning/get-geneticplanning.component';
<<<<<<< HEAD

=======
>>>>>>> a7fcf5f4e7554c72eeced1d2c1e612ec11909903
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    UsersComponent,
    BoardLogisticsComponent,
    BoardFleetComponent,
    BoardWarehouseComponent,
    UpdateWarehouseComponent,
    WarehousesComponent,
    CreateWarehouseComponent,
    PatchTruckComponent,
    PutTruckComponent,
    GetTruckComponent,
    CreateTruckComponent,
    DeliveriesComponent,
    CreateDeliveryComponent,
    UpdateDeliveryComponent,
    CreatePathComponent,
    GetPlanningComponent,
    GetTrucksComponent,
    //GetPathComponent,
    GetPathsComponent,
    GetPackagingComponent,
    GetPackagingsComponent,
    PutPackagingComponent,
    CreatePackagingComponent,
    GetGeneticplanningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    SocialLoginModule,
  ],
  providers: [authInterceptorProviders,{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('122519574160-f45pa7mcbvr2ofbpn7sb2t1addjks9uu.apps.googleusercontent.com') // your client id
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
