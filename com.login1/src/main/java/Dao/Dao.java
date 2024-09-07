/*package Dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import conne.Connect;
import model.User;

public class Dao implements DaoInter {

    private SessionFactory sessionFactory;

    public Dao() {
        sessionFactory = Connect.getSessionFactory();
    }

    @Override
    public boolean addUser(User user) {
        try (Session session = sessionFactory.openSession()) {
            Transaction tx = session.beginTransaction();
            session.save(user);
            tx.commit();
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public User getUser(String username) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(User.class, username);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean validateUser(User user) {
        User existingUser = getUser(user.getUsername());
        return existingUser != null && existingUser.getPassword().equals(user.getPassword());
    }
    
    @Override
    public boolean updateUserPassword(String username, String newPassword) {
        try (Session session = sessionFactory.openSession()) {
            Transaction tx = session.beginTransaction();
            User user = session.get(User.class, username);
            if (user != null) {
                user.setPassword(newPassword);
                session.update(user);
                tx.commit();
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean removeUser(String username) {
        try (Session session = sessionFactory.openSession()) {
            Transaction tx = session.beginTransaction();
            User user = session.get(User.class, username);
            if (user != null) {
                session.delete(user);
                tx.commit();
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
*/


//------------------------------------BELOW HAS SAME IMPLIMENTATION BUT USING HQL---------------------------------------
package Dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import conne.Connect;
import model.User;

public class Dao implements DaoInter {

    private SessionFactory sessionFactory;

    public Dao() {
        sessionFactory = Connect.getSessionFactory();
    }

    @Override
    public boolean addUser(User user) {
        Transaction tx = null;
        try (Session session = sessionFactory.openSession()) {
            tx = session.beginTransaction();
            session.save(user);  
            tx.commit();
            return true;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public User getUser(String username) {
        try (Session session = sessionFactory.openSession()) {
            String hql = "FROM User U WHERE U.username = :username";
            Query<User> query = session.createQuery(hql, User.class);
            query.setParameter("username", username);
            return query.uniqueResult();  
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean validateUser(User user) {
        try (Session session = sessionFactory.openSession()) {
            String hql = "FROM User U WHERE U.username = :username AND U.password = :password";
            Query<User> query = session.createQuery(hql, User.class);
            query.setParameter("username", user.getUsername());
            query.setParameter("password", user.getPassword());
            User result = query.uniqueResult();  
            return result != null;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updateUserPassword(String username, String newPassword) {
        Transaction tx = null;
        try (Session session = sessionFactory.openSession()) {
            tx = session.beginTransaction();
            String hql = "UPDATE User U SET U.password = :password WHERE U.username = :username";
            Query<?> query = session.createQuery(hql);
            query.setParameter("password", newPassword);
            query.setParameter("username", username);
            int result = query.executeUpdate();  
            tx.commit();
            return result > 0;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean removeUser(String username) {
        Transaction tx = null;
        try (Session session = sessionFactory.openSession()) {
            tx = session.beginTransaction();
            String hql = "DELETE FROM User U WHERE U.username = :username";
            Query<?> query = session.createQuery(hql);
            query.setParameter("username", username);
            int result = query.executeUpdate();  
            tx.commit();
            return result > 0;
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            System.out.println(e.getMessage());
            return false;
        }
    }
    
    @Override
    public List<User> getAllUsers() {
        try (Session session = sessionFactory.openSession()) {
            String hql = "FROM User";  // HQL to fetch all User records
            Query<User> query = session.createQuery(hql, User.class);
            return query.list(); // Return the list of users
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
