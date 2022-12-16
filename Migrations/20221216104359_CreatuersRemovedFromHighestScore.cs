using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace wowara.Migrations
{
    public partial class CreatuersRemovedFromHighestScore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Creatures_HighestScores_HighestScoreId",
                table: "Creatures");

            migrationBuilder.DropIndex(
                name: "IX_Creatures_HighestScoreId",
                table: "Creatures");

            migrationBuilder.DropColumn(
                name: "HighestScoreId",
                table: "Creatures");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HighestScoreId",
                table: "Creatures",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Creatures_HighestScoreId",
                table: "Creatures",
                column: "HighestScoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_Creatures_HighestScores_HighestScoreId",
                table: "Creatures",
                column: "HighestScoreId",
                principalTable: "HighestScores",
                principalColumn: "Id");
        }
    }
}
