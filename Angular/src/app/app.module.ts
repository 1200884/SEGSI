import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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
import {DeliveriesComponent} from "./board-warehouse/get-deliveries/get-deliveries.component";
import {CreateDeliveryComponent} from "./board-warehouse/create-delivery/create-delivery.component";
import {UpdateDeliveryComponent} from "./board-warehouse/update-delivery/update-delivery.component";

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
    UpdateDeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
