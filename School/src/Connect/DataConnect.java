package Connect;
import java.sql.Connection;
import java.sql.DriverManager;
public class DataConnect {
	 private static Connection connect;
	 public DataConnect() {
		 try
		 {
			Class.forName("com.mysql.jdbc.Driver");  
			connect=DriverManager.getConnection(  
	"jdbc:mysql://localhost:3306/mySchool","root","Anam@123"); 
			System.out.println("Connected");
			 
	 }
		 catch(Exception e)
		 {
			 System.out.println(e.getMessage());
		 }
		 
	}
	public static Connection getConnect()
	 {
		 
		 DataConnect data= new DataConnect();
		 return(connect);
		 
		 
	 }
}
