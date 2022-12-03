﻿// <auto-generated />
using System;
using MDWM.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MDWM.Migrations
{
    [DbContext(typeof(MDWMDbContext))]
    [Migration("20221202030527_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("MDWM.Domain.Deliveries.Delivery", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("destinationWarehouseId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Deliveries");
                });

            modelBuilder.Entity("MDWM.Domain.Warehouses.Warehouse", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Warehouses");
                });

            modelBuilder.Entity("MDWM.Domain.Deliveries.Delivery", b =>
                {
                    b.OwnsOne("MDWM.Domain.Deliveries.Date", "date", b1 =>
                        {
                            b1.Property<string>("DeliveryId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<DateTime>("_date")
                                .HasColumnType("datetime2");

                            b1.HasKey("DeliveryId");

                            b1.ToTable("Deliveries");

                            b1.WithOwner()
                                .HasForeignKey("DeliveryId");
                        });

                    b.OwnsOne("MDWM.Domain.Deliveries.PackagingTime", "packagingTime", b1 =>
                        {
                            b1.Property<string>("DeliveryId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("_LoadTime")
                                .HasColumnType("int");

                            b1.Property<int>("_UnloadTime")
                                .HasColumnType("int");

                            b1.HasKey("DeliveryId");

                            b1.ToTable("Deliveries");

                            b1.WithOwner()
                                .HasForeignKey("DeliveryId");
                        });

                    b.OwnsOne("MDWM.Domain.Deliveries.Weight", "weight", b1 =>
                        {
                            b1.Property<string>("DeliveryId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<double>("_Weight")
                                .HasColumnType("float");

                            b1.HasKey("DeliveryId");

                            b1.ToTable("Deliveries");

                            b1.WithOwner()
                                .HasForeignKey("DeliveryId");
                        });

                    b.Navigation("date");

                    b.Navigation("packagingTime");

                    b.Navigation("weight");
                });

            modelBuilder.Entity("MDWM.Domain.Warehouses.Warehouse", b =>
                {
                    b.OwnsOne("MDWM.Domain.Warehouses.Address", "address", b1 =>
                        {
                            b1.Property<string>("WarehouseId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("City")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Country")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Street")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("WarehouseId");

                            b1.ToTable("Warehouses");

                            b1.WithOwner()
                                .HasForeignKey("WarehouseId");
                        });

                    b.OwnsOne("MDWM.Domain.Warehouses.Coordinates", "coordinates", b1 =>
                        {
                            b1.Property<string>("WarehouseId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<double>("Altitude")
                                .HasColumnType("float");

                            b1.Property<double>("Latitude")
                                .HasColumnType("float");

                            b1.Property<double>("Longitude")
                                .HasColumnType("float");

                            b1.HasKey("WarehouseId");

                            b1.ToTable("Warehouses");

                            b1.WithOwner()
                                .HasForeignKey("WarehouseId");
                        });

                    b.Navigation("address");

                    b.Navigation("coordinates");
                });
#pragma warning restore 612, 618
        }
    }
}