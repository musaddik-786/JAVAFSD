package Service;
import java.util.Scanner;
import Model.Student;
import dao.IStudentDao;

public class StudentService {
	
	Scanner sc ;
	IStudentDao dao;
	
	public StudentService() {
		
		sc=new Scanner(System.in);
		dao=new IStudentDao();
		
	}
		public void addData()
		{
			Student s =new Student();
			System.out.println("enter roll no ");
			s.setRollno(sc.nextInt());
			
			System.out.println("enter name no ");
			sc.nextLine();
			s.setName(sc.nextLine());
			
			System.out.println("enter fee");
			s.setFee(sc.nextDouble());
			
			dao.insert1(s);
							
		}
		
		
		
		
		
		
		

	
	
	
	
	
	
	

}
