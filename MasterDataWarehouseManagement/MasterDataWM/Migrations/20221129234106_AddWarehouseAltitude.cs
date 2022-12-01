using Microsoft.EntityFrameworkCore.Migrations;

namespace MDWM.Migrations
{
    public partial class AddWarehouseAltitude : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "coordinates_Altitude",
                table: "Warehouses",
                type: "float",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "coordinates_Altitude",
                table: "Warehouses");
        }
    }
}
