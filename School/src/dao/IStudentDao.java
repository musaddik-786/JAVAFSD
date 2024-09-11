package dao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import Connect.DataConnect;
import Model.Student;

public class IStudentDao {
	Connection connect;
	PreparedStatement stat;
	public IStudentDao()
	{
		connect=DataConnect.getConnect();
		
	}
	public void insert1(Student stu) {
		
		
		try
		{
		stat=connect.prepareStatement("insert into student values(?,?,?)");
		stat.setInt(1, stu.getRollno());
		stat.setString(2, stu.getName());
		stat.setDouble(3,stu.getFee());
		
		stat.executeUpdate();
		}
		catch(Exception e)
		{
			System.out.println(e.getMessage());
			
		}
	}

}
