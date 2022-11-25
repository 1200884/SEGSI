import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardFleetComponent } from './board-fleet/board-fleet.component';
import { WarehousesComponent } from './board-warehouse/get-warehouses/get-warehouses.component';
import { UpdateWarehouseComponent } from './board-warehouse/update-warehouse/update-warehouse.component';
import { BoardWarehouseComponent } from './board-warehouse/board-warehouse.component';
import { CreateWarehouseComponent } from './board-warehouse/create-warehouse/create-warehouse.component';
import { BoardLogisticsComponent } from './board-logistics/board-logistics.component';
import { CreateTruckComponent } from './board-fleet/create-truck/create-truck.component';
import { PutTruckComponent } from './board-fleet/put-truck/put-truck.component';
import { PatchTruckComponent } from './board-fleet/patch-truck/patch-truck.component';
import { GetTruckComponent } from './board-fleet/get-truck/get-truck.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'fleet', component: BoardFleetComponent },
  { path: 'warehouse', component: BoardWarehouseComponent},
  { path: 'logistics', component: BoardLogisticsComponent},
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'Create warehouses', component: CreateWarehouseComponent},
  { path: 'get-truck', component: GetTruckComponent},
  { path: 'create-truck', component: CreateTruckComponent},
  { path: 'put-truck', component: PutTruckComponent},
  { path: 'patch-truck', component: PatchTruckComponent},
  { path: 'detail/:id', component: UpdateWarehouseComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
