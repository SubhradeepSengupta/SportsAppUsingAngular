using Microsoft.EntityFrameworkCore.Migrations;

namespace SportsWebApp.Migrations
{
    public partial class RemovedTestTypeMapperfromTest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TestTypeMappers_TestID",
                table: "TestTypeMappers");

            migrationBuilder.CreateIndex(
                name: "IX_TestTypeMappers_TestID",
                table: "TestTypeMappers",
                column: "TestID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TestTypeMappers_TestID",
                table: "TestTypeMappers");

            migrationBuilder.CreateIndex(
                name: "IX_TestTypeMappers_TestID",
                table: "TestTypeMappers",
                column: "TestID",
                unique: true);
        }
    }
}
