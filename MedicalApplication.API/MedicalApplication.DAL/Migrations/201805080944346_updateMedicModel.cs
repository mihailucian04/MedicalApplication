namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateMedicModel : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.MedicModels", "FirstName", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("dbo.MedicModels", "LastName", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("dbo.MedicModels", "Speciality", c => c.String(maxLength: 200));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.MedicModels", "Speciality", c => c.String());
            AlterColumn("dbo.MedicModels", "LastName", c => c.String());
            AlterColumn("dbo.MedicModels", "FirstName", c => c.String());
        }
    }
}
